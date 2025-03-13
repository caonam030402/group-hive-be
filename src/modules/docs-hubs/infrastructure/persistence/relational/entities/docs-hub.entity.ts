import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { DocsType } from '../../../../enum/docs-type.enum';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { UserDocsHubEntity } from './user-docs-hub.entity';

@Entity({
  name: 'docs_hub',
})
export class DocsHubEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: DocsType })
  @Column({ enum: DocsType })
  docsType: DocsType;

  @ApiProperty({
    type: String,
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @Column({ type: 'bytea', nullable: true })
  content: Buffer;

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  author: UserEntity;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  lastOpenedAt: Date;

  @ApiProperty()
  @OneToMany(() => UserDocsHubEntity, (userDocsHub) => userDocsHub.docsHub)
  userDocsHub: UserDocsHubEntity;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
