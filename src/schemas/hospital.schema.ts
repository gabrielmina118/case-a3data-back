import { IsString, MaxLength } from 'class-validator';

export class HospitalSchema {
  @IsString()
  @MaxLength(255)
  name: string;
}
