import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../infrastructure/persistence/message.repository';
import { createMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  create(createMessageDto: createMessageDto) {
    return this.messageRepository.create(createMessageDto);
  }
}
