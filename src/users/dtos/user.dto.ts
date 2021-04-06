import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

export class UserDTO {

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty({ required: false })
  isActive?: boolean;

  static from(userEntity: User): UserDTO {
    let user = new UserDTO();

    user.firstName = userEntity.firstName;
    user.lastName = userEntity.lastName;
    user.isActive = userEntity.isActive;

    return user;
  }

  static fromAttributes(firstName: string, lastName: string, isActive: boolean): UserDTO {
    let user = new UserDTO();

    user.firstName = firstName;
    user.lastName = lastName;
    user.isActive = isActive;

    return user;
  }

}