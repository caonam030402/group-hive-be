import { Injectable } from '@nestjs/common';
import { CreateDocsHubDto } from './dto/create-docs-hub.dto';
import { UpdateDocsHubDto } from './dto/update-docs-hub.dto';
import { DocsHubRepository } from './infrastructure/persistence/docs-hub.repository';
import { IPaginationOptions } from '../../utils/types/pagination-options';
import { DocsHub } from './domain/docs-hub';

@Injectable()
export class DocsHubsService {
  constructor(private readonly docsHubRepository: DocsHubRepository) {}

  create(createDocsHubDto: CreateDocsHubDto) {
    return this.docsHubRepository.create(createDocsHubDto);
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.docsHubRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findOne(id: DocsHub['id']) {
    return this.docsHubRepository.findById(id);
  }

  update(id: DocsHub['id'], updateDocsHubDto: UpdateDocsHubDto) {
    return this.docsHubRepository.update(id, updateDocsHubDto);
  }

  remove(id: DocsHub['id']) {
    return this.docsHubRepository.remove(id);
  }
}
