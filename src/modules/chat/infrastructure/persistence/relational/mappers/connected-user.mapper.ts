import { connectedUser } from '../../../../domain/connected-user';
import { connectedUserEntity } from '../entities/connected-user.entity';

export class connectedUserMapper {
  static toDomain(raw: connectedUserEntity): connectedUser {
    const domainEntity = new connectedUser();
    domainEntity.user = raw.user;
    domainEntity.socketId = raw.socketId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: connectedUser): connectedUserEntity {
    const persistenceEntity = new connectedUserEntity();
    persistenceEntity.socketId = domainEntity.socketId;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.user = domainEntity.user;
    return persistenceEntity;
  }
}
