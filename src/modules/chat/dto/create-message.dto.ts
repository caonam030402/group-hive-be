import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { UserDto } from '../../users/dto/create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { MessageType } from '../infrastructure/persistence/relational/entities';

export class createMessageDto {
  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @Type(() => UserDto)
  user: UserDto;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  chat?: {
    id: number;
  };

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  group?: {
    id: number;
  };

  @ApiPropertyOptional({ enum: MessageType })
  @IsEnum(MessageType)
  @Transform(({ value }) => value && MessageType[value])
  type: MessageType;

  @ApiPropertyOptional({ type: String })
  @IsString()
  content: MessageType;
}
