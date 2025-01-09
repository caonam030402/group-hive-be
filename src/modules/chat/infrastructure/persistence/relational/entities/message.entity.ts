import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { GroupEntity } from './group.entity';
import { ChatEntity } from './chat.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
}

export enum MessageStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

@Entity('messages')
@Index(['chat', 'sentAt'])
@Index(['group', 'sentAt'])
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @Index()
  @ManyToOne(() => GroupEntity, { nullable: true })
  @JoinColumn()
  group?: GroupEntity;

  @ApiProperty()
  @Index()
  @ManyToOne(() => ChatEntity, { nullable: true })
  @JoinColumn()
  chat?: ChatEntity;

  @ApiProperty()
  @Column()
  type: MessageType;

  @ApiProperty()
  @Column({ type: 'varchar' })
  content: string;

  @ApiProperty()
  @Column({ default: MessageStatus.SENT })
  status: MessageStatus;

  @ApiProperty()
  @Index()
  @CreateDateColumn()
  sentAt: Date;
}
