import { Test, TestingModule } from '@nestjs/testing';
import { HospitalController } from 'src/controllers/hospital.controller';

describe('HospitalController', () => {
  let hospitalcontroller: HospitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HospitalController],
    }).compile();

    hospitalcontroller = module.get<HospitalController>(HospitalController);
  });

  it('Should be defined', () => {
    expect(hospitalcontroller).toBeDefined();
  });
});
