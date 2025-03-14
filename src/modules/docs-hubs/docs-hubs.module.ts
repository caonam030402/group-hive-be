import { Module } from '@nestjs/common';
import { DocsHubsService } from './service/docs-hubs.service';
import { RelationalDocsHubPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocsHubGateway } from './docs-hubs.gateway';
import { AuthModule } from '../auth/auth.module';
import { DocsHubsController } from './controller/docs-hubs.controller';
import { PinnedDocsHubsController } from './controller/pinned-docs-hubs.controller';
import { PinnedDocsHubsService } from './service/pinned-docs-hubs.service';

@Module({
  imports: [RelationalDocsHubPersistenceModule, AuthModule],
  controllers: [DocsHubsController, PinnedDocsHubsController],
  providers: [DocsHubsService, PinnedDocsHubsService, DocsHubGateway],
  exports: [
    DocsHubsService,
    PinnedDocsHubsService,
    RelationalDocsHubPersistenceModule,
  ],
})
export class DocsHubsModule {}
