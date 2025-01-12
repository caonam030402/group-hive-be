import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Chat } from '../domain/chat';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';
import { MessageType } from '../enum/message.enum';

export class createMessageDto {
  @ApiPropertyOptional({ type: UserEntity })
  @IsOptional()
  @Type(() => UserEntity)
  user: UserEntity;

  @ApiPropertyOptional({ type: Chat })
  @IsOptional()
  @Type(() => Chat)
  chat: Chat;

  @ApiPropertyOptional({
    enum: [1, 2, 3],
    externalDocs: {
      description: '1 - Text, 2 - Image, 3 - File',
      url: 'http://example.com',
    },
  })
  @IsEnum(MessageType)
  type: MessageType;

  @ApiPropertyOptional({ type: String })
  @IsString()
  content: string;
}
