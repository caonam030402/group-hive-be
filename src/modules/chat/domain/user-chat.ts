import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Chat } from './chat';

export class UserChat {
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
  chat: Chat;

  @ApiProperty({
    type: Date,
  })
  joinedAt: Date;

  @ApiProperty({
    type: Date,
  })
  lastReadAt?: Date;

  @ApiProperty({
    type: Boolean,
  })
  isMuted: boolean;
}
