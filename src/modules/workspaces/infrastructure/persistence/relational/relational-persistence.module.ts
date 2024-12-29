import { Module } from '@nestjs/common';
import { WorkspacesRepository } from '../workspaces.repository';
import { WorkspacesRelationalRepository } from './repositories/workspaces.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesEntity } from './entities/workspaces.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspacesEntity])],
  providers: [
    {
      provide: WorkspacesRepository,
      useClass: WorkspacesRelationalRepository,
    },
  ],
  exports: [WorkspacesRepository],
})
export class RelationalWorkspacesPersistenceModule {}
