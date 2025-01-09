import { ApiProperty } from '@nestjs/swagger';
import { UserChat } from './user-chat';
import { Message } from './message';

export class Chat {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'General',
  })
  name: string;

  @ApiProperty({
    type: () => Message,
  })
  messages: Message;

  @ApiProperty({
    type: () => UserChat,
  })
  userChats: UserChat;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
