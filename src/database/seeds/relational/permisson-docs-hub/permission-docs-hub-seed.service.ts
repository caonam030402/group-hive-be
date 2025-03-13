import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionDocsHubEntity } from '../../../../modules/docs-hubs/infrastructure/persistence/relational/entities/permission-docs-hub.entity';
import { PermissionDocsHubEnum } from '../../../../modules/docs-hubs/enum/permission-docs';

@Injectable()
export class PermissionDocsHubSeedService {
  constructor(
    @InjectRepository(PermissionDocsHubEntity)
    private repository: Repository<PermissionDocsHubEntity>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      const permissions = Object.values(PermissionDocsHubEnum).map(
        (type: number) => this.repository.create({ type: type }),
      );

      await this.repository.save(permissions);
    }
  }
}
