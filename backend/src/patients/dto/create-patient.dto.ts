import { IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  gender: string;

  @IsString()
  dateOfBirth: string;
}
