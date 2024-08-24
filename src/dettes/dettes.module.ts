import { Module } from '@nestjs/common';
import { DettesService } from './dettes.service';
import { DettesController } from './dettes.controller';

@Module({
  controllers: [DettesController],
  providers: [DettesService],
})
export class DettesModule {}
