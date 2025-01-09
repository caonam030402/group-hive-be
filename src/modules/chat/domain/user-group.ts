import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Group } from './group';

export class UserGroup {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Group })
  group: Group;
}
