import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { User } from '../../../users/domain/user';
import { InviteWorkspaces } from '../../domain/invite-workspaces';
import { UserWorkspace } from '../../domain/user-workspaces';
import { Workspaces } from '../../domain/workspaces';

export abstract class WorkspacesRepository {
  abstract create(
    data: Omit<
      Workspaces,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'description'
      | 'avatar'
      | 'members'
      | 'quantityMembers'
    >,
    ownerId: number,
  ): Promise<Workspaces>;

  abstract findAllWithPagination({
    paginationOptions,
    ownerId,
  }: {
    paginationOptions: IPaginationOptions;
    ownerId?: number;
  }): Promise<Workspaces[]>;

  abstract findAllMembersWithPagination({
    paginationOptions,
    workSpaceId,
  }: {
    paginationOptions: IPaginationOptions;
    workSpaceId?: string;
  }): Promise<User[]>;

  abstract findById(id: Workspaces['id']): Promise<NullableType<Workspaces>>;

  abstract count(ownerId: number): Promise<number>;

  abstract findByOwnerId({
    ownerId,
    name,
  }: {
    ownerId: number;
    name: string;
  }): Promise<NullableType<Workspaces>>;

  abstract findOneWorkspaceUser({
    workspaceId,
    userId,
  }: {
    workspaceId: Workspaces['id'];
    userId: number;
  }): Promise<NullableType<UserWorkspace>>;

  abstract update(
    id: Workspaces['id'],
    payload: DeepPartial<Workspaces>,
  ): Promise<Workspaces | null>;

  abstract remove(id: Workspaces['id']): Promise<void>;

  abstract createInvite(
    data: Pick<InviteWorkspaces, 'expiredAt' | 'workspace'>,
  ): Promise<InviteWorkspaces>;

  abstract getInviteByWorkspaceId(
    workspaceId: Workspaces['id'],
  ): Promise<NullableType<InviteWorkspaces>>;

  abstract updateInvite(
    data: Pick<InviteWorkspaces, 'expiredAt' | 'workspace'>,
  ): Promise<void>;

  abstract joinWorkspace({
    workspaceId,
    userId,
  }: {
    workspaceId: Workspaces['id'];
    userId: number;
  }): Promise<void>;

  abstract findByUserId(userId: number): Promise<Workspaces[]>;
}
