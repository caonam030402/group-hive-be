import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { Otp } from '../../../../domain/otp';
import { OtpEntity } from '../entities/otp.entity';

export class OtpMapper {
  static toDomain(raw: OtpEntity): Otp {
    const domainEntity = new Otp();
    domainEntity.id = raw.id;
    domainEntity.code = raw.code;
    domainEntity.user = raw.user;
    domainEntity.expiresTime = raw.expiresTime;
    domainEntity.expiresAt = raw.expiresAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Otp): OtpEntity {
    const persistenceEntity = new OtpEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }

    let user: UserEntity | undefined;

    if (domainEntity.user) {
      user = new UserEntity();
      user.id = Number(domainEntity.user.id);
      persistenceEntity.user = user;
    }

    persistenceEntity.code = domainEntity.code;
    persistenceEntity.expiresTime = domainEntity.expiresTime;
    persistenceEntity.expiresAt = domainEntity.expiresAt;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
