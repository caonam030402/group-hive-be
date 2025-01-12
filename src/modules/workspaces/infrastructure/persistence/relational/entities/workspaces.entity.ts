import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { generateAvatar } from '../../../../../../utils/avatart-default';
import { UserWorkspaceEntity } from './user-workspace.entity';

@Entity({
  name: 'workspaces',
})
export class WorkspacesEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  industry: string;

  @ApiProperty()
  @Column()
  size: string;

  @ApiProperty()
  @Column()
  region: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    type: () => UserEntity,
  })
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  owner: UserEntity;

  @ApiProperty({
    type: () => [UserWorkspaceEntity],
  })
  @OneToMany(
    () => UserWorkspaceEntity,
    (userWorkspace) => userWorkspace.workspace,
    {
      cascade: true,
    },
  )
  members: UserWorkspaceEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  public setDefaultAvatar() {
    if (!this.avatar) {
      this.avatar = generateAvatar({ name: this.name });
    }
  }
}
