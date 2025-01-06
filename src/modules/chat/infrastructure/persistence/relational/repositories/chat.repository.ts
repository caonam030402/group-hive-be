import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { chatEntity } from '../entities/chat.entity';
import { chat } from '../../../../domain/chat';
import { chatRepository } from '../../chat.repository';
import { chatMapper } from '../mappers/chat.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { NullableType } from '../../../../../../utils/types/nullable.type';

@Injectable()
export class chatRelationalRepository implements chatRepository {
  constructor(
    @InjectRepository(chatEntity)
    private readonly chatRepository: Repository<chatEntity>,
  ) {}

  async create(data: chat): Promise<chat> {
    const persistenceModel = chatMapper.toPersistence(data);
    const newEntity = await this.chatRepository.save(
      this.chatRepository.create(persistenceModel),
    );
    return chatMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<chat[]> {
    const entities = await this.chatRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => chatMapper.toDomain(entity));
  }

  async findById(id: chat['id']): Promise<NullableType<chat>> {
    const entity = await this.chatRepository.findOne({
      where: { id },
    });

    return entity ? chatMapper.toDomain(entity) : null;
  }

  async update(id: chat['id'], payload: Partial<chat>): Promise<chat> {
    const entity = await this.chatRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.chatRepository.save(
      this.chatRepository.create(
        chatMapper.toPersistence({
          ...chatMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return chatMapper.toDomain(updatedEntity);
  }

  async remove(id: chat['id']): Promise<void> {
    await this.chatRepository.delete(id);
  }
}
