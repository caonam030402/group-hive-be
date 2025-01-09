import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ChatEntity } from './chat.entity';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users_chats')
@Unique(['user', 'chat'])
@Index(['user', 'lastReadAt'])
export class UserChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @Index()
  @ManyToOne(() => ChatEntity)
  @JoinColumn()
  chat: ChatEntity;

  @ApiProperty()
  @CreateDateColumn()
  joinedAt: Date;

  @ApiProperty()
  @Column({ type: 'timestamp', nullable: true })
  lastReadAt?: Date;

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  isMuted: boolean;
}
