import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurgicalOrderModel } from './surgicalOrder.model';

@Entity()
export class ProcedureModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  procedureName: string;

  @OneToMany(() => SurgicalOrderModel, (surgicalOrder) => surgicalOrder.room)
  surgicalOrders: SurgicalOrderModel[];
}
