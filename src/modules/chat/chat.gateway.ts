import {
  Logger,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
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
import { ChatService } from './service/chat.service';
import { MessageService } from './service/messge.service';
import { createMessageDto } from './dto/create-message.dto';
import { Chat } from './domain/chat';
import { ChatGatewaySubscribeKeys } from './enum/gateway.enum';
import { MessageType } from './enum/message.enum';
import { sendMessagePrivateDto } from './dto/send-message.dto';

@UsePipes(new ValidationPipe())
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

  @SubscribeMessage(ChatGatewaySubscribeKeys.SEND_MESSAGE_PRIVATE)
  async sendMessagePrivate(
    @MessageBody()
    body: sendMessagePrivateDto,
    @CurrentUser() user: User,
  ) {
    const findSocketId = await this.connectedUserService.findByUserId(
      body.recipientId,
    );

    // send message to recipient socket
    if (findSocketId) {
      this.server
        .to(findSocketId.socketId)
        .emit('receive-message', { ...body, user });
    }

    const messageBody: createMessageDto = {
      user: user as UserEntity,
      chat: {
        id: body.chatId,
      } as Chat,
      type: body.type,
      content: body.content,
    };

    // create new chat when first message
    if (!body.chatId) {
      const newChat = new Chat();
      newChat.userChats = [
        {
          user: { id: user.id } as UserEntity,
        },
        {
          user: { id: body.recipientId } as UserEntity,
        },
      ];
      const chat = await this.chatService.create(newChat);

      // add chat id to message
      messageBody.chat = {
        id: chat.id,
      } as Chat;
    }

    await this.messageService.create(messageBody as createMessageDto);
  }

  @SubscribeMessage(ChatGatewaySubscribeKeys.SEND_MESSAGE_GROUP)
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
