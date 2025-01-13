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
import { ChatEntity } from './chat.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MessageStatus, MessageType } from '../../../../enum/message.enum';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
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
  @CreateDateColumn({ type: 'timestamptz' })
  sentAt: Date;
}
