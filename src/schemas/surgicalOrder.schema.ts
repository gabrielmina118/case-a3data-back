import { IsString, MaxLength } from 'class-validator';

export class SurgicalOrderSchema {
  @IsString()
  doctor: string;

  @IsString()
  patient: string;

  @IsString()
  @MaxLength(100)
  generalObservations: string;
}
