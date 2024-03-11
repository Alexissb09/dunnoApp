import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { ClosuresController, OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ClousuresService } from './services/clousures/clousures.service';
import { ConstantsService } from '../common/constants/constant.service';

@Module({
  controllers: [OrderController, ClosuresController],
  providers: [OrderService, ClousuresService, ConstantsService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule],
  exports: [OrderService],
})
export class OrderModule {}
