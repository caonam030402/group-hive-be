import { chat } from '../../../../domain/chat';
import { chatEntity } from '../entities/chat.entity';

export class chatMapper {
  static toDomain(raw: chatEntity): chat {
    const domainEntity = new chat();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: chat): chatEntity {
    const persistenceEntity = new chatEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
