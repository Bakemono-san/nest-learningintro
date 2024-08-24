import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  create(createUserDto: CreateUserDto) {
    try {
      this.users.push(createUserDto);
      return createUserDto;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User to update not found`);
    }

    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error(`User to remove not found`);
    }

    this.users = this.users.filter((u) => u.id !== id);

    return `user removed successfully , id: ${user.id}`;
  }
}
