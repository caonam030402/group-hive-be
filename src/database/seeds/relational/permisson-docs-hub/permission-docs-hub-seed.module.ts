import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionDocsHubSeedService } from './permission-docs-hub-seed.service';
import { PermissionDocsHubEntity } from '../../../../modules/docs-hubs/infrastructure/persistence/relational/entities/permission-docs-hub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionDocsHubEntity])],
  providers: [PermissionDocsHubSeedService],
  exports: [PermissionDocsHubSeedService],
})
export class PermissionDocsHubSeedModule {}
