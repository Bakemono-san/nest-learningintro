import { Test, TestingModule } from '@nestjs/testing';
import { DettesController } from './dettes.controller';
import { DettesService } from './dettes.service';

describe('DettesController', () => {
  let controller: DettesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DettesController],
      providers: [DettesService],
    }).compile();

    controller = module.get<DettesController>(DettesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
