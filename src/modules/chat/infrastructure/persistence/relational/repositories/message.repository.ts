import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageRepository } from '../../message.repository';
import { Message } from '../../../../domain/message';
import { MessageMapper } from '../mappers/message.mapper';
import { MessageEntity } from '../entities';

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
}
