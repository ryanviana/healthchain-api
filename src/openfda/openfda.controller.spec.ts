import { Test, TestingModule } from '@nestjs/testing';
import { OpenfdaController } from './openfda.controller';

describe('OpenfdaController', () => {
  let controller: OpenfdaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenfdaController],
    }).compile();

    controller = module.get<OpenfdaController>(OpenfdaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
