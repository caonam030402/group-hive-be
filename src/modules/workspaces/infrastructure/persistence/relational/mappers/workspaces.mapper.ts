import { Workspaces } from '../../../../domain/workspaces';
import { WorkspacesEntity } from '../entities/workspaces.entity';

export class WorkspacesMapper {
  static toDomain(raw: WorkspacesEntity): Workspaces {
    const domainEntity = new Workspaces();
    domainEntity.id = raw.id;
    domainEntity.name = raw.name;
    domainEntity.description = raw.description;
    domainEntity.avatar = raw.avatar;
    domainEntity.owner = raw.owner;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Workspaces): WorkspacesEntity {
    const persistenceEntity = new WorkspacesEntity();
    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;
    persistenceEntity.name = domainEntity.name;
    persistenceEntity.description = domainEntity.description;
    persistenceEntity.avatar = domainEntity.avatar;
    persistenceEntity.owner = domainEntity.owner;

    return persistenceEntity;
  }
}
