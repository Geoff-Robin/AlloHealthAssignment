import { IsString, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  date: string;

  @IsString()
  time: string;

  @IsNumber()
  doctorId: number;

  @IsNumber()
  patientId: number;
}
