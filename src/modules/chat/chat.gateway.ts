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

@UseGuards(WsAuthGuard)
@UseFilters(BaseWsExceptionFilter)
@WebSocketGateway(3001, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly connectedUserService: ConnectedUserService,
    private readonly jwtWsStrategy: JwtWsStrategy,
  ) {}

  async onModuleInit(@CurrentUser() user: User): Promise<void> {
    if (user) {
      await this.connectedUserService.deleteAll(Number(user.id));
    }
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
  sendMessagePrivate(
    @MessageBody()
    body: {
      recipientId: string;
      chatId?: string;
      content?: string;
      type: MessageType;
    },
    @CurrentUser() user: User,
  ): any {
    this.server.to(body.recipientId).emit('receive-message', { ...body, user });
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
  ): any {
    this.server.to(body.groupId).emit('receive-message', { ...body, user });
  }
}
