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
import { SurgicalOrderModel } from '../models/surgicalOrder.model';
import { SurgicalOrderSchema } from '../schemas/surgicalOrder.schema';
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

  @Get(':id')
  public async get(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SurgicalOrderModel> {
    const surgicalOder = await this.model.findOne({
      where: { codigo: id },
      relations: ['room', 'procedure', 'hospital'],
    });

    if (!surgicalOder) {
      throw new NotFoundException(`surgicalOder not found with id -> ${id}`);
    }

    return surgicalOder;
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: SurgicalOrderSchema,
  ): Promise<SurgicalOrderModel> {
    const surgicalOrder = await this.model.findOne({ where: { codigo: id } });

    if (!surgicalOrder) {
      throw new NotFoundException(`surgicalOrder not found with id -> ${id}`);
    }

    await this.model.update({ codigo: id }, body);

    return await this.model.findOne({ where: { codigo: id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const surgicalOrder = await this.model.findOne({ where: { codigo: id } });

    if (!surgicalOrder) {
      throw new NotFoundException(`surgicalOrder not found with id -> ${id}`);
    }

    await this.model.delete(id);

    return `the surgicalOrder with this id -> ${id} was successfully deleted`;
  }
}
