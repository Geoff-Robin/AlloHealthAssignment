import { IsString, IsNotEmpty, IsIn, Matches } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsIn(['male', 'female', 'other'])
  gender: string;

  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, { message: 'startTime must be in HH:mm format' })
  startTime: string;

  @IsString()
  @Matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/, { message: 'endTime must be in HH:mm format' })
  endTime: string;
}
