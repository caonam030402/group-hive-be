import { ApiProperty } from '@nestjs/swagger';
import { PermissionDocsHubEnum } from '../enum/permission-docs.enum';

export class PermissionDocsHub {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    enum: PermissionDocsHubEnum,
  })
  type: PermissionDocsHubEnum;
}
