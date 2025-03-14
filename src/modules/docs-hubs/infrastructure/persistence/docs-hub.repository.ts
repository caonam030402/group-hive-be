import { DeepPartial } from '../../../../utils/types/deep-partial.type';
import { NullableType } from '../../../../utils/types/nullable.type';
import { DocsHub } from '../../domain/docs-hub';
import { IFindAllDocsHubs } from '../../interface/find-all-docs-hubs.interface';

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
    isShared,
  }: IFindAllDocsHubs): Promise<DocsHub[]>;

  abstract findById(id: DocsHub['id']): Promise<NullableType<DocsHub>>;

  abstract update(
    id: DocsHub['id'],
    payload: DeepPartial<DocsHub>,
  ): Promise<DocsHub | null>;

  abstract remove(id: DocsHub['id']): Promise<void>;
}
