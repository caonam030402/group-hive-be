import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from './message.entity';
import { UserChatEntity } from './user-chat.entity';
import { ChatType } from '../../../../enum/chat.enum';
import { WorkspacesEntity } from '../../../../../workspaces/infrastructure/persistence/relational/entities/workspaces.entity';

@Entity('chats')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Index()
  @Column({ type: 'varchar', default: 'private_chat' })
  name: string;

  @ApiProperty()
  @OneToMany(() => UserChatEntity, (userChat) => userChat.chat, {
    cascade: true,
  })
  userChats?: UserChatEntity[];

  @ApiProperty()
  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @ApiProperty()
  @ManyToOne(() => WorkspacesEntity)
  @JoinColumn()
  workspace: WorkspacesEntity;

  @ApiProperty()
  @Column({ default: ChatType.PRIVATE })
  chatType: ChatType;

  @ApiProperty()
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
