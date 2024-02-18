import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurgicalOrderController } from './surgicalOrder.controller';
import { SurgicalOrderModel } from '../models/surgicalOrder.model';
import { RoomModel } from '../models/room.model';
import { ProcedureModel } from '../models/procedure.model';
import { HospitalModel } from '../models/hospital.model';

describe('SurgicalOrderController', () => {
  let surgicalOrderController: SurgicalOrderController;
  let surgicalOrderModel: Repository<SurgicalOrderModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurgicalOrderController],
      providers: [
        {
          provide: getRepositoryToken(SurgicalOrderModel),
          useClass: Repository,
        },
      ],
    }).compile();

    surgicalOrderController = module.get<SurgicalOrderController>(
      SurgicalOrderController,
    );
    surgicalOrderModel = module.get<Repository<SurgicalOrderModel>>(
      getRepositoryToken(SurgicalOrderModel),
    );
  });

  it('Should be defined', () => {
    expect(SurgicalOrderController).toBeDefined();
  });

  describe('create', () => {
    it('should create a surgicalOrder', async () => {
      const surgicalOrderData = {
        room: new RoomModel(),
        procedure: new ProcedureModel(),
        doctor: 'Dr. stuart',
        patient: 'Jose da Silva',
        hospital: new HospitalModel(),
        surgeryDate: new Date(),
        generalObservations: 'Observações gerais sobre a ordem cirúrgica',
      };

      const createdSurgicalOrder = new SurgicalOrderModel();
      jest
        .spyOn(surgicalOrderModel, 'save')
        .mockResolvedValue(createdSurgicalOrder);

      const result = await surgicalOrderController.create(surgicalOrderData);

      expect(result).toEqual(createdSurgicalOrder);
      expect(surgicalOrderModel.save).toHaveBeenCalledWith(surgicalOrderData);
    });
  });

  describe('getById', () => {
    it('should return a surgicalOrder by id', async () => {
      const surgicalOrderId = 1;
      const surgicalOrder = new SurgicalOrderModel();
      jest
        .spyOn(surgicalOrderModel, 'findOne')
        .mockResolvedValue(surgicalOrder);

      const result = await surgicalOrderController.get(surgicalOrderId);

      expect(result).toEqual(surgicalOrder);
    });
  });
});
