import { IsOptional, IsString, Matches, Length, IsInt } from 'class-validator';

export class UpdateAppointmentDto {
  @IsOptional()
  @IsInt()
  doctorId?: number;

  @IsOptional()
  @IsInt()
  patientId?: number;

  @IsOptional()
  @IsString()
  @Length(10, 10)
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be YYYY-MM-DD' })
  date?: string;

  @IsOptional()
  @IsString()
  @Length(5, 5)
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'time must be HH:mm' })
  time?: string;
}
