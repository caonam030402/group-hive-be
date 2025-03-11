import { Injectable } from '@nestjs/common';
import { CreateDocsHubDto } from './dto/create-docs-hub.dto';
import { UpdateDocsHubDto } from './dto/update-docs-hub.dto';
import { DocsHubRepository } from './infrastructure/persistence/docs-hub.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { DocsHub } from './domain/docs-hub';
import { IQueryOptions } from '../../utils/types/query-options';

@Injectable()
export class DocsHubsService {
  constructor(private readonly docsHubRepository: DocsHubRepository) {}

  create(createDocsHubDto: CreateDocsHubDto) {
    return this.docsHubRepository.create(createDocsHubDto);
  }

  findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }) {
    return this.docsHubRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      queryOptions: queryOptions,
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
