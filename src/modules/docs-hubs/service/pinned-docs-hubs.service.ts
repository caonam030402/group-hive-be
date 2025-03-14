import { Injectable } from '@nestjs/common';
import { PinnedDocsHubRepository } from '../infrastructure/persistence/pinned-docs-hub.repository';
import { CreatePinnedDocsHubDto } from '../dto/create-pinned-docs-hub.dto';
import { IQueryOptions } from '../../../utils/types/query-options';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { UpdatePinnedDocsHubDto } from '../dto/update-pinned-docs-hub.dto';
import { PinnedDocsHub } from '../domain/pinned-docs-hub.entity';
import { DocsHub } from '../domain/docs-hub';

@Injectable()
export class PinnedDocsHubsService {
  constructor(
    private readonly pinnedDocsHubRepository: PinnedDocsHubRepository,
  ) {}

  create(createPinnedDocsHubDto: CreatePinnedDocsHubDto) {
    return this.pinnedDocsHubRepository.create(createPinnedDocsHubDto);
  }

  findAllWithPagination({
    paginationOptions,
    queryOptions,
    userId,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
    userId: number;
  }) {
    return this.pinnedDocsHubRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      queryOptions: queryOptions,
      userId,
    });
  }

  findOne(id: PinnedDocsHub['id']) {
    return this.pinnedDocsHubRepository.findById(id);
  }

  update(
    id: PinnedDocsHub['id'],
    updatePinnedDocsHubDto: UpdatePinnedDocsHubDto,
  ) {
    return this.pinnedDocsHubRepository.update(id, updatePinnedDocsHubDto);
  }

  remove(id: PinnedDocsHub['id']) {
    return this.pinnedDocsHubRepository.remove(id);
  }

  removeByDocsHub(id: DocsHub['id']) {
    return this.pinnedDocsHubRepository.removeByDocsHub(id);
  }
}
