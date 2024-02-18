import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcedureController } from './procedure.controller';
import { ProcedureModel } from '../models/procedure.model';

describe('ProcedureController', () => {
  let procedureController: ProcedureController;
  let procedureModel: Repository<ProcedureModel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedureController],
      providers: [
        {
          provide: getRepositoryToken(ProcedureModel),
          useClass: Repository,
        },
      ],
    }).compile();

    procedureController = module.get<ProcedureController>(ProcedureController);
    procedureModel = module.get<Repository<ProcedureModel>>(
      getRepositoryToken(ProcedureModel),
    );
  });

  it('Should be defined', () => {
    expect(procedureController).toBeDefined();
  });

  describe('create', () => {
    it('should create a procedure', async () => {
      const procedureData = { procedureName: 'Test procedure' };
      const createdprocedure = new ProcedureModel();
      jest.spyOn(procedureModel, 'save').mockResolvedValue(createdprocedure);

      const result = await procedureController.create(procedureData);

      expect(result).toEqual(createdprocedure);
      expect(procedureModel.save).toHaveBeenCalledWith(procedureData);
    });
  });

  describe('read', () => {
    it('should return all procedures', async () => {
      const procedures = [new ProcedureModel(), new ProcedureModel()];
      jest.spyOn(procedureModel, 'find').mockResolvedValue(procedures);

      const result = await procedureController.getAll();

      expect(result).toEqual(procedures);
    });
  });

  describe('getById', () => {
    it('should return a procedure by id', async () => {
      const procedureId = 1;
      const procedure = new ProcedureModel();
      jest.spyOn(procedureModel, 'findOne').mockResolvedValue(procedure);

      const result = await procedureController.getOne(procedureId);

      expect(result).toEqual(procedure);
      expect(procedureModel.findOne).toHaveBeenCalledWith({
        where: { id: procedureId },
      });
    });
  });
});
