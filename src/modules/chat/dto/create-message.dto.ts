import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { MessageType } from '../infrastructure/persistence/relational/entities';
import { Group } from '../domain/group';
import { Chat } from '../domain/chat';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class createMessageDto {
  @ApiPropertyOptional({ type: UserEntity })
  @IsOptional()
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiPropertyOptional({ type: Chat })
  @IsOptional()
  @Type(() => Chat)
  chat: Chat;

  @ApiPropertyOptional({ type: Group })
  @IsOptional()
  @Type(() => Group)
  group?: Group;

  @ApiPropertyOptional({ enum: MessageType })
  @IsEnum(MessageType)
  @Transform(({ value }) => value && MessageType[value])
  type: MessageType;

  @ApiPropertyOptional({ type: String })
  @IsString()
  content: string;
}
