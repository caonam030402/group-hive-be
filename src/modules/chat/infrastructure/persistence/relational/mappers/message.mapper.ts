import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { Message } from '../../../../domain/message';
import { MessageEntity } from '../entities';
import { ChatMapper } from './chat.mapper';

export class MessageMapper {
  static toDomain(raw: MessageEntity): Message {
    const domainEntity = new Message();
    domainEntity.id = raw?.id;
    if (raw?.chat) {
      domainEntity.chat = ChatMapper.toDomain(raw?.chat);
    }
    domainEntity.content = raw?.content;
    domainEntity.status = raw?.status;
    domainEntity.user = raw?.user;
    domainEntity.type = raw?.type;
    domainEntity.sentAt = raw?.sentAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Message): MessageEntity {
    const persistenceEntity = new MessageEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    if (domainEntity.chat) {
      persistenceEntity.chat = ChatMapper.toPersistence(domainEntity.chat);
    }
    persistenceEntity.content = domainEntity.content;
    persistenceEntity.sentAt = domainEntity.sentAt;
    persistenceEntity.status = domainEntity.status;
    persistenceEntity.type = domainEntity.type;
    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    return persistenceEntity;
  }
}
