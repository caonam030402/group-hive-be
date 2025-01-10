import { IsOptional } from 'class-validator';
import { User } from '../../users/domain/user';
import { UserDto } from '../../users/dto/create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class createChatDto {
  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @Type(() => User)
  userChats: UserDto[];
}
