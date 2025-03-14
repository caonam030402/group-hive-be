import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../utils/types/query-options';
import { User } from '../../../users/domain/user';
import { DocsHub } from '../../domain/docs-hub';
import { PinnedDocsHub } from '../../domain/pinned-docs-hub.entity';

export abstract class PinnedDocsHubRepository {
  abstract create(
    data: Omit<PinnedDocsHub, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PinnedDocsHub>;

  abstract findAllWithPagination({
    paginationOptions,
    queryOptions,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
    userId: User['id'];
  }): Promise<PinnedDocsHub[]>;

  abstract findById(
    id: PinnedDocsHub['id'],
  ): Promise<NullableType<PinnedDocsHub>>;

  abstract update(
    id: PinnedDocsHub['id'],
    payload: DeepPartial<PinnedDocsHub>,
  ): Promise<PinnedDocsHub | null>;

  abstract remove(id: PinnedDocsHub['id']): Promise<void>;

  abstract removeByDocsHub(id: DocsHub['id']): Promise<void>;
}
