import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalController } from 'src/controllers/hospital.controller';
import { HospitalModel } from 'src/models/hospital.model';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalModel])],
  controllers: [HospitalController],
})
export class HospitalModule {}
