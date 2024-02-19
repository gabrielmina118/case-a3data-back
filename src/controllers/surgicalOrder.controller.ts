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

interface ISurgicalOrder {
  id: number;
  doctor: string;
  patient: string;
  surgeryDate: Date;
  createdAt: Date;
  generalObservations: string;
  room: number;
  procedure: string;
  hospital: string;
}

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
  public async getAll(): Promise<ISurgicalOrder[]> {
    const surgicalOrders = await this.model
      .createQueryBuilder('surgicalOrder')
      .leftJoinAndSelect('surgicalOrder.room', 'room')
      .leftJoinAndSelect('surgicalOrder.procedure', 'procedure') // Adicione se houver uma relação entre SurgicalOrder e Procedure
      .leftJoinAndSelect('surgicalOrder.hospital', 'hospital')
      .getMany();

    return surgicalOrders.map((order) => ({
      id: order.id,
      doctor: order.doctor,
      patient: order.patient,
      surgeryDate: order.surgeryDate,
      createdAt: order.createdAt,
      generalObservations: order.generalObservations,
      room: order.room.numberRoom,
      procedure: order.procedure.procedureName,
      hospital: order.hospital.name,
    }));
  }

  @Get(':id')
  public async get(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SurgicalOrderModel> {
    const surgicalOder = await this.model.findOne({
      where: { id },
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
    console.log('body', body);
    const surgicalOrder = await this.model
      .createQueryBuilder('surgicalOrder')
      .leftJoinAndSelect('surgicalOrder.room', 'room')
      .leftJoinAndSelect('surgicalOrder.procedure', 'procedure')
      .leftJoinAndSelect('surgicalOrder.hospital', 'hospital')
      .where('surgicalOrder.id = :id', { id }) // Condição de pesquisa
      .getOne();
    console.log('surgicalOrder', surgicalOrder);
    if (!surgicalOrder) {
      throw new NotFoundException(`surgicalOrder not found with id -> ${id}`);
    }

    const mappedResult: Partial<SurgicalOrderModel> = {
      id: surgicalOrder.id,
      doctor: surgicalOrder.doctor,
      patient: surgicalOrder.patient,
      surgeryDate: surgicalOrder.surgeryDate,
      createdAt: surgicalOrder.createdAt,
      generalObservations: surgicalOrder.generalObservations,
      room: surgicalOrder.room,
      procedure: surgicalOrder.procedure,
      hospital: surgicalOrder.hospital,
    };

    await this.model.update({ id }, mappedResult);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const surgicalOrder = await this.model.findOne({ where: { id } });

    if (!surgicalOrder) {
      throw new NotFoundException(`surgicalOrder not found with id -> ${id}`);
    }

    await this.model.delete(id);

    return `the surgicalOrder with this id -> ${id} was successfully deleted`;
  }
}
