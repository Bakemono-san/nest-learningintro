import { Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.confirmationPassword) {
        return { error: 'Your passwords are not identical' };
      }

      createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);

      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);

      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User to update not found`);
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User to remove not found`);
    }

    await this.userRepository.delete(id);

    return `User removed successfully, id: ${user.id}`;
  }

  async login(
    userData: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (!user) {
      return { error: 'Invalid credentials' };
    }

    const correctPassword = await bcrypt.compare(
      userData.password,
      user.password,
    );

    if (!correctPassword) {
      return { error: 'Invalid credentials' };
    }

    const payload = { userId: user.id };
    const token = await this.jwtService.signAsync(payload);

    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // Uncomment in production
      path: '/',
    });

    return res.status(200).json({ token, user });
  }

  logout(@Res() res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      // secure: true, // Uncomment in production
      path: '/',
    });

    return res.status(200).json('Logged out');
  }
}
