import { IsNotEmpty, IsInt } from 'class-validator';

export class RoomSchema {
  @IsNotEmpty()
  @IsInt()
  numberRoom: number;
}
