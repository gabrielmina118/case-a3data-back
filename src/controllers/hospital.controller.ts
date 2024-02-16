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
import { HospitalModel } from 'src/models/hospital.model';
import { HospitalSchema } from 'src/schemas/hospital.schema';
import { Repository } from 'typeorm';

@Controller('/hospital')
export class HospitalController {
  constructor(
    @InjectRepository(HospitalModel) private model: Repository<HospitalModel>,
  ) {}

  @Post()
  public async create(@Body() body: HospitalSchema): Promise<HospitalModel> {
    return await this.model.save(body);
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<HospitalModel> {
    const hospital = await this.model.findOne({ where: { id } });

    if (!hospital) {
      throw new NotFoundException(`hospital not found with id -> ${id}`);
    }

    return hospital;
  }

  @Get()
  public async getAll(): Promise<HospitalModel[]> {
    return await this.model.find();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: HospitalModel,
  ): Promise<HospitalModel> {
    const hospital = await this.model.findOne({ where: { id } });

    if (!hospital) {
      throw new NotFoundException(`hospital not found with id -> ${id}`);
    }

    await this.model.update({ id }, body);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const hospital = await this.model.findOne({ where: { id } });

    if (!hospital) {
      throw new NotFoundException(`hospital not found with id -> ${id}`);
    }

    await this.model.delete(id);

    return `the hospital with this id -> ${id} was successfully deleted`;
  }
}
