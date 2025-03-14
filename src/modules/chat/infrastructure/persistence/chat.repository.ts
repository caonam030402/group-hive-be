import { DeepPartial } from 'typeorm';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { Chat } from '../../domain/chat';
import { IQueryOptions } from '../../../../utils/types/query-options';

export abstract class ChatRepository {
  abstract create(
    data: Pick<Chat, 'chatType' | 'userChats' | 'workspace'>,
    hasCheck: boolean,
  ): Promise<Chat>;

  abstract findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<Chat[]>;

  abstract findById(id: Chat['id']): Promise<NullableType<Chat>>;

  abstract update(
    id: Chat['id'],
    payload: DeepPartial<Chat>,
  ): Promise<Chat | null>;

  abstract remove(id: Chat['id']): Promise<void>;
}
