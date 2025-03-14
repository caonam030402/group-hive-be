import { IsOptional, IsString } from 'class-validator';
import { PaginationAndFilterDto } from '../../../utils/dto/pagination-and-filter.dto';
import { ScopeDocsEnum } from '../enum/scope-docs';

export class FindAllDocsHubsDto extends PaginationAndFilterDto {
  @IsString()
  workspaceId: string;

  @IsString()
  userId: number;

  @IsString()
  @IsOptional()
  isShared: boolean;

  @IsString()
  @IsOptional()
  scope: ScopeDocsEnum;
}
