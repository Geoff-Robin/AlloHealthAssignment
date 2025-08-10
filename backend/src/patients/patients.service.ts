import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entity/patients.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient | null> {
    return await this.patientRepository.findOne({ where: { id } });
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientRepository.save(createPatientDto);
  }

  async update(id: number, updateData: Partial<Patient>): Promise<Patient | null> {
    const patient = await this.findOne(id);
    if (!patient) {
      return null;
    }
    const updatedPatient = { ...patient, ...updateData };
    await this.patientRepository.save(updatedPatient);
    return updatedPatient;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.patientRepository.delete(id);
    return result.affected !== 0;
  }
}
