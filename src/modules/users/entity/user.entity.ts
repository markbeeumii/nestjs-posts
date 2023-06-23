import { users } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements users {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string 

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
  
  @ApiProperty()
  gender: string;

  @ApiProperty()
  profile_picture : string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

