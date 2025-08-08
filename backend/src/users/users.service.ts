import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id: BigInt(id) } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto).then(() => {
      return this.usersRepository.findOne({ where: { id: BigInt(id) } });
    });
  }

  async removeRefreshToken(userId: number) {
    
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }
  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id: BigInt(id) } });
    return user ?? undefined;
  }
  async updateRefreshToken(id: string, refreshToken: string): Promise<undefined> {
    await this.usersRepository.update(id, { refreshToken });
    return undefined;
  }
}
