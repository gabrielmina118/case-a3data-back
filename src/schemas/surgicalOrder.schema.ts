import { IsNotEmpty, IsString, IsDate, MaxLength } from 'class-validator';

export class SurgicalOrderSchema {
  @IsNotEmpty()
  @IsString()
  doctor: string;

  @IsNotEmpty()
  @IsString()
  patient: string;

  @IsNotEmpty()
  @IsDate()
  surgeryDate: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  generalObservations: string;
}
