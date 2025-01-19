import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateWorkspacesDto } from './dto/create-workspaces.dto';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto';
import { WorkspacesRepository } from './infrastructure/persistence/workspaces.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Workspaces } from './domain/workspaces';
import { createInviteWorkspacesDto } from './dto/create-invite-workspaces.dto';
import dayjs from 'dayjs';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspacesRepository: WorkspacesRepository) {}

  async create({
    createWorkspacesDto,
    ownerId,
  }: {
    createWorkspacesDto: CreateWorkspacesDto;
    ownerId: number;
  }) {
    const maxCount = 5;
    const count = await this.workspacesRepository.count(ownerId);
    const listWorkspace = await this.workspacesRepository.findByOwnerId({
      name: createWorkspacesDto.name,
      ownerId,
    });

    if (listWorkspace) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: `This name has been duplicated`,
      });
    }

    if (count > maxCount) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: `You can only create ${maxCount} workspaces`,
      });
    }

    const workspace = await this.workspacesRepository.create(
      createWorkspacesDto,
      ownerId,
    );
    console.log(workspace);
    await this.workspacesRepository.createInvite({
      workspace: workspace,
      expiredAt: dayjs().add(5, 'day').toDate(),
    });

    return workspace;
  }

  findAllWithPagination({
    ownerId,
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
    ownerId?: number;
  }) {
    return this.workspacesRepository.findAllWithPagination({
      ownerId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  createInvite(createInviteWorkspaceDto: createInviteWorkspacesDto) {
    const isCheckTime = dayjs(createInviteWorkspaceDto.expiredAt).isBefore(
      dayjs(),
    );

    if (isCheckTime) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: `The time has expired`,
      });
    }

    return this.workspacesRepository.createInvite(createInviteWorkspaceDto);
  }

  findOne(id: Workspaces['id']) {
    return this.workspacesRepository.findById(id);
  }

  update(id: Workspaces['id'], updateWorkspacesDto: UpdateWorkspacesDto) {
    return this.workspacesRepository.update(id, updateWorkspacesDto);
  }

  remove(id: Workspaces['id']) {
    return this.workspacesRepository.remove(id);
  }

  getInvite(idWorkspace: Workspaces['id']) {
    return this.workspacesRepository.getInviteByWorkspaceId(idWorkspace);
  }
}
