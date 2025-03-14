import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UserChat } from '../domain/user-chat';
import { ChatType } from '../enum/chat.enum';
import { Workspaces } from '../../workspaces/domain/workspaces';

export class createChatDto {
  @ApiPropertyOptional({ type: UserChat })
  @IsOptional()
  @Type(() => UserChat)
  userChats: UserChat[];

  @ApiPropertyOptional({ enum: ChatType })
  @IsEnum(ChatType)
  chatType: ChatType;

  @ApiPropertyOptional({ type: Workspaces })
  @IsOptional()
  workspace: Workspaces;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  hasCheck: boolean;
}
