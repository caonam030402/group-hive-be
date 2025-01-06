import { DeepPartial } from 'typeorm';
import { NullableType } from '../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';
import { chat } from '../../domain/chat';

export abstract class chatRepository {
  abstract create(
    data: Omit<chat, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<chat>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<chat[]>;

  abstract findById(id: chat['id']): Promise<NullableType<chat>>;

  abstract update(
    id: chat['id'],
    payload: DeepPartial<chat>,
  ): Promise<chat | null>;

  abstract remove(id: chat['id']): Promise<void>;
}
