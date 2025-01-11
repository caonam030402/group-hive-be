import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../utils/types/query-options';
import { Message } from '../../domain/message';

export abstract class MessageRepository {
  abstract create(
    data: Omit<Message, 'sentAt' | 'status' | 'id'> &
      Partial<Pick<Message, 'group' | 'chat'>>,
  ): Promise<Message>;

  abstract findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<Message[]>;
}
