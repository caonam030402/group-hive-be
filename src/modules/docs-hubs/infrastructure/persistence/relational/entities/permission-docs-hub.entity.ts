import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionDocsHubEnum } from '../../../../enum/permission-docs.enum';

@Entity({
  name: 'permission_docs_hub',
})
export class PermissionDocsHubEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ enum: PermissionDocsHubEnum, nullable: true })
  type: PermissionDocsHubEnum;
}
