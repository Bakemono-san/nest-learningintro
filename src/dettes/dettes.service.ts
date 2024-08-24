import { Injectable } from '@nestjs/common';
import { CreateDetteDto } from './dto/create-dette.dto';
import { UpdateDetteDto } from './dto/update-dette.dto';

@Injectable()
export class DettesService {
  create(createDetteDto: CreateDetteDto) {
    return 'This action adds a new dette';
  }

  findAll() {
    return `This action returns all dettes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dette`;
  }

  update(id: number, updateDetteDto: UpdateDetteDto) {
    return `This action updates a #${id} dette`;
  }

  remove(id: number) {
    return `This action removes a #${id} dette`;
  }
}
