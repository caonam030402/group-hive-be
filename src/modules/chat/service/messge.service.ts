import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../infrastructure/persistence/message.repository';
import { createMessageDto } from '../dto/create-message.dto';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../utils/types/query-options';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  create(createMessageDto: createMessageDto) {
    return this.messageRepository.create(createMessageDto);
  }

  findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }) {
    return this.messageRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      queryOptions,
    });
  }
}
