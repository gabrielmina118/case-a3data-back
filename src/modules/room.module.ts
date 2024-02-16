import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from 'src/controllers/room.controller';
import { RoomModel } from 'src/models/room.model';

@Module({
  imports: [TypeOrmModule.forFeature([RoomModel])],
  controllers: [RoomController],
})
export class RoomModule {}
