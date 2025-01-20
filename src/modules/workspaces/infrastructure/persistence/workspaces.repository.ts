import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { InviteWorkspaces } from '../../domain/invite-workspaces';
import { Workspaces } from '../../domain/workspaces';

export abstract class WorkspacesRepository {
  abstract create(
    data: Omit<
      Workspaces,
      'id' | 'createdAt' | 'updatedAt' | 'description' | 'avatar' | 'members'
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

  abstract findById(id: Workspaces['id']): Promise<NullableType<Workspaces>>;

  abstract count(ownerId: number): Promise<number>;

  abstract findByOwnerId({
    ownerId,
    name,
  }: {
    ownerId: number;
    name: string;
  }): Promise<NullableType<Workspaces>>;

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
}
