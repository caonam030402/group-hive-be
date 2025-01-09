import { ConnectedUser } from '../../../../domain/connected-user';
import { ConnectedUserEntity } from '../entities/connected-user.entity';

export class ConnectedUserMapper {
  static toDomain(raw: ConnectedUserEntity): ConnectedUser {
    const domainEntity = new ConnectedUser();
    domainEntity.user = raw.user;
    domainEntity.socketId = raw.socketId;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: ConnectedUser): ConnectedUserEntity {
    const persistenceEntity = new ConnectedUserEntity();
    persistenceEntity.socketId = domainEntity.socketId;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.user = domainEntity.user;
    return persistenceEntity;
  }
}
