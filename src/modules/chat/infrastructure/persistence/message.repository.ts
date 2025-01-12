import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../utils/types/query-options';
import { Message } from '../../domain/message';

export abstract class MessageRepository {
  abstract create(
    data: Omit<Message, 'sentAt' | 'status' | 'id'>,
  ): Promise<Message>;

  abstract findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<Message[]>;
}
