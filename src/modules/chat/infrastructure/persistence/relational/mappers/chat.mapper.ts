import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Chat } from '../../../../domain/chat';
import { ChatEntity, UserChatEntity } from '../entities';

export class ChatMapper {
  static toDomain(raw: ChatEntity): Chat {
    const domainEntity = new Chat();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Chat): ChatEntity {
    const persistenceEntity = new ChatEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
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
