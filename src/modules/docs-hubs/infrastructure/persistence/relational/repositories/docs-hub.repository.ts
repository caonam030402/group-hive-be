import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocsHubEntity } from '../entities/docs-hub.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { DocsHub } from '../../../../domain/docs-hub';
import { DocsHubRepository } from '../../docs-hub.repository';
import { DocsHubMapper } from '../mappers/docs-hub.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { IQueryOptions } from '../../../../../../utils/types/query-options';
import { applyQueryFilters } from '../../../../../../utils/base-queryBuilder';

@Injectable()
export class DocsHubRelationalRepository implements DocsHubRepository {
  constructor(
    @InjectRepository(DocsHubEntity)
    private readonly docsHubRepository: Repository<DocsHubEntity>,
  ) {}

  async create(data: DocsHub): Promise<DocsHub> {
    const persistenceModel = DocsHubMapper.toPersistence(data);
    const newEntity = await this.docsHubRepository.save(
      this.docsHubRepository.create(persistenceModel),
    );
    return DocsHubMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    queryOptions,
  }: {
    paginationOptions: IPaginationOptions;
    queryOptions: IQueryOptions;
  }): Promise<DocsHub[]> {
    const nameTable = 'docs_hub';
    const queryBuilder = this.docsHubRepository.createQueryBuilder(nameTable);

    applyQueryFilters({
      queryBuilder,
      queryOptions,
      paginationOptions,
      nameTable,
    });

    queryBuilder.leftJoinAndSelect(`${nameTable}.author`, 'author');

    const entities = await queryBuilder.getMany();

    return entities.map((entity) => DocsHubMapper.toDomain(entity));
  }

  async findById(id: DocsHub['id']): Promise<NullableType<DocsHub>> {
    const entity = await this.docsHubRepository.findOne({
      where: { id },
    });

    return entity ? DocsHubMapper.toDomain(entity) : null;
  }

  async update(id: DocsHub['id'], payload: Partial<DocsHub>): Promise<DocsHub> {
    const entity = await this.docsHubRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.docsHubRepository.save(
      this.docsHubRepository.create(
        DocsHubMapper.toPersistence({
          ...DocsHubMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DocsHubMapper.toDomain(updatedEntity);
  }

  async remove(id: DocsHub['id']): Promise<void> {
    await this.docsHubRepository.delete(id);
  }
}
