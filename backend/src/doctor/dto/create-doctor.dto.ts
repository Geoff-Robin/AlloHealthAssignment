import { IsString } from "class-validator";


export class CreateDoctorDto {
  @IsString()
  name: string;

  @IsString()
  specialization: string;

  @IsString()
  gender: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

}
