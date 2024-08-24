import { Test, TestingModule } from '@nestjs/testing';
import { PayementsController } from './payements.controller';
import { PayementsService } from './payements.service';

describe('PayementsController', () => {
  let controller: PayementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayementsController],
      providers: [PayementsService],
    }).compile();

    controller = module.get<PayementsController>(PayementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
