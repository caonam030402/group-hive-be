import { ApiProperty } from '@nestjs/swagger';

export class Group {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;
}
