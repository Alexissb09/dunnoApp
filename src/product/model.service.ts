import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);
    try {
      await this.modelRepository.save(model);

      return {
        msg: 'Model created',
        model,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll() {
    const models = await this.modelRepository.find();

    return models;
  }

  async findOne(name: string) {
    const model = await this.modelRepository.findOneBy({
      name,
    });

    return model;
  }

  async update(name: string, updateModelDto: UpdateModelDto) {}

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
