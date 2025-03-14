import { ApiProperty } from '@nestjs/swagger';
import { DocsType } from '../enum/docs-type.enum';
import { User } from '../../users/domain/user';
import { UserDocsHub } from './user-docs-hub';
import { Workspaces } from '../../workspaces/domain/workspaces';
import { ScopeDocsEnum } from '../enum/scope-docs.enum';

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

  @ApiProperty({
    type: () => Workspaces,
  })
  workspace: Workspaces;

  @ApiProperty({
    enum: ScopeDocsEnum,
  })
  scope: ScopeDocsEnum;

  @ApiProperty({
    type: [UserDocsHub],
  })
  userDocsHub: UserDocsHub[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
