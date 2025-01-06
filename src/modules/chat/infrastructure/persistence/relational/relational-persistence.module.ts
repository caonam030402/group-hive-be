import { Module } from '@nestjs/common';
import { chatRepository } from '../chat.repository';
import { chatRelationalRepository } from './repositories/chat.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { chatEntity } from './entities/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([chatEntity])],
  providers: [
    {
      provide: chatRepository,
      useClass: chatRelationalRepository,
    },
  ],
  exports: [chatRepository],
})
export class RelationalChatPersistenceModule {}
