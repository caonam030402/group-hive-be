import { Injectable } from '@nestjs/common';
import { ConnectedUserRepository } from '../infrastructure/persistence/connected.repository';
import { ConnectedUser } from '../domain/connected-user';

@Injectable()
export class MessageService {
  constructor(
    private readonly connectedUserRepository: ConnectedUserRepository,
  ) {}

  create({ socketId, user }: Pick<ConnectedUser, 'socketId' | 'user'>) {
    return this.connectedUserRepository.create({
      socketId,
      user,
    });
  }
}
