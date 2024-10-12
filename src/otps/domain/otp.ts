import { ApiProperty } from '@nestjs/swagger';
import { OneToOne } from 'typeorm';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class Otp {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  code: number;

  @ApiProperty({
    type: () => UserEntity,
  })
  @OneToOne(() => UserEntity, {
    eager: true,
  })
  user: UserEntity;

  @ApiProperty({ example: 60 })
  expiresTime: number; // in seconds

  @ApiProperty()
  expiresAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
