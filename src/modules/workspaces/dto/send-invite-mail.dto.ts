import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class SendInviteMailDto {
  @ApiProperty({ type: [String] })
  @IsArray()
  emails: string[];
}
