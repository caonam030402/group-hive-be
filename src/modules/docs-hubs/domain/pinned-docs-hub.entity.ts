import { ApiProperty } from '@nestjs/swagger';
import { DocsHub } from './docs-hub';
import { User } from '../../users/domain/user';

export class PinnedDocsHub {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: () => User,
  })
  user: User;

  @ApiProperty({
    type: () => DocsHub,
  })
  docsHub: DocsHub;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
