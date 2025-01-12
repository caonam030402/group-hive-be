import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatEntity } from '../entities/chat.entity';
import { ChatRepository } from '../../chat.repository';
import { ChatMapper } from '../mappers/chat.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Chat } from '../../../../domain/chat';
import { IQueryOptions } from '../../../../../../utils/types/query-options';
import { ChatType } from '../../../../enum/chat.enum';

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

    const queryBuilder = this.chatRepository.createQueryBuilder('chat');

    if (filterRelational && filterRelational.field) {
      queryBuilder.andWhere(
        `chat.${filterRelational.field} = :filterRelationalValue`,
        {
          filterRelationalValue: filterRelational.value,
        },
      );
    }

    if (filterBy && filterBy.field) {
      queryBuilder.andWhere(`chat.${filterBy.field} = :filterByValue`, {
        filterByValue: filterBy.value,
      });
    }

    if (search && search.field) {
      queryBuilder.andWhere(`chat.${search.field} LIKE :searchValue`, {
        searchValue: `%${search.value}%`,
      });
    }

    queryBuilder.orderBy(
      `chat.${order.field ?? 'createdAt'}`,
      (order.direction?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC',
    );

    queryBuilder
      .leftJoinAndSelect('chat.lastMessage', 'lastMessage')
      .leftJoinAndSelect('lastMessage.user', 'userLastMessage')
      .leftJoinAndSelect('chat.userChats', 'userChats')
      .leftJoinAndSelect('userChats.user', 'userChat')
      .take(paginationOptions.limit)
      .skip((paginationOptions.page - 1) * paginationOptions.limit);

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => {
      if (entity.chatType === ChatType.GROUP) {
        delete entity.userChats;
      }
      return ChatMapper.toDomain(entity);
    });
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
