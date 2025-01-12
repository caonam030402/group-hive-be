import { Module } from '@nestjs/common';
import { ChatController } from './controller/chat.controller';
import { RelationalChatPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ChatService } from './service/chat.service';
import { ChatGateway } from './chat.gateway';
import { ConnectedUserService } from './service/connected-user.service';
import { AuthModule } from '../auth/auth.module';
import { MessageService } from './service/messge.service';
import { ChatGatewayService } from './service/gateway.service';
import { MessageController } from './controller/message.controller';
import { WorkspacesModule } from '../workspaces/workspaces.module';

@Module({
  imports: [RelationalChatPersistenceModule, AuthModule, WorkspacesModule],
  controllers: [ChatController, MessageController],
  providers: [
    ChatService,
    ChatGateway,
    ConnectedUserService,
    MessageService,
    ChatGatewayService,
  ],
  exports: [ChatService, RelationalChatPersistenceModule],
})
export class chatModule {}
