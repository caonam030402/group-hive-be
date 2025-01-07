import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { connectedUserRepository } from '../../connected.repository';
import { connectedUserEntity } from '../entities/connected-user.entity';
import { connectedUser } from '../../../../domain/connected-user';
import { connectedUserMapper } from '../mappers/connected-user.mapper';

@Injectable()
export class ConnectedUserRelationalRepository
  implements connectedUserRepository
{
  constructor(
    @InjectRepository(connectedUserEntity)
    private readonly connectedUserRepository: Repository<connectedUserEntity>,
  ) {}

  async deleteAll(id: connectedUser['user']['id']): Promise<void> {
    await this.connectedUserRepository.delete({
      user: {
        id: Number(id),
      },
    });
  }

  async create(data: connectedUser): Promise<connectedUser> {
    const persistenceModel = connectedUserMapper.toPersistence(data);
    const newEntity = await this.connectedUserRepository.save(
      this.connectedUserRepository.create(persistenceModel),
    );
    return connectedUserMapper.toDomain(newEntity);
  }

  async delete(socketId: connectedUser['socketId']): Promise<void> {
    await this.connectedUserRepository.delete({ socketId });
  }
}
