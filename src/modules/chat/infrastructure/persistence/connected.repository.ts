import { ConnectedUser } from '../../domain/connected-user';

export abstract class ConnectedUserRepository {
  abstract deleteAll(id: ConnectedUser['user']['id']): Promise<void>;

  abstract create(
    data: Omit<ConnectedUser, 'createdAt' | 'updatedAt'>,
  ): Promise<ConnectedUser>;

  abstract delete(socketId: ConnectedUser['socketId']): Promise<void>;
}
