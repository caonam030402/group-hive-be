import { Injectable } from '@nestjs/common';
import { CreateDocsHubDto } from '../dto/create-docs-hub.dto';
import { UpdateDocsHubDto } from '../dto/update-docs-hub.dto';
import { DocsHubRepository } from '../infrastructure/persistence/docs-hub.repository';
import { DocsHub } from '../domain/docs-hub';
import { IFindAllDocsHubs } from '../interface/find-all-docs-hubs.interface';

@Injectable()
export class DocsHubsService {
  constructor(private readonly docsHubRepository: DocsHubRepository) {}

  create(createDocsHubDto: CreateDocsHubDto) {
    return this.docsHubRepository.create(createDocsHubDto);
  }

  findAllWithPagination({
    paginationOptions,
    queryOptions,
    workspaceId,
    userId,
    isShared,
    scope,
  }: IFindAllDocsHubs) {
    return this.docsHubRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      queryOptions: queryOptions,
      userId,
      workspaceId,
      isShared,
      scope,
    });
  }

  findOne(id: DocsHub['id']) {
    console.log(this.docsHubRepository.findById(id));
    return this.docsHubRepository.findById(id);
  }

  update(id: DocsHub['id'], updateDocsHubDto: UpdateDocsHubDto) {
    return this.docsHubRepository.update(id, updateDocsHubDto);
  }

  remove(id: DocsHub['id']) {
    return this.docsHubRepository.remove(id);
  }
}
