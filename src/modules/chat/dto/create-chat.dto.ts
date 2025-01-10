import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserChat } from '../domain/user-chat';

export class createChatDto {
  @ApiPropertyOptional({ type: UserChat })
  @IsOptional()
  @Type(() => UserChat)
  userChats: UserChat;
}
