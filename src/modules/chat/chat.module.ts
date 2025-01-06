import { Module } from '@nestjs/common';
import { chatController } from './chat.controller';
import { RelationalChatPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { chatService } from './service/chat.service';
import { ChatGateway } from './chat.gateway';
import { ConnectedUserService } from './service/connected-user.service';

@Module({
  imports: [RelationalChatPersistenceModule],
  controllers: [chatController],
  providers: [chatService, ChatGateway, ConnectedUserService],
  exports: [chatService, RelationalChatPersistenceModule],
})
export class chatModule {}
