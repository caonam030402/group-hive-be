import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';
import { EntityRelationalHelper } from '../../../../../../utils/relational-entity-helper';

@Entity({
  name: 'otp',
})
export class OtpEntity extends EntityRelationalHelper {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  code: number;

  @ApiProperty({
    type: () => UserEntity,
  })
  @JoinColumn()
  @OneToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @ApiProperty({ example: 60 })
  @Column()
  expiresTime: number; // in seconds

  @ApiProperty()
  @Column({ nullable: true })
  expiresAt: Date;

  @ApiProperty()
  @Column({ nullable: true })
  numberOfSubmissions: number;

  @ApiProperty()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
