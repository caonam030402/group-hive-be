import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';
import { InfinityPaginationRequestDto } from '../../../utils/dto/infinity-pagination-response.dto';

export class FindAllMemberDto extends InfinityPaginationRequestDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  workspaceId?: string;
}
