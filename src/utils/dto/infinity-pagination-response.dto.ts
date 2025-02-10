import { Type } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
}

export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiProperty({ type: [classReference] })
    data!: T[];

    @ApiProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}

export class InfinityPaginationRequestDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;
}
