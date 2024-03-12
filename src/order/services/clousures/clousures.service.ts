import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConstantsService } from 'src/common/constants/constant.service';
import { Order } from 'src/order/entities/order.entity';
import { DateClousureDto } from './date-clousure.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClousuresService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly constantService: ConstantsService,
  ) {}

  private readonly key: string = this.constantService.ORDER_KEY;

  async getClousureByDate(dateClosureDto: DateClousureDto) {
    const { from, until } = dateClosureDto;

    let orders: Order[] = await this.cacheManager.get(this.key);

    if (!orders) {
      orders = await this.orderRepository.find({
        where: {
          isActive: true,
        },
      });

      await this.cacheManager.set(this.key, orders);
    }

    const ordersByDate = orders.filter(
      (order) => order.date >= from && order.date <= until,
    );

    let totalProfit: number = 0;

    ordersByDate.map((order) => {
      totalProfit += order.profit + 1 // arreglar 
      console.log(totalProfit);
    });

    console.log(totalProfit);

    return ordersByDate;
  }
}
