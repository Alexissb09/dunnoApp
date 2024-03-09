import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { PaginationDto } from '../common/dto/pagination.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

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
      await this.orderRepository.save(order);

      return {
        msg: 'Order created',
        order,
      };
    } catch (err) {
      throw new BadRequestException(err.detail);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 15, offset = 0 } = paginationDto;

    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
    });

    return orders;
  }

  async findOne(term: string) {
    try {
      let order: Order;

      order = await this.orderRepository.findOneBy({ id: term });

      if (!order) throw new NotFoundException(`Order ${term} not found`);

      return order;
    } catch (err) {
      if ((err.code = '22P02')) {
        throw new NotFoundException(`Order ${term} not found`);
      }
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {}

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
