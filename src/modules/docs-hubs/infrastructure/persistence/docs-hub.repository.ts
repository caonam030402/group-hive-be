import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../utils/types/query-options';
import { DocsHub } from '../../domain/docs-hub';

export abstract class DocsHubRepository {
  abstract create(
    data: Omit<
      DocsHub,
      'id' | 'createdAt' | 'updatedAt' | 'content' | 'userDocsHub'
    >,
  ): Promise<DocsHub>;

  abstract findAllWithPagination({
    paginationOptions,
    queryOptions,
    workspaceId,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
    workspaceId: string;
    userId: number;
  }): Promise<DocsHub[]>;

  abstract findById(id: DocsHub['id']): Promise<NullableType<DocsHub>>;

  abstract update(
    id: DocsHub['id'],
    payload: DeepPartial<DocsHub>,
  ): Promise<DocsHub | null>;

  abstract remove(id: DocsHub['id']): Promise<void>;
}
