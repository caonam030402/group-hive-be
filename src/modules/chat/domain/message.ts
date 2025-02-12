import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';

import { Chat } from './chat';
import { MessageStatus, MessageType } from '../enum/message.enum';

export class Message {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => User,
  })
  user: User;

  @ApiProperty({
    type: () => Chat,
  })
  chat?: Chat;

  @ApiProperty({
    enum: MessageType,
  })
  type: MessageType;

  @ApiProperty({
    type: String,
    example: 'Hello',
  })
  content: string;

  @ApiProperty({
    enum: MessageStatus,
  })
  status: MessageStatus;

  @ApiProperty({
    type: Date,
  })
  sentAt: Date;
}
