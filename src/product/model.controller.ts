import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { ModelService } from './model.service';
import { CreateModelDto } from './dto/create-model.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Models')
@UseGuards(AuthGuard())
@Controller('models')
export class ProductController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() createModelDto: CreateModelDto) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  findAll() {
    return this.modelService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.modelService.findOne(name);
  }
}
