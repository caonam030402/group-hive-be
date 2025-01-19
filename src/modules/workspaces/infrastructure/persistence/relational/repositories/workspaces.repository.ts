import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkspacesEntity } from '../entities/workspaces.entity';
import { NullableType } from '../../../../../../utils/types/nullable.type';
import { Workspaces } from '../../../../domain/workspaces';
import { WorkspacesRepository } from '../../workspaces.repository';
import { WorkspacesMapper } from '../mappers/workspaces.mapper';
import { IPaginationOptions } from '../../../../../../utils/types/pagination-options';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserWorkspaceEntity } from '../entities/user-workspace.entity';
import { InviteWorkspacesEntity } from '../entities/invite-workspaces.entity';
import { InviteWorkspaces } from '../../../../domain/invite-workspaces';
import { InviteWorkspacesMapper } from '../mappers/invite-workspaces-mapper';

@Injectable()
export class WorkspacesRelationalRepository implements WorkspacesRepository {
  constructor(
    @InjectRepository(WorkspacesEntity)
    private readonly workspacesRepository: Repository<WorkspacesEntity>,

    @InjectRepository(InviteWorkspacesEntity)
    private readonly inviteWorkspacesRepository: Repository<InviteWorkspacesEntity>,
  ) {}

  async create(data: Workspaces, ownerId: number): Promise<Workspaces> {
    const user = new UserEntity();
    const userWorkspace = new UserWorkspaceEntity();

    user.id = ownerId;
    userWorkspace.user = user;

    const persistenceModel = WorkspacesMapper.toPersistence({
      ...data,
      members: [userWorkspace],
    });
    const newEntity = await this.workspacesRepository.save(
      this.workspacesRepository.create(persistenceModel),
    );
    return WorkspacesMapper.toDomain(newEntity);
  }

  async count(ownerId: number): Promise<number> {
    const count = await this.workspacesRepository
      .createQueryBuilder('workspaces')
      .where('workspaces.ownerId = :id', { id: ownerId })
      .getCount();
    return count;
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
      relations: ['members'],
    });

    return entities.map((entity) => WorkspacesMapper.toDomain(entity));
  }

  async findByOwnerId({
    ownerId,
    name,
  }: {
    ownerId: number;
    name: string;
  }): Promise<NullableType<Workspaces>> {
    const entity = await this.workspacesRepository.findOne({
      relations: ['owner', 'members'],
      where: {
        name: name,
        owner: {
          id: ownerId,
        },
      },
    });
    return entity ? WorkspacesMapper.toDomain(entity) : null;
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

  async createInvite(data: InviteWorkspaces): Promise<InviteWorkspaces> {
    const persistenceModel = InviteWorkspacesMapper.toPersistence(data);
    const newEntity = await this.inviteWorkspacesRepository.save(
      this.inviteWorkspacesRepository.create(persistenceModel),
    );
    return InviteWorkspacesMapper.toDomain(newEntity);
  }
  getInviteByWorkspaceId(
    workspaceId: Workspaces['id'],
  ): Promise<NullableType<InviteWorkspaces>> {
    return this.inviteWorkspacesRepository.findOne({
      where: {
        workspace: {
          id: workspaceId,
        },
      },
    });
  }
}
