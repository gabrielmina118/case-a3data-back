import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurgicalOrderModel } from './surgicalOrder.model';

@Entity()
export class HospitalModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @OneToMany(
    () => SurgicalOrderModel,
    (surgicalOrder) => surgicalOrder.hospital,
  )
  surgicalOrders: SurgicalOrderModel[];
}
