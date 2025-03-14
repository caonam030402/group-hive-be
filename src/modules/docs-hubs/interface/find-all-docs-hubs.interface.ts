import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../utils/types/query-options';
import { ScopeDocsEnum } from '../enum/scope-docs';

export interface IFindAllDocsHubs {
  paginationOptions: IPaginationOptions;
  queryOptions: IQueryOptions;
  workspaceId: string;
  userId: number;
  isShared: boolean;
  scope: ScopeDocsEnum;
}
