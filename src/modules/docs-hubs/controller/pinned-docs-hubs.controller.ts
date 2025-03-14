import { CurrentUser } from './../../../common/decorator/current-user.decorator';
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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DocsHub } from '../domain/docs-hub';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../utils/infinity-pagination';
import { normalizeQueryOptions } from '../../../utils/base-queryBuilder';
import { PinnedDocsHubsService } from '../service/pinned-docs-hubs.service';
import { CreatePinnedDocsHubDto } from '../dto/create-pinned-docs-hub.dto';
import { PinnedDocsHub } from '../domain/pinned-docs-hub.entity';
import { UpdatePinnedDocsHubDto } from '../dto/update-pinned-docs-hub.dto';
import { FindAllPinnedDocsHubsDto } from '../dto/find-all-pinned-docs-hubs.dto';
import { User } from '../../users/domain/user';

@ApiTags('Docshubs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'docs-hubs-pinned',
  version: '1',
})
export class PinnedDocsHubsController {
  constructor(private readonly pinnedDocsHubsService: PinnedDocsHubsService) {}

  @Post()
  @ApiCreatedResponse({
    type: DocsHub,
  })
  create(
    @Body() createPinnedDocsHubDto: CreatePinnedDocsHubDto,
    @CurrentUser() user: User,
  ) {
    const data = {
      ...createPinnedDocsHubDto,
      user: {
        id: user.id,
      } as User,
    };

    return this.pinnedDocsHubsService.create(data);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(PinnedDocsHub),
  })
  async findAll(
    @Query() query: FindAllPinnedDocsHubsDto,
    @CurrentUser() user: User,
  ): Promise<InfinityPaginationResponseDto<PinnedDocsHub>> {
    const { limit, page, queryOptions } = normalizeQueryOptions(query);

    return infinityPagination(
      await this.pinnedDocsHubsService.findAllWithPagination({
        queryOptions: queryOptions,
        paginationOptions: {
          page,
          limit,
        },
        userId: user.id,
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
    type: PinnedDocsHub,
  })
  findOne(@Param('id') id: string) {
    return this.pinnedDocsHubsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PinnedDocsHub,
  })
  update(
    @Param('id') id: string,
    @Body() updatePinnedDocsHubDto: UpdatePinnedDocsHubDto,
  ) {
    return this.pinnedDocsHubsService.update(id, updatePinnedDocsHubDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.pinnedDocsHubsService.remove(id);
  }

  @Delete('byDocs/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  removeByDocs(@Param('id') id: string) {
    return this.pinnedDocsHubsService.removeByDocsHub(id);
  }
}
