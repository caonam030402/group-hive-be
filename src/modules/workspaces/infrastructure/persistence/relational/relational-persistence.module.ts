import { Module } from '@nestjs/common';
import { WorkspacesRepository } from '../workspaces.repository';
import { WorkspacesRelationalRepository } from './repositories/workspaces.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspacesEntity } from './entities/workspaces.entity';
import { UserWorkspaceEntity } from './entities/user-workspace.entity';
import { InviteWorkspacesEntity } from './entities/invite-workspaces.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkspacesEntity,
      UserWorkspaceEntity,
      InviteWorkspacesEntity,
    ]),
  ],
  providers: [
    {
      provide: WorkspacesRepository,
      useClass: WorkspacesRelationalRepository,
    },
  ],
  exports: [WorkspacesRepository],
})
export class RelationalWorkspacesPersistenceModule {}
