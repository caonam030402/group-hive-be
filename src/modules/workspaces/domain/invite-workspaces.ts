import { ApiProperty } from '@nestjs/swagger';
import { Workspaces } from './workspaces';

export class InviteWorkspaces {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: String, nullable: true, example: 'XHJSDWE' })
  inviteCode?: string;

  @ApiProperty({ type: String, nullable: true, example: 'https://example.com' })
  link?: string;

  @ApiProperty({ type: Date, nullable: true })
  expiredAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => Workspaces })
  workspace: Workspaces;
}
