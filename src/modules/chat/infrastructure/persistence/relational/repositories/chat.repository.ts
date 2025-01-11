import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { ChatRepository } from '../../chat.repository';
import { ChatMapper } from '../mappers/chat.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Chat } from '../../../../domain/chat';
import { IQueryOptions } from '../../../../../../utils/types/query-options';

@Injectable()
export class ChatRelationalRepository implements ChatRepository {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  async create(data: Chat): Promise<Chat> {
    const persistenceModel = ChatMapper.toPersistence(data);
    const newEntity = await this.chatRepository.save(
      this.chatRepository.create(persistenceModel),
    );
    return ChatMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<Chat[]> {
    const { filterRelational, filterBy, search, order } = queryOptions;
    const where = {};

    if (filterRelational && filterRelational.field) {
      where[filterRelational.field] = {
        id: filterRelational.value,
      };
    }

    if (filterBy && filterBy.field) {
      where[filterBy.field] = filterBy.value;
    }

    if (search && search.field) {
      where[search.field] = Like(`%${search.value}%`);
    }

    const entities = await this.chatRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: {
        [order.field ?? 'createdAt']: order.direction ?? 'asc',
      },
    });
    return entities.map((entity) => ChatMapper.toDomain(entity));
  }

  async findById(id: Chat['id']): Promise<NullableType<Chat>> {
    const entity = await this.chatRepository.findOne({
      where: { id },
    });

    return entity ? ChatMapper.toDomain(entity) : null;
  }

  async update(id: Chat['id'], payload: Partial<Chat>): Promise<Chat> {
    const entity = await this.chatRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.chatRepository.save(
      this.chatRepository.create(
        ChatMapper.toPersistence({
          ...ChatMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ChatMapper.toDomain(updatedEntity);
  }

  async remove(id: Chat['id']): Promise<void> {
    await this.chatRepository.delete(id ?? '');
  }
}
