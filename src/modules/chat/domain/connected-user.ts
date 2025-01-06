import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class connectedUser {
  @ApiProperty({
    type: () => UserEntity,
  })
  user: UserEntity;

  @ApiProperty({
    type: String,
  })
  socketId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
