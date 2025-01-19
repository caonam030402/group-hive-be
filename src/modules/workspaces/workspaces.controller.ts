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
  HttpStatus,
  HttpCode,
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
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { UserEntity } from '../users/infrastructure/persistence/relational/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { SendInviteMailDto } from './dto/send-invite-mail.dto';
import { createInviteWorkspacesDto } from './dto/create-invite-workspaces.dto';
import { InviteWorkspaces } from './domain/invite-workspaces';

@ApiTags('Workspaces')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'workspaces',
  version: '1',
})
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: Workspaces,
  })
  create(
    @Body() createWorkspacesDto: CreateWorkspacesDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.workspacesService.create({
      createWorkspacesDto,
      ownerId: user.id,
    });
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Workspaces),
  })
  async findAll(
    @Query() query: FindAllWorkspacesDto,
    @CurrentUser() user: UserEntity,
  ): Promise<InfinityPaginationResponseDto<Workspaces>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.workspacesService.findAllWithPagination({
        ownerId: user.id,
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

  @Post('invite-send-mail')
  @HttpCode(HttpStatus.NO_CONTENT)
  inviteSendMail(@Body() sendInviteMailDto: SendInviteMailDto) {
    return this.mailService.sendEmailInviteWorkspace(sendInviteMailDto.emails);
  }

  @Post('create-invite')
  @HttpCode(HttpStatus.NO_CONTENT)
  createInvite(@Body() createInviteWorkspacesDto: createInviteWorkspacesDto) {
    return this.workspacesService.createInvite(createInviteWorkspacesDto);
  }

  @Get('get-invite/:workspaceId')
  @ApiOkResponse({
    type: InviteWorkspaces,
  })
  getInvite(@Param('workspaceId') workspaceId: Workspaces['id']) {
    console.log(this.workspacesService.getInvite(workspaceId));
    return this.workspacesService.getInvite(workspaceId);
  }
}
