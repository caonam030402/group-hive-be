import { Injectable } from '@nestjs/common';
import { ConnectedUserRepository } from '../infrastructure/persistence/connected.repository';
import { ConnectedUser } from '../domain/connected-user';
import { NullableType } from '../../../utils/types/nullable.type';

@Injectable()
export class ConnectedUserService {
  constructor(
    private readonly connectedUserRepository: ConnectedUserRepository,
  ) {}

  deleteAll(): Promise<void> {
    return this.connectedUserRepository.deleteAll();
  }

  delete(socketId: ConnectedUser['socketId']): Promise<void> {
    return this.connectedUserRepository.delete(socketId);
  }
  create({ socketId, user }: Pick<ConnectedUser, 'socketId' | 'user'>) {
    return this.connectedUserRepository.create({
      socketId,
      user,
    });
  }

  findByUserId(
    userId: ConnectedUser['user']['id'],
  ): Promise<NullableType<ConnectedUser>> {
    return this.connectedUserRepository.findByUserId(userId);
  }
}
