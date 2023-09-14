import { Test, TestingModule } from '@nestjs/testing';
import { IcdService } from './icd.service';

describe('IcdService', () => {
  let service: IcdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IcdService],
    }).compile();

    service = module.get<IcdService>(IcdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
