import { Module } from '@nestjs/common';
import { chatController } from './chat.controller';
import { RelationalChatPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { chatService } from './service/chat.service';

@Module({
  imports: [RelationalChatPersistenceModule],
  controllers: [chatController],
  providers: [chatService],
  exports: [chatService, RelationalChatPersistenceModule],
})
export class chatModule {}
