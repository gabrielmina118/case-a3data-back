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
import { RoomModel } from 'src/models/room.model';
import { RoomSchema } from 'src/schemas/room.schema';
import { Repository } from 'typeorm';

@Controller('/room')
export class RoomController {
  constructor(
    @InjectRepository(RoomModel) private model: Repository<RoomModel>,
  ) {}

  @Post()
  public async create(@Body() body: RoomSchema): Promise<RoomModel> {
    return await this.model.save(body);
  }

  @Get(':id')
  public async getOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RoomModel> {
    const room = await this.model.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException(`Room not found with id -> ${id}`);
    }

    return room;
  }

  @Get()
  public async getAll(): Promise<RoomModel[]> {
    return await this.model.find();
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: RoomSchema,
  ): Promise<RoomModel> {
    const room = await this.model.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException(`Room not found with id -> ${id}`);
    }

    await this.model.update({ id }, body);

    return await this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const room = await this.model.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException(`Room not found with id -> ${id}`);
    }

    await this.model.delete(id);

    return `the person with this id -> ${id} was successfully deleted`;
  }
}
