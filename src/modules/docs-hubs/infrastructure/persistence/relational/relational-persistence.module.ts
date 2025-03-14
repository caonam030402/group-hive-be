import { Module } from '@nestjs/common';
import { DocsHubRepository } from '../docs-hub.repository';
import { DocsHubRelationalRepository } from './repositories/docs-hub.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsHubEntity } from './entities/docs-hub.entity';
import { PermissionDocsHubEntity } from './entities/permission-docs-hub.entity';
import { UserDocsHubEntity } from './entities/user-docs-hub.entity';
import { PinnedDocsHubEntity } from './entities/pinned-docs-hub.entity';
import { PinnedDocsHubRepository } from '../pinned-docs-hub.repository';
import { PinnedDocsHubRelationalRepository } from './repositories/pinned-docs-hub.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocsHubEntity,
      UserDocsHubEntity,
      PermissionDocsHubEntity,
      PinnedDocsHubEntity,
    ]),
  ],
  providers: [
    {
      provide: DocsHubRepository,
      useClass: DocsHubRelationalRepository,
    },
    {
      provide: PinnedDocsHubRepository,
      useClass: PinnedDocsHubRelationalRepository,
    },
  ],
  exports: [DocsHubRepository, PinnedDocsHubRepository],
})
export class RelationalDocsHubPersistenceModule {}
