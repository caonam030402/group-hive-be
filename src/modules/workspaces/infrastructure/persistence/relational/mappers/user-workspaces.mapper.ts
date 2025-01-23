import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';
import { UserWorkspace } from '../../../../domain/user-workspaces';
import { UserWorkspaceEntity } from '../entities/user-workspace.entity';
import { WorkspacesMapper } from './workspaces.mapper';

export class UserWorkspacesMapper {
  static toDomain(raw: UserWorkspaceEntity): UserWorkspace {
    const domainEntity = new UserWorkspace();
    if (raw.id) {
      domainEntity.id = raw.id;
    }
    domainEntity.user = UserMapper.toDomain(raw.user);
    domainEntity.workspace = WorkspacesMapper.toDomain(raw.workspace);

    return domainEntity;
  }

  static toPersistence(domainEntity: UserWorkspace): UserWorkspaceEntity {
    const persistenceEntity = new UserWorkspaceEntity();
    persistenceEntity.id = domainEntity?.id;
    persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    persistenceEntity.workspace = WorkspacesMapper.toPersistence(
      domainEntity.workspace,
    );

    return persistenceEntity;
  }
}
