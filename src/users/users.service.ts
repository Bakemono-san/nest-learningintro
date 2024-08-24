import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private jwtService: JwtService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password != createUserDto.confirmationPassword) {
        return { error: 'your password are not identical' };
      }

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
      createUserDto.confirmationPassword = null;

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

  async login(
    userData: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = this.users.find((user) => user.email === userData.email);

    if (!bcrypt.compareSync(user.password, userData.password)) {
      return { error: 'invallid credentials' };
    }

    const payload = { userId: user.id };
    const token = await this.jwtService.signAsync(payload);

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true,
      path: '/',
    });

    return res.status(200).json({ token, user });
  }

  logout(@Res() res: Response) {
    res.clearCookie('token', {
      // secure: true,
      httpOnly: true,
      path: '/',
    });

    res.status(200).json('logged out');
  }
}
