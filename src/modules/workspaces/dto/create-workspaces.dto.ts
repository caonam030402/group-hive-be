import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class CreateWorkspacesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiPropertyOptional({ type: UserEntity })
  @IsOptional()
  @Type(() => UserEntity)
  owner: UserEntity;
}
