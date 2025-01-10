import { Message } from '../../domain/message';

export abstract class MessageRepository {
  abstract create(
    data: Omit<Message, 'sentAt' | 'status' | 'id'> &
      Partial<Pick<Message, 'group' | 'chat'>>,
  ): Promise<Message>;
}
