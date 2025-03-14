import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { DocsHubEntity } from './docs-hub.entity';

@Entity({
  name: 'pinned_docs_hub',
})
@Unique(['user', 'docsHub'])
export class PinnedDocsHubEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @ApiProperty()
  @ManyToOne(() => DocsHubEntity, {
    eager: true,
  })
  @JoinColumn()
  docsHub: DocsHubEntity;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
