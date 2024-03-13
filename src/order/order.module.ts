import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { ClosuresController, OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ClosuresService } from './services/clousures/closures.service';
import { ConstantsService } from '../common/constants/constant.service';

@Module({
  controllers: [OrderController, ClosuresController],
  providers: [OrderService, ClosuresService, ConstantsService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule],
  exports: [OrderService],
})
export class OrderModule {}
