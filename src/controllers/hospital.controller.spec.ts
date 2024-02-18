import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HospitalController } from './hospital.controller';
import { HospitalModel } from '../models/hospital.model';
describe('HospitalController', () => {
  let hospitalController: HospitalController;
  let hospitalModel: Repository<HospitalModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalController],
      providers: [
        {
          provide: getRepositoryToken(HospitalModel),
          useClass: Repository,
        },
      ],
    }).compile();

    hospitalController = module.get<HospitalController>(HospitalController);
    hospitalModel = module.get<Repository<HospitalModel>>(
      getRepositoryToken(HospitalModel),
    );
  });

  it('Should be defined', () => {
    expect(hospitalController).toBeDefined();
  });

  describe('create', () => {
    it('should create a hospital', async () => {
      const hospitalData = { name: 'Test Hospital' };
      const createdHospital = new HospitalModel();
      jest.spyOn(hospitalModel, 'save').mockResolvedValue(createdHospital);

      const result = await hospitalController.create(hospitalData);

      expect(result).toEqual(createdHospital);
      expect(hospitalModel.save).toHaveBeenCalledWith(hospitalData);
    });
  });

  describe('read', () => {
    it('should return all hospitals', async () => {
      const hospitals = [new HospitalModel(), new HospitalModel()];
      jest.spyOn(hospitalModel, 'find').mockResolvedValue(hospitals);

      const result = await hospitalController.getAll();

      expect(result).toEqual(hospitals);
    });
  });

  describe('getById', () => {
    it('should return a hospital by id', async () => {
      const hospitalId = 1;
      const hospital = new HospitalModel();
      jest.spyOn(hospitalModel, 'findOne').mockResolvedValue(hospital);

      const result = await hospitalController.getOne(hospitalId);

      expect(result).toEqual(hospital);
      expect(hospitalModel.findOne).toHaveBeenCalledWith({
        where: { id: hospitalId },
      });
    });
  });
});
