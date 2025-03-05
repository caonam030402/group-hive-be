import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { DocsType } from '../../../../enum/docs-type.enum';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

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

  @ApiProperty()
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  author: UserEntity;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  lastOpenedAt: Date;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
