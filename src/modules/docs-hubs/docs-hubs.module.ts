import { Module } from '@nestjs/common';
import { DocsHubsService } from './docs-hubs.service';
import { DocsHubsController } from './docs-hubs.controller';
import { RelationalDocsHubPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { DocsHubGateway } from './docs-hubs.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [RelationalDocsHubPersistenceModule, AuthModule],
  controllers: [DocsHubsController],
  providers: [DocsHubsService, DocsHubGateway],
  exports: [DocsHubsService, RelationalDocsHubPersistenceModule],
})
export class DocsHubsModule {}
