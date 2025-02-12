import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { WorkspacesMapper } from '../../../../../workspaces/infrastructure/persistence/relational/mappers/workspaces.mapper';
import { Chat } from '../../../../domain/chat';
import { UserChat } from '../../../../domain/user-chat';
import { ChatEntity, UserChatEntity } from '../entities';
import { MessageMapper } from './message.mapper';
// import { MessageMapper } from './message.mapper';

export class ChatMapper {
  static toDomain(raw: ChatEntity): Chat {
    const domainEntity = new Chat();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.chatType = raw.chatType;
    domainEntity.name = raw.name;
    if (raw.messages) {
      domainEntity.messages = raw.messages.map((message) => {
        return MessageMapper.toDomain(message);
      });
    }

    if (domainEntity.messages) {
      domainEntity.lastMessage = domainEntity.messages[0];
    }
    if (raw.userChats) {
      domainEntity.userChats = raw.userChats.map((userChat) => {
        const userChatEntity = new UserChat();
        if (userChat.user) {
          userChatEntity.user = UserMapper.toDomain(userChat.user);
        }
        return userChatEntity;
      });
    }
    delete domainEntity.messages;

    return domainEntity;
  }

  static toPersistence(domainEntity: Chat): ChatEntity {
    const persistenceEntity = new ChatEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.chatType = domainEntity.chatType;
    persistenceEntity.workspace = WorkspacesMapper.toPersistence(
      domainEntity.workspace,
    );

    if (domainEntity.userChats) {
      persistenceEntity.userChats = domainEntity.userChats.map((userChat) => {
        const userChatEntity = new UserChatEntity();

        if (userChat.user) {
          userChatEntity.user = UserMapper.toPersistence(userChat.user);
        }
        return userChatEntity;
      });
    }

    return persistenceEntity;
  }
}
