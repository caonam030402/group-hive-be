import { Injectable } from '@nestjs/common';
import { CreateWorkspacesDto } from './dto/create-workspaces.dto';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto';
import { WorkspacesRepository } from './infrastructure/persistence/workspaces.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { Workspaces } from './domain/workspaces';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspacesRepository: WorkspacesRepository) {}

  create(createWorkspacesDto: CreateWorkspacesDto) {
    return this.workspacesRepository.create(createWorkspacesDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.workspacesRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
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
}
