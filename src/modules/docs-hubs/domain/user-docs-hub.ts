import { ApiProperty } from '@nestjs/swagger';
import { PermissionDocsHub } from './permission-docs-hub';
import { DocsHub } from './docs-hub';
import { User } from '../../users/domain/user';

export class UserDocsHub {
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

  @ApiProperty({
    type: [PermissionDocsHub],
  })
  permissions: PermissionDocsHub[];
}
