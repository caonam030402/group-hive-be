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
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { User } from '../users/domain/user';
import { WsAuthGuard } from '../../common/guard/jwt-ws.guard';
import { JwtWsStrategy } from '../auth/strategies/jwt-ws.strategy';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { ChatGatewaySubscribeKeys } from './enum/gateway.enum';
import { MessageType } from './enum/message.enum';
import { sendMessagePrivateDto } from './dto/send-message.dto';
import { ChatGatewayService } from './service/gateway.service';

@UsePipes(new ValidationPipe())
@UseGuards(WsAuthGuard)
@UseFilters(BaseWsExceptionFilter)
@WebSocketGateway(3002, { cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger('ChatGateway');

  constructor(
    private readonly jwtWsStrategy: JwtWsStrategy,
    private readonly connectedUserService: ConnectedUserService,
    private readonly chatGatewayService: ChatGatewayService,
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
      console.log(user, 'user');
    } catch (error) {
      console.log(error);
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
    await this.chatGatewayService.sendMessagePrivateService({
      recipientId: body.recipientId,
      body,
      user,
      server: this.server,
    });
    await this.chatGatewayService.sendMessagePrivateUpdateDbService({
      body,
      user,
    });
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
