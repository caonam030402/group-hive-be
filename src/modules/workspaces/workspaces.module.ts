import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { RelationalWorkspacesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [RelationalWorkspacesPersistenceModule, MailModule],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService, RelationalWorkspacesPersistenceModule],
})
export class WorkspacesModule {}
