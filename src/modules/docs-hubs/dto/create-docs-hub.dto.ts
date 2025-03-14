import { IsEnum, IsOptional, IsString } from 'class-validator';
import { DocsType } from '../enum/docs-type.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Type } from 'class-transformer';
import { Workspaces } from '../../workspaces/domain/workspaces';
import { ScopeDocsEnum } from '../enum/scope-docs.enum';

export class CreateDocsHubDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: UserEntity })
  @IsOptional()
  @Type(() => UserEntity)
  author: UserEntity;

  @ApiPropertyOptional({ type: Date })
  lastOpenedAt: Date;

  @ApiPropertyOptional({ enum: ScopeDocsEnum })
  @IsOptional()
  @ApiPropertyOptional({ enum: ScopeDocsEnum })
  scope: ScopeDocsEnum;

  @ApiPropertyOptional({ type: Workspaces })
  @IsOptional()
  @Type(() => Workspaces)
  workspace: Workspaces;

  @ApiPropertyOptional({ enum: DocsType })
  @IsEnum(DocsType)
  docsType: DocsType;
}
