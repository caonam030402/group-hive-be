import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConnectedUserService } from './service/connected-user.service';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { User } from '../users/domain/user';
import { WsAuthGuard } from '../../common/guard/jwt-ws.guard';
import { JwtWsStrategy } from '../auth/strategies/jwt-ws.strategy';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { MessageType } from './infrastructure/persistence/relational/entities';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/messge.service';
import { createMessageDto } from './dto/create-message.dto';

@UseGuards(WsAuthGuard)
@UseFilters(BaseWsExceptionFilter)
@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly connectedUserService: ConnectedUserService,
    private readonly jwtWsStrategy: JwtWsStrategy,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
  }

  @SubscribeMessage('connection')
  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.headers['authorization'];
      const user = await this.jwtWsStrategy.validateJwtToken(token);
      if (!user) return socket.disconnect();
      await this.connectedUserService.create({
        socketId: socket.id,
        user: {
          id: user?.id,
        } as UserEntity,
      });
    } catch (error) {
      this.handleConnectionError(socket, error);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.connectedUserService.delete(socket.id);
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  private handleConnectionError(socket: Socket, error: Error): void {
    this.logger.error(error);
    socket.emit('error', error.message);
    socket.disconnect();
  }

  @SubscribeMessage('send-message-private')
  async sendMessagePrivate(
    @MessageBody()
    body: {
      recipientId: number;
      chatId: string;
      content?: string;
      type: MessageType;
    },
    @CurrentUser() user: User,
  ) {
    const findSocketId = await this.connectedUserService.findByUserId(
      body.recipientId,
    );

    if (findSocketId) {
      this.server
        .to(findSocketId.socketId)
        .emit('receive-message', { ...body, user });
    }

    const messageBody = {
      user: {
        id: user.id,
      },
      chat: {
        id: body.chatId,
      },
      type: body.type,
      content: body.content || '',
    };

    if (!body.chatId) {
      const chat = await this.chatService.create({
        userChats: [
          {
            user: {
              id: user.id,
            },
          },
          {
            user: {
              id: body.recipientId,
            },
          },
        ],
      } as any);

      messageBody.chat = {
        id: chat.id,
      };
    }

    await this.messageService.create(messageBody as createMessageDto);
  }

  @SubscribeMessage('send-message-group')
  sendMessageGroup(
    @MessageBody()
    body: {
      groupId: string;
      content?: string;
      type: MessageType;
    },
    @CurrentUser() user: User,
  ) {
    this.server.to(body.groupId).emit('receive-message', { ...body, user });
  }
}
