import { ApiProperty } from '@nestjs/swagger';
import { UserChat } from './user-chat';
import { Message } from './message';
import { ChatType } from '../enum/chat.enum';
import { Workspaces } from '../../workspaces/domain/workspaces';

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
    type: () => [Message],
  })
  messages?: Message[];

  @ApiProperty({
    type: () => Message,
  })
  lastMessage: Message;

  @ApiProperty({
    type: () => [UserChat],
  })
  userChats: UserChat[];

  @ApiProperty({
    type: () => Workspaces,
  })
  workspace: Workspaces;

  @ApiProperty({
    enum: ChatType,
  })
  chatType: ChatType;

  @ApiProperty({
    type: String,
  })
  avatar?: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;
}
