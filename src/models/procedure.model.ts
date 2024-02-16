import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProcedureModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  procedureName: string;
}
