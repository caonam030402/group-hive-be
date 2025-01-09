import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConnectedUserRepository } from '../../connected.repository';
import { ConnectedUserEntity } from '../entities/connected-user.entity';
import { ConnectedUser } from '../../../../domain/connected-user';
import { ConnectedUserMapper } from '../mappers/connected-user.mapper';
import { NullableType } from '../../../../../../utils/types/nullable.type';

@Injectable()
export class ConnectedUserRelationalRepository
  implements ConnectedUserRepository
{
  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly connectedUserRepository: Repository<ConnectedUserEntity>,
  ) {}

  async deleteAll(id: ConnectedUser['user']['id']): Promise<void> {
    await this.connectedUserRepository.delete({
      user: {
        id: Number(id),
      },
    });
  }

  async create(data: ConnectedUser): Promise<ConnectedUser> {
    const persistenceModel = ConnectedUserMapper.toPersistence(data);
    const newEntity = await this.connectedUserRepository.save(
      this.connectedUserRepository.create(persistenceModel),
    );
    return ConnectedUserMapper.toDomain(newEntity);
  }

  async delete(socketId: ConnectedUser['socketId']): Promise<void> {
    await this.connectedUserRepository.delete({ socketId });
  }

  async findByUserId(
    userId: ConnectedUser['user']['id'],
  ): Promise<NullableType<ConnectedUser>> {
    const userEntity = await this.connectedUserRepository.findOneBy({
      user: { id: Number(userId) },
    });

    return userEntity ? ConnectedUserMapper.toDomain(userEntity) : null;
  }
}
