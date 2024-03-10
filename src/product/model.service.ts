import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private key: string = 'model';

  // Buscamos en bd y asignamos en cache los pedidos
  private async updateCache() {
    const models = await this.modelRepository.find();

    await this.cacheManager.set(this.key, models, 0);

    return models;
  }

  async create(createModelDto: CreateModelDto) {
    const model = this.modelRepository.create(createModelDto);
    try {
      await this.modelRepository.save(model);

      this.updateCache();

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
    const models = await this.cacheManager.get(this.key);

    if (!models) {
      const models = await this.modelRepository.find();

      return models;
    }

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
