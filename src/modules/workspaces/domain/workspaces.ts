import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class Workspaces {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  industry: string;

  @ApiProperty({ type: String })
  size: string;

  @ApiProperty({ type: String })
  region: string;

  @ApiProperty({
    type: String || null,
  })
  avatar: string;

  @ApiProperty({
    type: String || null,
  })
  description: string;

  @ApiProperty({
    type: UserEntity,
  })
  owner: UserEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}