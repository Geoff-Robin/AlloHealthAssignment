import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>, private readonly jwtService: JwtService) { }
  private readonly saltOrRounds = 10;
  async create(createUserDto: CreateUserDto) {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    const hashed = await bcrypt.hash(createUserDto.password, salt);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashed,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async getRefreshToken(userId: number): Promise<string | null> {
    const user = await this.usersRepository.findOne({ where: { id: BigInt(userId) } });
    return user?.refreshToken ?? null;
  }

  async findOne(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id: BigInt(id) } });
    return user ?? undefined;
  }

  async removeRefreshToken(userId: number) {
    await this.usersRepository.update(userId, { refreshToken: null });
  }
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }
  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id: BigInt(id) } });
    return user ?? undefined;
  }
  async updateRefreshToken(id: number, refreshToken: string): Promise<undefined> {
    await this.usersRepository.update(id, { refreshToken });
    return undefined;
  }

  async findId(accessToken: string): Promise<User | undefined> {
    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET || 'access-secret',
    });
    const user = await this.usersRepository.findOne({ where: { id: BigInt(payload.sub) } });
    return user ?? undefined;
  }
}
