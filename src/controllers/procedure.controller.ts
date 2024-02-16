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
import { ProcedureModel } from 'src/models/procedure.model';
import { ProcedureSchema } from 'src/schemas/procedure.schema';
import { Repository } from 'typeorm';

@Controller('/procedure')
export class ProcedureController {
  constructor(
    @InjectRepository(ProcedureModel) private model: Repository<ProcedureModel>,
  ) {}

  @Post()
  public async create(@Body() body: ProcedureSchema): Promise<ProcedureModel> {
    return await this.model.save(body);
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProcedureModel> {
    const procedure = await this.model.findOne({ where: { id } });

    if (!procedure) {
      throw new NotFoundException(`procedure not found with id -> ${id}`);
    }

    return procedure;
  }

  @Get()
  public async getAll(): Promise<ProcedureModel[]> {
    return await this.model.find();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProcedureModel,
  ): Promise<ProcedureModel> {
    const procedure = await this.model.findOne({ where: { id } });

    if (!procedure) {
      throw new NotFoundException(`procedure not found with id -> ${id}`);
    }

    await this.model.update({ id }, body);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const procedure = await this.model.findOne({ where: { id } });

    if (!procedure) {
      throw new NotFoundException(`Procedure not found with id -> ${id}`);
    }

    await this.model.delete(id);

    return `the Procedure with this id -> ${id} was successfully deleted`;
  }
}
