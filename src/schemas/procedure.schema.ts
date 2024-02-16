import { IsString, MaxLength } from 'class-validator';

export class ProcedureSchema {
  @IsString()
  @MaxLength(255)
  procedureName: string;
}
