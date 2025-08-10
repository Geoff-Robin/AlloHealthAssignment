import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './entity/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Doctor } from '../doctor/entity/doctor.entity';
import { Patient } from '../patients/entity/patients.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(Doctor)
    private readonly doctorRepo: Repository<Doctor>,
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepo.find({ relations: ['doctor', 'patient'] });
  }

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.doctorRepo.findOne({ where: { id: dto.doctorId } });
    if (!doctor) throw new NotFoundException(`Doctor with ID ${dto.doctorId} not found`);

    const patient = await this.patientRepo.findOne({ where: { id: dto.patientId } });
    if (!patient) throw new NotFoundException(`Patient with ID ${dto.patientId} not found`);

    const appointment = this.appointmentRepo.create({
      date: dto.date,
      time: dto.time,
      doctor,
      patient,
    });

    return await this.appointmentRepo.save(appointment);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.appointmentRepo.delete(id);
    return result.affected !== 0;
  }
}
