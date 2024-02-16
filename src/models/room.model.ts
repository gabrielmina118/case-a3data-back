import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoomModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  numberRoom: number;
}
