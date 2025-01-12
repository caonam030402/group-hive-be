import { Injectable } from '@nestjs/common';
import { ConnectedUserService } from './connected-user.service';
import { ChatService } from './chat.service';
import { sendMessagePrivateDto } from '../dto/send-message.dto';
import { User } from '../../users/domain/user';

import { DefaultEventsMap, Server } from 'socket.io';
import { createMessageDto } from '../dto/create-message.dto';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Chat } from '../domain/chat';
import { MessageService } from './messge.service';
import { ChatGatewaySubscribeKeys } from '../enum/gateway.enum';
import { ChatType } from '../enum/chat.enum';
import { WorkspacesService } from '../../workspaces/workspaces.service';

@Injectable()
export class ChatGatewayService {
  constructor(
    private readonly connectedUserService: ConnectedUserService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
    private readonly workspaceService: WorkspacesService,
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
    const findSocketId =
      await this.connectedUserService.findByUserId(recipientId);

    if (findSocketId) {
      server
        .to(findSocketId.socketId)
        .emit(ChatGatewaySubscribeKeys.RECEIVE_MESSAGE, { ...body, user });
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

    // create new chat when first message
    if (body.isFirst) {
      const newWorkspace = await this.workspaceService.findOne(
        body.workspaceId,
      );
      const newChat = new Chat();
      newWorkspace!.id = body.workspaceId;
      newChat.chatType = ChatType.PRIVATE;
      if (newWorkspace) {
        newChat.workspace = newWorkspace;
      }
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
}
