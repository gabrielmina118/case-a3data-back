import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcedureController } from 'src/controllers/procedure.controller';
import { ProcedureModel } from 'src/models/procedure.model';


@Module({
  imports: [TypeOrmModule.forFeature([ProcedureModel])],
  controllers: [ProcedureController],
})
export class ProcedureModule {}
