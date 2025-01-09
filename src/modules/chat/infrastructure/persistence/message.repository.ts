import { ConnectedUser } from '../../domain/connected-user';
import { Message } from '../../domain/message';

export abstract class MessageRepository {
  abstract create(
    data: Omit<Message, 'createdAt' | 'updatedAt'>,
  ): Promise<ConnectedUser>;
}
