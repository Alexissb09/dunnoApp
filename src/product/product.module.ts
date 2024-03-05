import { Module } from '@nestjs/common';
import { ModelService } from './model.service';
import { ProductController } from './model.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';

@Module({
  controllers: [ProductController],
  providers: [ModelService],
  imports: [TypeOrmModule.forFeature([Model])],
})
export class ProductModule {}
