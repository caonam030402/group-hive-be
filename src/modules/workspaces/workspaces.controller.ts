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
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspacesDto } from './dto/create-workspaces.dto';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Workspaces } from './domain/workspaces';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../../utils/infinity-pagination';
import { FindAllWorkspacesDto } from './dto/find-all-workspaces.dto';

@ApiTags('Workspaces')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'workspaces',
  version: '1',
})
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Workspaces,
  })
  create(@Body() createWorkspacesDto: CreateWorkspacesDto) {
    return this.workspacesService.create(createWorkspacesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Workspaces),
  })
  async findAll(
    @Query() query: FindAllWorkspacesDto,
  ): Promise<InfinityPaginationResponseDto<Workspaces>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.workspacesService.findAllWithPagination({
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
    type: Workspaces,
  })
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Workspaces,
  })
  update(
    @Param('id') id: string,
    @Body() updateWorkspacesDto: UpdateWorkspacesDto,
  ) {
    return this.workspacesService.update(id, updateWorkspacesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(id);
  }
}
