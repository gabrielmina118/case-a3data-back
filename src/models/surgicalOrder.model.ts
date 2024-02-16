import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoomModel } from './room.model';
import { HospitalModel } from './hospital.model';

@Entity()
export class SurgicalOrder {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => RoomModel, (room) => room.surgicalOrders)
  room: RoomModel;

  @Column()
  doctor: string;

  @Column()
  patient: string;

  @ManyToOne(() => HospitalModel, (hospital) => hospital.surgicalOrders)
  hospital: HospitalModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  surgeryDate: Date;

  @Column({ length: 100 })
  generalObservations: string;
}
