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
import { DocsHubsService } from '.././service/docs-hubs.service';
import { CreateDocsHubDto } from '.././dto/create-docs-hub.dto';
import { UpdateDocsHubDto } from '.././dto/update-docs-hub.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DocsHub } from '.././domain/docs-hub';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../../utils/infinity-pagination';
import { FindAllDocsHubsDto } from '.././dto/find-all-docs-hubs.dto';
import { normalizeQueryOptions } from '../../../utils/base-queryBuilder';

@ApiTags('Docshubs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'docs-hubs',
  version: '1',
})
export class DocsHubsController {
  constructor(private readonly docsHubsService: DocsHubsService) {}

  @Post()
  @ApiCreatedResponse({
    type: DocsHub,
  })
  create(@Body() createDocsHubDto: CreateDocsHubDto) {
    return this.docsHubsService.create(createDocsHubDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(DocsHub),
  })
  async findAll(
    @Query() query: FindAllDocsHubsDto,
  ): Promise<InfinityPaginationResponseDto<DocsHub>> {
    const { limit, page, queryOptions } = normalizeQueryOptions(query);

    return infinityPagination(
      await this.docsHubsService.findAllWithPagination({
        queryOptions: queryOptions,
        paginationOptions: {
          page,
          limit,
        },
        workspaceId: query.workspaceId,
        userId: query.userId,
        isShared: query.isShared,
        scope: query.scope,
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
    type: DocsHub,
  })
  findOne(@Param('id') id: string) {
    return this.docsHubsService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DocsHub,
  })
  update(@Param('id') id: string, @Body() updateDocsHubDto: UpdateDocsHubDto) {
    return this.docsHubsService.update(id, updateDocsHubDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.docsHubsService.remove(id);
  }
}
