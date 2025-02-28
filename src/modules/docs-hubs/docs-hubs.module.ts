import { Module } from '@nestjs/common';
import { DocsHubsService } from './docs-hubs.service';
import { DocsHubsController } from './docs-hubs.controller';
import { RelationalDocsHubPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalDocsHubPersistenceModule],
  controllers: [DocsHubsController],
  providers: [DocsHubsService],
  exports: [DocsHubsService, RelationalDocsHubPersistenceModule],
})
export class DocsHubsModule {}
