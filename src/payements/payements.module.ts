import { Module } from '@nestjs/common';
import { PayementsService } from './payements.service';
import { PayementsController } from './payements.controller';

@Module({
  controllers: [PayementsController],
  providers: [PayementsService],
})
export class PayementsModule {}
