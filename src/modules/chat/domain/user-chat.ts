import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Chat } from './chat';

export class UserChat {
  @ApiProperty({
    type: String,
  })
  id?: string;

  @ApiProperty({
    type: () => User,
  })
  user?: User;

  @ApiProperty({
    type: () => Chat,
  })
  chat?: Chat;
}
