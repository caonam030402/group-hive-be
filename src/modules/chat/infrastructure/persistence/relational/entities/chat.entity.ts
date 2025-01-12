import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
  @OneToMany(() => MessageEntity, (message) => message.chat)
  messages: MessageEntity[];

  @ApiProperty()
  @OneToMany(() => UserChatEntity, (userChat) => userChat.chat, {
    cascade: true,
  })
  userChats: UserChatEntity[];

  @ApiProperty()
  @ManyToOne(() => WorkspacesEntity)
  workspace: WorkspacesEntity;

  @ApiProperty({
    enum: ChatType,
  })
  @Column()
  chatType: ChatType;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
