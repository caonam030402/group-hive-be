import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { GroupEntity } from './group.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users_groups')
export class UserGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => GroupEntity)
  @JoinColumn()
  group: GroupEntity;
}
