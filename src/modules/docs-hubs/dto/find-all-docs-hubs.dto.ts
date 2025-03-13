import { IsNumber, IsString } from 'class-validator';
import { PaginationAndFilterDto } from '../../../utils/dto/pagination-and-filter.dto';

export class FindAllDocsHubsDto extends PaginationAndFilterDto {
  @IsString()
  workspaceId: string;

  @IsNumber()
  userId: number;
}
