import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Group } from './group';
import {
  MessageStatus,
  MessageType,
} from '../infrastructure/persistence/relational/entities';
import { Chat } from './chat';

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
    type: () => Group,
  })
  group?: Group;

  @ApiProperty({
    type: () => Chat,
  })
  chat?: Chat;

  @ApiProperty({
    type: String,
  })
  type: MessageType;

  @ApiProperty({
    type: String,
    example: 'Hello',
  })
  content: string;

  @ApiProperty({
    type: MessageStatus,
  })
  status: MessageStatus;

  @ApiProperty({
    type: Date,
  })
  sentAt: Date;
}
