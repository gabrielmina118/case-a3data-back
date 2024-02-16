import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurgicalOrderController } from 'src/controllers/surgicalOrder.controller';
import { SurgicalOrderModel } from 'src/models/surgicalOrder.model';

@Module({
  imports: [TypeOrmModule.forFeature([SurgicalOrderModel])],
  controllers: [SurgicalOrderController],
})
export class SurgicalOrderModule {}
