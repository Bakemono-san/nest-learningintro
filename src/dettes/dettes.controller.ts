import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DettesService } from './dettes.service';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';

@Controller('dettes')
export class DettesController {
  constructor(private readonly dettesService: DettesService) {}

  @Post()
  create(@Body() createDetteDto: CreateDetteDto) {
    return this.dettesService.create(createDetteDto);
  }

  @Get()
  findAll() {
    return this.dettesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dettesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetteDto: UpdateDetteDto) {
    return this.dettesService.update(+id, updateDetteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dettesService.remove(+id);
  }
}
