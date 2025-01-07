import { Injectable } from '@nestjs/common';
import { connectedUserRepository } from '../infrastructure/persistence/connected.repository';
import { connectedUser } from '../domain/connected-user';

@Injectable()
export class ConnectedUserService {
  constructor(
    private readonly connectedUserRepository: connectedUserRepository,
  ) {}

  deleteAll(userId: connectedUser['user']['id']): Promise<void> {
    return this.connectedUserRepository.deleteAll(userId);
  }

  delete(socketId: connectedUser['socketId']): Promise<void> {
    return this.connectedUserRepository.delete(socketId);
  }
  create({ socketId, user }: Pick<connectedUser, 'socketId' | 'user'>) {
    return this.connectedUserRepository.create({
      socketId,
      user,
    });
  }
}
