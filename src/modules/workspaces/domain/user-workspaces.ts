import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Workspaces } from './workspaces';

export class UserWorkspace {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: () => Workspaces })
  workspace: Workspaces;
}
