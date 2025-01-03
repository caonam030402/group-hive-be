import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

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
  @OneToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn()
  owner: UserEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
