import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { User } from '../../users/domain/user';
import { DocsHub } from '../domain/docs-hub';

export class CreatePinnedDocsHubDto {
  @IsOptional()
  @Type(() => User)
  user: User;

  @ApiPropertyOptional({
    type: DocsHub,
    example: {
      id: '1',
    },
  })
  @IsOptional()
  @Type(() => DocsHub)
  docsHub: DocsHub;
}
