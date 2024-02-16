import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurgicalOrderModel } from './surgicalOrder.model';

@Entity()
export class RoomModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'number_room' })
  numberRoom: number;

  @OneToMany(() => SurgicalOrderModel, (surgicalOrder) => surgicalOrder.room)
  surgicalOrders: SurgicalOrderModel[];
}
