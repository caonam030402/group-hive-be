import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/domain/user';
import { UserEntity } from '../../users/infrastructure/persistence/relational/entities/user.entity';

export class connectedUser {
  @ApiProperty({
    type: () => User,
  })
  user: UserEntity;

  @ApiProperty({
    type: String,
  })
  socketId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
