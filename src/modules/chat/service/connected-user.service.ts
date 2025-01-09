import { Injectable } from '@nestjs/common';
import { ConnectedUserRepository } from '../infrastructure/persistence/connected.repository';
import { ConnectedUser } from '../domain/connected-user';

@Injectable()
export class ConnectedUserService {
  constructor(
    private readonly connectedUserRepository: ConnectedUserRepository,
  ) {}

  deleteAll(userId: ConnectedUser['user']['id']): Promise<void> {
    return this.connectedUserRepository.deleteAll(userId);
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
}
