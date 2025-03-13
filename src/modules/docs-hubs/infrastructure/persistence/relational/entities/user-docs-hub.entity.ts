import {
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { DocsHubEntity } from './docs-hub.entity';
import { PermissionDocsHubEntity } from './permission-docs-hub.entity';

@Entity({
  name: 'user_docs_hub',
})
export class UserDocsHubEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @OneToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => DocsHubEntity)
  docsHub: DocsHubEntity;

  @ApiProperty({ type: () => [PermissionDocsHubEntity] })
  @OneToMany(() => PermissionDocsHubEntity, (permission) => permission, {
    eager: true,
    cascade: true,
  })
  permissions: PermissionDocsHubEntity[];
}
