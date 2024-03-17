import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { parseISO, isAfter, isBefore } from 'date-fns';

import { ConstantsService } from 'src/common/constants/constant.service';
import { Order } from 'src/order/entities/order.entity';
import { ClosureDto } from './closure.dto';

@Injectable()
export class ClosuresService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly constantService: ConstantsService,
  ) {}

  private readonly key: string = this.constantService.ORDER_KEY;

  async getClousureByDate(closureDto: ClosureDto) {
    const { from, until } = closureDto;

    let orders: Order[] = await this.cacheManager.get(this.key);

    if (!orders) {
      orders = await this.orderRepository.find({
        where: {
          isActive: true,
        },
      });

      await this.cacheManager.set(this.key, orders);
    }

    const ordersByDate = orders.filter((order) => {
      return (
        isAfter(order.date.toISOString(), from) &&
        isBefore(order.date.toISOString(), until)
      );
    });

    let totalProfit: number = 0;

    ordersByDate.map((order) => {
      totalProfit += order.profit;
    });

    return {
      dateProfit: `from ${from} until ${until}`,
      profit: totalProfit,
      ordersByDate,
    };
  }
}
