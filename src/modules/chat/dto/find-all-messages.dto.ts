import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllMessageDto {
  @ApiPropertyOptional({
    description: 'The page number for pagination',
    default: 1,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    description: 'The number of items per page for pagination',
    default: 10,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({
    description: 'Filter by relational fields (e.g., userId)',
  })
  @IsOptional()
  filterRelationalField?: string;

  @ApiPropertyOptional({
    description: 'Filter by relational value',
  })
  @IsOptional()
  filterRelationalValue?: string;

  @ApiPropertyOptional({
    description: 'Filter by specific fields (e.g., name)',
  })
  @IsOptional()
  filterByField?: string;

  @ApiPropertyOptional({
    description: 'Filter by specific field value',
  })
  @IsOptional()
  filterByValue?: string;

  @ApiPropertyOptional({
    description: 'Order by a specific field and direction (asc/desc)',
  })
  @IsOptional()
  orderField?: string;

  @ApiPropertyOptional({
    description: 'Order direction (asc or desc)',
  })
  @IsOptional()
  orderDirection?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Search keyword for a specific field (e.g., name)',
  })
  @IsOptional()
  searchField?: string;

  @ApiPropertyOptional({
    description: 'Search value',
  })
  @IsOptional()
  searchValue?: string;
}
