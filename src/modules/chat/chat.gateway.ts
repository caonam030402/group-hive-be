import { Logger, UseFilters, UseGuards } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  BaseWsExceptionFilter,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ConnectedUserService } from './service/connected-user.service';
import { CurrentUser } from '../../decorator/current-user.decorator';
import { User } from '../users/domain/user';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { WebSocketJwtAuthGuard } from '../../common/guard/jwt-ws.guard';

@UseFilters(BaseWsExceptionFilter)
@UseGuards(WebSocketJwtAuthGuard)
@WebSocketGateway(4800, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(private readonly connectedUserService: ConnectedUserService) {}

  async onModuleInit(@CurrentUser() user: User): Promise<void> {
    if (user) {
      await this.connectedUserService.deleteAll(Number(user.id));
    }
  }

  @SubscribeMessage('connection')
  async handleConnection(socket: Socket, @CurrentUser() user: UserEntity) {
    console.log('Socket connected:', socket.id);
    try {
      if (!user) {
        console.log('No user found');
        return;
      }

      console.log('Creating connected user');
      await this.connectedUserService.create({
        socketId: Number(socket.id),
        user: user,
      });
    } catch (error) {
      console.error('Connection error:', error);
      this.handleConnectionError(socket, error);
    }
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    await this.connectedUserService.delete(Number(socket.id));
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  private handleConnectionError(socket: Socket, error: Error): void {
    this.logger.error(error);
    socket.emit('error', error.message);
    socket.disconnect();
  }
}
