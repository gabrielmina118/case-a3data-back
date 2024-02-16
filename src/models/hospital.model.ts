import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HospitalModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;
}
