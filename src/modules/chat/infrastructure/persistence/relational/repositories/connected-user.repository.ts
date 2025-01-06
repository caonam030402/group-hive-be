import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { chatEntity } from '../entities/chat.entity';

import { connectedUserRepository } from '../../connected.repository';
import { connectedUserEntity } from '../entities/connected-user.entity';
import { connectedUser } from '../../../../domain/connected-user';
import { connectedUserMapper } from '../mappers/connected-user.mapper';

@Injectable()
export class ConnectedUserRelationalRepository
  implements connectedUserRepository
{
  constructor(
    @InjectRepository(chatEntity)
    private readonly connectedUserRepository: Repository<connectedUserEntity>,
  ) {}

  async deleteAll(id: connectedUser['user']['id']): Promise<void> {
    await this.connectedUserRepository.delete({
      user: {
        id: Number(id),
      },
    });
  }

  async create(data: connectedUser): Promise<void> {
    const persistenceModel = connectedUserMapper.toPersistence(data);
    await this.connectedUserRepository.save(persistenceModel);
  }

  async delete(socketId: connectedUser['socketId']): Promise<void> {
    await this.connectedUserRepository.delete({ socketId });
  }
}
