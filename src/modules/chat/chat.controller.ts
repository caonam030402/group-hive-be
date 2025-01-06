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
import { createChatDto } from './dto/create-chat.dto';
import { updateChatDto } from './dto/update-chat.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { chat } from './domain/chat';
import { AuthGuard } from '@nestjs/passport';

import { chatService } from './service/chat.service';
import { FindAllChatDto } from './dto/find-all-chats.dto';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'chat',
  version: '1',
})
export class chatController {
  constructor(private readonly chatService: chatService) {}

  @Post()
  @ApiCreatedResponse({
    type: chat,
  })
  create(@Body() createChatDto: createChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(chat),
  })
  async findAll(
    @Query() query: FindAllChatDto,
  ): Promise<InfinityPaginationResponseDto<chat>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.chatService.findAllWithPagination({
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
    type: chat,
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
    type: chat,
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
