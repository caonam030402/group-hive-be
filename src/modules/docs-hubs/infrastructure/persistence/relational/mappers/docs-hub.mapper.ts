import { DocsHub } from '../../../../domain/docs-hub';
import { DocsHubEntity } from '../entities/docs-hub.entity';

export class DocsHubMapper {
  static toDomain(raw: DocsHubEntity): DocsHub {
    const domainEntity = new DocsHub();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.docsType = raw.docsType;
    // domainEntity.author = UserMapper.toDomain(raw.author);
    domainEntity.lastOpenedAt = raw.lastOpenedAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: DocsHub): DocsHubEntity {
    const persistenceEntity = new DocsHubEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.docsType = domainEntity.docsType;
    // persistenceEntity.author = UserMapper.toPersistence(domainEntity.author);
    persistenceEntity.lastOpenedAt = domainEntity.lastOpenedAt;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
