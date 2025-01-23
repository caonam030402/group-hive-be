import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { Workspaces } from '../domain/workspaces';
import { IsOptional } from 'class-validator';

export class JoinWorkspaceDto {
  @ApiProperty({ type: () => User, nullable: true })
  @IsOptional()
  userId: User['id'];

  @ApiProperty({ type: () => Workspaces, nullable: true })
  @IsOptional()
  workspaceId: Workspaces['id'];
}
