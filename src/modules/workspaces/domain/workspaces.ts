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
  avatar: string;

  @ApiProperty({
    type: String,
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
