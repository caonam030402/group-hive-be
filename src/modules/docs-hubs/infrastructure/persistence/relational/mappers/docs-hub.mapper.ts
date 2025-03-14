import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { WorkspacesMapper } from '../../../../../workspaces/infrastructure/persistence/relational/mappers/workspaces.mapper';
import { DocsHub } from '../../../../domain/docs-hub';
import { DocsHubEntity } from '../entities/docs-hub.entity';

export class DocsHubMapper {
  static toDomain(raw: DocsHubEntity): DocsHub {
    const domainEntity = new DocsHub();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.docsType = raw.docsType;
    domainEntity.author = UserMapper.toDomain(raw.author);
    domainEntity.scope = raw.scope;
    if (raw.workspace) {
      domainEntity.workspace = WorkspacesMapper.toDomain(raw.workspace);
    }

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
    persistenceEntity.author = UserMapper.toPersistence(domainEntity.author);
    persistenceEntity.scope = domainEntity.scope;
    if (domainEntity.workspace) {
      persistenceEntity.workspace = WorkspacesMapper.toPersistence(
        domainEntity.workspace,
      );
    }

    persistenceEntity.lastOpenedAt = domainEntity.lastOpenedAt;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
