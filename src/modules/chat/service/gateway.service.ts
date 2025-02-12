import { Injectable } from '@nestjs/common';
import { ConnectedUserService } from './connected-user.service';
import { sendMessagePrivateDto } from '../dto/send-message.dto';
import { User } from '../../users/domain/user';

import { DefaultEventsMap, Server } from 'socket.io';
import { createMessageDto } from '../dto/create-message.dto';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Chat } from '../domain/chat';
import { ChatGatewaySubscribeKeys } from '../enum/gateway.enum';
import { MessageService } from './message.service';

@Injectable()
export class ChatGatewayService {
  constructor(
    private readonly connectedUserService: ConnectedUserService,
    private readonly messageService: MessageService,
  ) {}

  async sendMessagePrivateService({
    recipientId,
    body,
    user,
    server,
  }: {
    recipientId: User['id'];
    body: sendMessagePrivateDto;
    user: User;
    server: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  }) {
    await this.sendMessagePrivateUpdateDbService({ body, user });

    const [recipientSocket, sender] = await Promise.all([
      this.connectedUserService.findByUserId(recipientId),
      this.connectedUserService.findByUserId(user.id),
    ]);

    if (recipientSocket) {
      server
        .to(recipientSocket.socketId)
        .emit(ChatGatewaySubscribeKeys.RECEIVE_MESSAGE, {
          ...body,
          user: sender?.user,
        });
    }
  }

  async sendMessagePrivateUpdateDbService({
    body,
    user,
  }: {
    body: sendMessagePrivateDto;
    user: User;
  }) {
    const messageBody: createMessageDto = {
      user: user as UserEntity,
      chat: {
        id: body.chatId,
      } as Chat,
      type: body.type,
      content: body.content,
    };
    return await this.messageService.create(messageBody);
  }
}
