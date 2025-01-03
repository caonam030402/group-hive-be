import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserDto } from '../../users/dto/create-user.dto';

export class CreateWorkspacesDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  industry: string;

  @ApiProperty()
  @IsString()
  size: string;

  @ApiProperty()
  @IsString()
  region: string;

  @ApiProperty()
  @IsEmpty()
  description: string;

  @ApiProperty()
  @IsEmpty()
  avatar: string;

  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @Type(() => UserEntity)
  owner: UserEntity;
}
