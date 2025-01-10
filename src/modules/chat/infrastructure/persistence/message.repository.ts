import { Message } from '../../domain/message';

export abstract class MessageRepository {
  abstract create(
    data: Omit<Message, 'createdAt' | 'updatedAt'>,
  ): Promise<Message>;
}
