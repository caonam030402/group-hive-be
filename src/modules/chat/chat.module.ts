import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { RelationalChatPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ChatService } from './service/chat.service';
import { ChatGateway } from './chat.gateway';
import { ConnectedUserService } from './service/connected-user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RelationalChatPersistenceModule, AuthModule],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, ConnectedUserService],
  exports: [ChatService, RelationalChatPersistenceModule],
})
export class chatModule {}
