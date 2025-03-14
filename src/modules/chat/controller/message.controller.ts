import { Controller, Get, UseGuards, Query } from '@nestjs/common';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { FindAllMessageDto } from '../dto/find-all-messages.dto';
import { Message } from '../domain/message';
import { MessageService } from '../service/message.service';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../utils/infinity-pagination';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'message',
  version: '1',
})
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Message),
  })
  async findAll(
    @Query() query: FindAllMessageDto,
  ): Promise<InfinityPaginationResponseDto<Message>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const queryOptions = {
      filterRelational: {
        field: query.filterRelationalField,
        value: query.filterRelationalValue,
      },
      filterBy: {
        field: query.filterByField,
        value: query.filterByValue,
      },
      order: {
        field: query.orderField,
        direction: query.orderDirection,
      },
      search: {
        field: query.searchField,
        value: query.searchValue,
      },
    } as const;

    return infinityPagination(
      await this.messageService.findAllWithPagination({
        queryOptions: queryOptions,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
