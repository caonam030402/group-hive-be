import { Injectable } from '@nestjs/common';
import { createChatDto } from '../dto/create-chat.dto';
import { updateChatDto } from '../dto/update-chat.dto';
import { chatRepository } from '../infrastructure/persistence/chat.repository';
import { chat } from '../domain/chat';
import { IPaginationOptions } from '../../../utils/types/pagination-options';

@Injectable()
export class chatService {
  constructor(private readonly chatRepository: chatRepository) {}

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

  findOne(id: chat['id']) {
    return this.chatRepository.findById(id);
  }

  update(id: chat['id'], updateChatDto: updateChatDto) {
    return this.chatRepository.update(id, updateChatDto);
  }

  remove(id: chat['id']) {
    return this.chatRepository.remove(id);
  }
}
