import { Chat } from '../../../../domain/chat';
import { chatEntity } from '../entities/chat.entity';

export class ChatMapper {
  static toDomain(raw: chatEntity): Chat {
    const domainEntity = new Chat();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Chat): chatEntity {
    const persistenceEntity = new chatEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
