import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRepository } from '../../message.repository';
import { Message } from '../../../../domain/message';
import { MessageMapper } from '../mappers/message.mapper';
import { MessageEntity } from '../entities';
import { IQueryOptions } from '../../../../../../utils/types/query-options';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class MessageRelationalRepository implements MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async create(data: Message): Promise<Message> {
    const persistenceModel = MessageMapper.toPersistence(data);
    const newEntity = await this.messageRepository.save(
      this.messageRepository.create(persistenceModel),
    );
    return MessageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<Message[]> {
    const { filterRelational, filterBy, search, order } = queryOptions;

    const queryBuilder = this.messageRepository.createQueryBuilder('message');

    if (filterRelational && filterRelational.field) {
      queryBuilder.andWhere(
        `message.${filterRelational.field} = :filterRelationalValue`,
        {
          filterRelationalValue: filterRelational.value,
        },
      );
    }

    if (filterBy && filterBy.field) {
      queryBuilder.andWhere(`message.${filterBy.field} = :filterByValue`, {
        filterByValue: filterBy.value,
      });
    }

    if (search && search.field) {
      queryBuilder.andWhere(`message.${search.field} LIKE :searchValue`, {
        searchValue: `%${search.value}%`,
      });
    }

    queryBuilder.orderBy(
      `message.${order.field ?? 'sentAt'}`,
      (order.direction?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC',
    );

    queryBuilder.leftJoinAndSelect('message.user', 'user');

    queryBuilder.skip((paginationOptions.page - 1) * paginationOptions.limit);
    queryBuilder.take(paginationOptions.limit);

    const entities = await queryBuilder.getMany();

    return entities.map((entity) => MessageMapper.toDomain(entity));
  }
}
