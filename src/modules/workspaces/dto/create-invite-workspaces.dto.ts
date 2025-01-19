import { ApiProperty } from '@nestjs/swagger';
import { Workspaces } from '../domain/workspaces';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class createInviteWorkspacesDto {
  @ApiProperty({ type: Date, nullable: true })
  @IsOptional()
  expiredAt: Date | null;

  @ApiProperty({ type: () => Workspaces })
  @IsOptional()
  @Type(() => Workspaces)
  workspace: Workspaces;
}
