import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { createChatDto } from '../dto/create-chat.dto';
import { updateChatDto } from '../dto/update-chat.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { FindAllChatDto } from '../dto/find-all-chats.dto';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../utils/infinity-pagination';
import { Chat } from '../domain/chat';
import { ChatService } from '../service/chat.service';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'chat',
  version: '1',
})
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiCreatedResponse({
    type: Chat,
  })
  create(@Body() createChatDto: createChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Chat),
  })
  async findAll(
    @Query() query: FindAllChatDto,
  ): Promise<InfinityPaginationResponseDto<Chat>> {
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
      await this.chatService.findAllWithPagination({
        queryOptions: queryOptions,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Chat,
  })
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Chat,
  })
  update(@Param('id') id: string, @Body() updateChatDto: updateChatDto) {
    return this.chatService.update(id, updateChatDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}
