import { randomBytes } from 'crypto';

import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';
import { ApiProperty } from '@nestjs/swagger';
import { WorkspacesEntity } from './workspaces.entity';

@Entity({
  name: 'invite-workspaces',
})
export class InviteWorkspacesEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  inviteCode?: string;

  @ApiProperty()
  @Column({ nullable: true })
  link?: string;

  @ApiProperty()
  @Column({ type: 'timestamptz', nullable: true })
  expiredAt: Date | null;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ApiProperty()
  @OneToOne(() => WorkspacesEntity, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  workspace: WorkspacesEntity;

  @AfterLoad()
  public setDefault() {
    this.inviteCode = randomBytes(4).toString('hex').toUpperCase();
    const nameFormat = this.workspace.name.replace(/\s/g, '');
    this.link = `?name=${nameFormat}&inviteCode=${this.inviteCode}&id=${this.workspace.id}`;
  }
}
