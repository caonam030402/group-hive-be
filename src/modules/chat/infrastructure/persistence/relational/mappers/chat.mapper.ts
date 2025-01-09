import { Chat } from '../../../../domain/chat';
import { ChatEntity } from '../entities';

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

    return persistenceEntity;
  }
}
