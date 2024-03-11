import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Cache } from 'cache-manager';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private key: string = 'order';

  // Buscamos en bd y asignamos en cache los pedidos
  private async updateCache(limit?: number, offset?: number) {
    await this.cacheManager.reset();

    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
      where: {
        isActive: true,
      },
    });

    await this.cacheManager.set(this.key, orders, 0);

    return orders;
  }

  async create(createOrderDto: CreateOrderDto) {
    let total: number = 0;

    for (const item of createOrderDto.items) {
      item.subtotal = item.amount * item.price;

      total += item.subtotal;
    }

    const order = this.orderRepository.create({
      ...createOrderDto,
      date: new Date().toLocaleString('es-AR'),
      total,
    });

    try {
      // Guardamos la data y agregamos el pedido a la cache

      await this.orderRepository.save(order);

      await this.updateCache();

      let orders: Order[] = await this.cacheManager.get(this.key);

      await this.cacheManager.set(this.key, orders);

      return {
        msg: 'Order created',
        order,
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.detail);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit, offset = 0 } = paginationDto;

    const orders = await this.cacheManager.get(this.key);

    if (!orders) {
      const orders = await this.updateCache(limit, offset);
      return orders;
    }

    return orders;
  }

  async findOne(term: string) {
    let order: Order;

    const orders: Order[] = await this.cacheManager.get(this.key);

    // Busca en bd si no hay nada en cache
    if (!orders) {
      order = await this.orderRepository.findOneBy({
        id: term,
        isActive: true,
      });
    } else {
      // Busca en cache
      order = orders.find(
        (order) => order.id === term && order.isActive === true,
      );
    }

    if (!order) throw new NotFoundException(`Order ${term} not found`);

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    Object.assign(order, updateOrderDto);

    // Por si se hace el gracioso
    order.isActive = true;

    await this.orderRepository.save(order);
    await this.updateCache();

    return {
      msg: 'Order updated',
      order,
    };
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    order.isActive = false;

    await this.orderRepository.save(order);
    await this.updateCache();

    return {
      msg: 'Order deleted',
      order,
    };
  }
}
