import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomModel } from './room.model';
import { HospitalModel } from './hospital.model';

@Entity()
export class SurgicalOrder {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => RoomModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: RoomModel;

  @Column()
  doctor: string;

  @Column()
  patient: string;

  @ManyToOne(() => HospitalModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'id' })
  hospital: HospitalModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  surgeryDate: Date;

  @Column({ length: 100 })
  generalObservations: string;
}
