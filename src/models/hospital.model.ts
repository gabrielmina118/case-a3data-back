import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurgicalOrder } from './surgicalOrder.model';

@Entity()
export class HospitalModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => SurgicalOrder, (surgicalOrder) => surgicalOrder.hospital) 
  surgicalOrders: SurgicalOrder[]; 
}
