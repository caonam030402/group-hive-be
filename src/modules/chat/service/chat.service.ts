import { Injectable } from '@nestjs/common';
import { createChatDto } from '../dto/create-chat.dto';
import { updateChatDto } from '../dto/update-chat.dto';
import { Chat } from '../domain/chat';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ChatRepository } from '../infrastructure/persistence/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  create(createChatDto: createChatDto) {
    return this.chatRepository.create(createChatDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.chatRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: Chat['id']) {
    return this.chatRepository.findById(id);
  }

  update(id: Chat['id'], updateChatDto: updateChatDto) {
    return this.chatRepository.update(id, updateChatDto);
  }

  remove(id: Chat['id']) {
    return this.chatRepository.remove(id);
  }
}
