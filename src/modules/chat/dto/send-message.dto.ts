import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Chat } from '../domain/chat';
import { MessageType } from '../enum/message.enum';

export class sendMessagePrivateDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  @IsNumber()
  recipientId: number;

  @ApiPropertyOptional({ type: Number, example: '12321-123-123' })
  @IsOptional()
  @IsString()
  chatId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isFirst: boolean;

  @ApiPropertyOptional({ type: Chat })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    enum: [1, 2, 3],
    externalDocs: {
      description: '1 - Text, 2 - Image, 3 - File',
      url: 'http://example.com',
    },
  })
  @IsEnum(MessageType)
  type: MessageType;
}
