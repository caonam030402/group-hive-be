import { Module } from '@nestjs/common';
import { DocsHubRepository } from '../docs-hub.repository';
import { DocsHubRelationalRepository } from './repositories/docs-hub.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocsHubEntity } from './entities/docs-hub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocsHubEntity])],
  providers: [
    {
      provide: DocsHubRepository,
      useClass: DocsHubRelationalRepository,
    },
  ],
  exports: [DocsHubRepository],
})
export class RelationalDocsHubPersistenceModule {}
