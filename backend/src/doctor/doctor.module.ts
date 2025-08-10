import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Doctor } from './entity/doctor.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), JwtModule.register({
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: '15m' },
  }),
  JwtModule.register({
    secret: process.env.JWT_REFRESH_SECRET,
    signOptions: { expiresIn: '7d' },
  })],
  providers: [DoctorService,JwtStrategy],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule { }
