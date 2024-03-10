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

    // Para saber la cadena de conexion
    private readonly dataSource: DataSource,
  ) {}

  private key: string = 'order';

  // Buscamos en bd y asignamos en cache los pedidos
  private async updateCache(limit?: number, offset?: number) {
    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
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
      date: new Date(),
      total,
    });

    try {
      // Guardamos la data y agregamos el pedido a la cache

      await this.orderRepository.save(order);

      const orderprueba: Order[] = await this.cacheManager.get(this.key);
      orderprueba.push(order);

      await this.cacheManager.set(this.key, orderprueba);

      return {
        msg: 'Order created',
        order,
      };
    } catch (err) {
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
    try {
      let order: Order;

      const orders: Order[] = await this.cacheManager.get(this.key);

      // Busca en bd si no hay nada en cache
      if (!orders) {
        order = await this.orderRepository.findOneBy({ id: term });
        return order;
      }

      // Busca en cache
      order = orders.find((order) => order.id === term);

      if (!order) throw new NotFoundException(`Order ${term} not found`);

      return order;
    } catch (err) {
      if ((err.code = '22P02')) {
        throw new NotFoundException(`Order ${term} not found`);
      }
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
