import { DocsHub } from '../../../../domain/docs-hub';
import { DocsHubEntity } from '../entities/docs-hub.entity';

export class DocsHubMapper {
  static toDomain(raw: DocsHubEntity): DocsHub {
    const domainEntity = new DocsHub();
    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: DocsHub): DocsHubEntity {
    const persistenceEntity = new DocsHubEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
