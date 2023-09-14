import { Test, TestingModule } from '@nestjs/testing';
import { OpenfdaService } from './openfda.service';

describe('OpenfdaService', () => {
  let service: OpenfdaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenfdaService],
    }).compile();

    service = module.get<OpenfdaService>(OpenfdaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
