import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entity/appointment.entity';
import { AppointmentService } from './appointments.service';
import { AppointmentController } from './appointments.controller';
import { DoctorService } from 'src/doctor/doctor.service'; 
import { PatientService } from 'src/patients/patients.service';
import { Doctor } from 'src/doctor/entity/doctor.entity';
import { Patient } from 'src/patients/entity/patients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment,Doctor,Patient])],
  providers: [AppointmentService, DoctorService, PatientService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
