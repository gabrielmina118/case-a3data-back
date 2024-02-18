import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomController } from './room.controller';
import { RoomModel } from '../models/room.model';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomModel: Repository<RoomModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: getRepositoryToken(RoomModel),
          useClass: Repository,
        },
      ],
    }).compile();

    roomController = module.get<RoomController>(RoomController);
    roomModel = module.get<Repository<RoomModel>>(
      getRepositoryToken(RoomModel),
    );
  });

  it('Should be defined', () => {
    expect(RoomController).toBeDefined();
  });

  describe('create', () => {
    it('should create a room', async () => {
      const roomData = { numberRoom: 123 };
      const createdRoom = new RoomModel();
      jest.spyOn(roomModel, 'save').mockResolvedValue(createdRoom);

      const result = await roomController.create(roomData);

      expect(result).toEqual(createdRoom);
      expect(roomModel.save).toHaveBeenCalledWith(roomData);
    });
  });

  describe('read', () => {
    it('should return all rooms', async () => {
      const rooms = [new RoomModel(), new RoomModel()];
      jest.spyOn(roomModel, 'find').mockResolvedValue(rooms);

      const result = await roomController.getAll();

      expect(result).toEqual(rooms);
    });
  });

  describe('getById', () => {
    it('should return a room by id', async () => {
      const roomId = 1;
      const room = new RoomModel();
      jest.spyOn(roomModel, 'findOne').mockResolvedValue(room);

      const result = await roomController.getOne(roomId);

      expect(result).toEqual(room);
      expect(roomModel.findOne).toHaveBeenCalledWith({
        where: { id: roomId },
      });
    });
  });
});
