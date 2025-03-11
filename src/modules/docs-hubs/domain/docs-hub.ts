import { ApiProperty } from '@nestjs/swagger';
import { DocsType } from '../enum/docs-type.enum';
import { User } from '../../users/domain/user';

export class DocsHub {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  docsType: DocsType;

  @ApiProperty({ type: Buffer })
  content: Buffer;

  @ApiProperty({
    type: Number,
  })
  author: User;

  @ApiProperty({
    type: Date,
  })
  lastOpenedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
