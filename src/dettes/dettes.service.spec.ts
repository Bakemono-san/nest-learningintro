import { Test, TestingModule } from '@nestjs/testing';
import { DettesService } from './dettes.service';

describe('DettesService', () => {
  let service: DettesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DettesService],
    }).compile();

    service = module.get<DettesService>(DettesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
