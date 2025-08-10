import { Injectable, Get} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entity/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>
    ) {}
    async findAll(): Promise<Doctor[]> {
        return await this.doctorRepository.find();
    }
    async findOne(id: number): Promise<Doctor | null> {
        return await this.doctorRepository.findOne({ where: { id } });
    }
    async create(doctor: CreateDoctorDto): Promise<Doctor> {
        return await this.doctorRepository.save(doctor);
    }
    async update(id: number, doctor: Doctor): Promise<Doctor | null> {
        const existingDoctor = await this.findOne(id);
        if (!existingDoctor) {
            return null;
        }
        const updatedDoctor = { ...existingDoctor, ...doctor };
        await this.doctorRepository.save(updatedDoctor);
        return updatedDoctor;
    }
    async delete(id: number): Promise<boolean> {
        const result = await this.doctorRepository.delete(id);
        return result.affected !== 0;
    }
}
