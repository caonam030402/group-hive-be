import {
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
@Index(['user'])
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
  @ManyToOne(() => ChatEntity, (user) => user.userChats)
  @JoinColumn()
  chat: ChatEntity;
}
