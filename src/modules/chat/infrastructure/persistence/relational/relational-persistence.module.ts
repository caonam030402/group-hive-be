import { Module } from '@nestjs/common';
import { ChatRepository } from '../chat.repository';
import { ChatRelationalRepository } from './repositories/chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectedUserRepository } from '../connected.repository';
import { ConnectedUserRelationalRepository } from './repositories/connected-user.repository';
import { ConnectedUserEntity } from './entities/connected-user.entity';
import { ChatEntity, MessageEntity } from './entities';
import { MessageRepository } from '../message.repository';
import { MessageRelationalRepository } from './repositories/message.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChatEntity, ConnectedUserEntity, MessageEntity]),
  ],
  providers: [
    {
      provide: MessageRepository,
      useClass: MessageRelationalRepository,
    },
    {
      provide: ChatRepository,
      useClass: ChatRelationalRepository,
    },
    {
      provide: ConnectedUserRepository,
      useClass: ConnectedUserRelationalRepository,
    },
  ],
  exports: [ChatRepository, ConnectedUserRepository, MessageRepository],
})
export class RelationalChatPersistenceModule {}
