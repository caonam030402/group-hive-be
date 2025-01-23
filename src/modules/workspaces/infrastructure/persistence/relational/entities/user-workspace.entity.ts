import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { WorkspacesEntity } from './workspaces.entity';

@Entity({
  name: 'user_workspaces',
})
export class UserWorkspaceEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => WorkspacesEntity, (workspace) => workspace.members)
  @JoinColumn()
  workspace: WorkspacesEntity;
}
