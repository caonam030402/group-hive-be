import { connectedUser } from '../../domain/connected-user';

export abstract class connectedUserRepository {
  abstract deleteAll(id: connectedUser['user']['id']): Promise<void>;

  abstract create(
    data: Omit<connectedUser, 'createdAt' | 'updatedAt'>,
  ): Promise<connectedUser>;

  abstract delete(socketId: connectedUser['socketId']): Promise<void>;
}
