import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { applyQueryFilters } from '../../../../../../utils/base-queryBuilder';
import { PinnedDocsHubEntity } from '../entities/pinned-docs-hub.entity';
import { PinnedDocsHubMapper } from '../mappers/pinned-docs-hub.mapper';
import { PinnedDocsHub } from '../../../../domain/pinned-docs-hub.entity';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../../../utils/types/query-options';
import { PinnedDocsHubRepository } from '../../pinned-docs-hub.repository';

@Injectable()
export class PinnedDocsHubRelationalRepository
  implements PinnedDocsHubRepository
{
  constructor(
    @InjectRepository(PinnedDocsHubEntity)
    private readonly pinnedDocsHubRepository: Repository<PinnedDocsHubEntity>,
  ) {}

  async create(data: PinnedDocsHub): Promise<PinnedDocsHub> {
    const persistenceModel = PinnedDocsHubMapper.toPersistence(data);
    const newEntity = await this.pinnedDocsHubRepository.save(
      this.pinnedDocsHubRepository.create(persistenceModel),
    );
    return PinnedDocsHubMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<PinnedDocsHub[]> {
    const nameTable = 'pinned_docs_hub';
    const queryBuilder =
      this.pinnedDocsHubRepository.createQueryBuilder(nameTable);

    applyQueryFilters({
      queryBuilder,
      queryOptions,
      paginationOptions,
      nameTable,
    });

    const entities = await queryBuilder.getMany();

    return entities.map((entity) => PinnedDocsHubMapper.toDomain(entity));
  }

  async findById(
    id: PinnedDocsHub['id'],
  ): Promise<NullableType<PinnedDocsHub>> {
    const entity = await this.pinnedDocsHubRepository.findOne({
      where: { id },
    });
    return entity ? PinnedDocsHubMapper.toDomain(entity) : null;
  }

  async update(
    id: PinnedDocsHub['id'],
    payload: Partial<PinnedDocsHub>,
  ): Promise<PinnedDocsHub> {
    const entity = await this.pinnedDocsHubRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.pinnedDocsHubRepository.save(
      this.pinnedDocsHubRepository.create(
        PinnedDocsHubMapper.toPersistence({
          ...PinnedDocsHubMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PinnedDocsHubMapper.toDomain(updatedEntity);
  }

  async remove(id: PinnedDocsHub['id']): Promise<void> {
    await this.pinnedDocsHubRepository.delete(id);
  }
}
