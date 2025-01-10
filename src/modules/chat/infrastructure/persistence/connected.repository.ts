import { NullableType } from '../../../../utils/types/nullable.type';
import { ConnectedUser } from '../../domain/connected-user';

export abstract class ConnectedUserRepository {
  abstract deleteAll(): Promise<void>;

  abstract create(
    data: Omit<ConnectedUser, 'createdAt' | 'updatedAt'>,
  ): Promise<ConnectedUser>;

  abstract delete(socketId: ConnectedUser['socketId']): Promise<void>;

  abstract findByUserId(
    userId: ConnectedUser['user']['id'],
  ): Promise<NullableType<ConnectedUser>>;
}
