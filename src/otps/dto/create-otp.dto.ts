import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/create-user.dto';

export class CreateOtpDto {
  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @Type(() => UserEntity)
  user: UserEntity;
}
