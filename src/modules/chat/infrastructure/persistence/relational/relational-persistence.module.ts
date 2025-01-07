import { Module } from '@nestjs/common';
import { chatRepository } from '../chat.repository';
import { chatRelationalRepository } from './repositories/chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { chatEntity } from './entities/chat.entity';
import { connectedUserRepository } from '../connected.repository';
import { ConnectedUserRelationalRepository } from './repositories/connected-user.repository';
import { connectedUserEntity } from './entities/connected-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([chatEntity, connectedUserEntity])],
  providers: [
    {
      provide: chatRepository,
      useClass: chatRelationalRepository,
    },
    {
      provide: connectedUserRepository,
      useClass: ConnectedUserRelationalRepository,
    },
  ],
  exports: [chatRepository, connectedUserRepository],
})
export class RelationalChatPersistenceModule {}
