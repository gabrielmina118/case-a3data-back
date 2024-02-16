import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomModel } from './room.model';
import { HospitalModel } from './hospital.model';
import { ProcedureModel } from './procedure.model';

@Entity()
export class SurgicalOrderModel {
  @PrimaryGeneratedColumn()
  codigo: number;

  @ManyToOne(() => RoomModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  room: RoomModel;

  @ManyToOne(() => ProcedureModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'procedure_id', referencedColumnName: 'id' })
  procedure: ProcedureModel;

  @Column()
  doctor: string;

  @Column()
  patient: string;

  @ManyToOne(() => HospitalModel, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'hospital_id', referencedColumnName: 'id' })
  hospital: HospitalModel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  surgeryDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ length: 100 })
  generalObservations: string;
}
