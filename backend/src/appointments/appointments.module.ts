import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  imports: [DoctorModule, PatientsModule]
})
export class AppointmentsModule {}
