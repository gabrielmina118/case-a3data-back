import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SurgicalOrder } from './surgicalOrder.model';

@Entity()
export class RoomModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'number_room' }) 
  numberRoom: number;

  @OneToMany(() => SurgicalOrder, (surgicalOrder) => surgicalOrder.room) 
  surgicalOrders: SurgicalOrder[]; 
}
