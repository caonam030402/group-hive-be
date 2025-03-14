import { ApiProperty } from '@nestjs/swagger';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { DocsHubEntity } from './docs-hub.entity';

@Entity({
  name: 'pinned_docs_hub',
})
export class PinnedDocsHubEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => DocsHubEntity)
  docsHub: DocsHubEntity;
}
