import { InviteWorkspaces } from '../../../../domain/invite-workspaces';
import { InviteWorkspacesEntity } from '../entities/invite-workspaces.entity';
import { WorkspacesMapper } from './workspaces.mapper';

export class InviteWorkspacesMapper {
  static toDomain(raw: InviteWorkspacesEntity): InviteWorkspaces {
    const domainEntity = new InviteWorkspaces();
    domainEntity.id = raw.id;
    domainEntity.inviteCode = raw.inviteCode;
    domainEntity.link = raw.link;
    domainEntity.workspace = WorkspacesMapper.toDomain(raw.workspace);
    domainEntity.expiredAt = raw.expiredAt;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: InviteWorkspaces): InviteWorkspacesEntity {
    const persistenceEntity = new InviteWorkspacesEntity();
    persistenceEntity.id = persistenceEntity.id;
    persistenceEntity.inviteCode = domainEntity.inviteCode;
    persistenceEntity.link = domainEntity.link;
    persistenceEntity.workspace = WorkspacesMapper.toPersistence(
      domainEntity.workspace,
    );
    persistenceEntity.expiredAt = domainEntity.expiredAt;
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
