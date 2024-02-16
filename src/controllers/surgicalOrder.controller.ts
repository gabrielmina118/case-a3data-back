import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SurgicalOrderModel } from 'src/models/surgicalOrder.model';
import { SurgicalOrderSchema } from 'src/schemas/surgicalOrder.schema';
import { Repository } from 'typeorm';

@Controller('/surgical-order')
export class SurgicalOrderController {
  constructor(
    @InjectRepository(SurgicalOrderModel)
    private model: Repository<SurgicalOrderModel>,
  ) {}

  @Post()
  public async create(
    @Body() body: SurgicalOrderSchema,
  ): Promise<SurgicalOrderModel> {
    return await this.model.save(body);
  }

  @Get()
  public async getAll(): Promise<SurgicalOrderModel[]> {
    return await this.model
      .createQueryBuilder('surgicalOrder')
      .leftJoinAndSelect('surgicalOrder.room', 'room')
      .leftJoinAndSelect('surgicalOrder.procedure', 'procedure') // Adicione se houver uma relação entre SurgicalOrder e Procedure
      .leftJoinAndSelect('surgicalOrder.hospital', 'hospital')
      .getMany();
  }
}
