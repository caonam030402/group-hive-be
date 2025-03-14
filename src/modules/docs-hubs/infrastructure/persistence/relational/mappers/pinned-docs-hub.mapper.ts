import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { PinnedDocsHub } from '../../../../domain/pinned-docs-hub.entity';
import { PinnedDocsHubEntity } from '../entities/pinned-docs-hub.entity';
import { DocsHubMapper } from './docs-hub.mapper';

export class PinnedDocsHubMapper {
  static toDomain(raw: PinnedDocsHubEntity): PinnedDocsHub {
    const domainEntity = new PinnedDocsHub();
    domainEntity.id = raw.id;
    domainEntity.docsHub = DocsHubMapper.toDomain(raw.docsHub);
    domainEntity.user = UserMapper.toDomain(raw.user);

    return domainEntity;
  }

  static toPersistence(domainEntity: PinnedDocsHub): PinnedDocsHubEntity {
    {
      const persistenceEntity = new PinnedDocsHubEntity();
      persistenceEntity.id = domainEntity.id;
      persistenceEntity.docsHub = DocsHubMapper.toPersistence(
        domainEntity.docsHub,
      );
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);

      return persistenceEntity;
    }
  }
}
