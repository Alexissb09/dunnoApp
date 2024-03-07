import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

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
    const { limit = 5, offset = 0 } = paginationDto;

    const orders = await this.orderRepository.find({
      take: limit,
      skip: offset,
    });

    return orders;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
