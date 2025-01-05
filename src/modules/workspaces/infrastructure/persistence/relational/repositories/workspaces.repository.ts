import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspacesEntity } from '../entities/workspaces.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Workspaces } from '../../../../domain/workspaces';
import { WorkspacesRepository } from '../../workspaces.repository';
import { WorkspacesMapper } from '../mappers/workspaces.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';

@Injectable()
export class WorkspacesRelationalRepository implements WorkspacesRepository {
  constructor(
    @InjectRepository(WorkspacesEntity)
    private readonly workspacesRepository: Repository<WorkspacesEntity>,
  ) {}

  async create(data: Workspaces): Promise<Workspaces> {
    const persistenceModel = WorkspacesMapper.toPersistence(data);
    const newEntity = await this.workspacesRepository.save(
      this.workspacesRepository.create(persistenceModel),
    );
    return WorkspacesMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    ownerId,
  }: {
    paginationOptions: IPaginationOptions;
    ownerId: number;
  }): Promise<Workspaces[]> {
    const entities = await this.workspacesRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: {
        owner: {
          id: ownerId,
        },
      },
    });

    return entities.map((entity) => WorkspacesMapper.toDomain(entity));
  }

  async findById(id: Workspaces['id']): Promise<NullableType<Workspaces>> {
    const entity = await this.workspacesRepository.findOne({
      where: { id },
    });

    return entity ? WorkspacesMapper.toDomain(entity) : null;
  }

  async update(
    id: Workspaces['id'],
    payload: Partial<Workspaces>,
  ): Promise<Workspaces> {
    const entity = await this.workspacesRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.workspacesRepository.save(
      this.workspacesRepository.create(
        WorkspacesMapper.toPersistence({
          ...WorkspacesMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return WorkspacesMapper.toDomain(updatedEntity);
  }

  async remove(id: Workspaces['id']): Promise<void> {
    await this.workspacesRepository.delete(id);
  }
}
