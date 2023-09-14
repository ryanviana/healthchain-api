import { Test, TestingModule } from '@nestjs/testing';
import { IcdController } from './icd.controller';

describe('IcdController', () => {
  let controller: IcdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcdController],
    }).compile();

    controller = module.get<IcdController>(IcdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
