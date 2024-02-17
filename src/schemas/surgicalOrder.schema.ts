import { IsString, MaxLength, IsOptional } from 'class-validator';

export class SurgicalOrderSchema {
  @IsString()
  @IsOptional()
  doctor: string;

  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  generalObservations: string;
}
