import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  Patch,
  ParseUUIDPipe,
  Delete,
  Header,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { OrderService } from './order.service';
import { ClosuresService } from './services/clousures/closures.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ClosureDto } from './services/clousures/closure.dto';

@ApiTags('Orders')
@UseGuards(AuthGuard())
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.orderService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.orderService.findOne(term);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.orderService.remove(id);
  }
}

@ApiTags('Closures')
@UseGuards(AuthGuard())
@Controller('closures')
export class ClosuresController {
  constructor(private readonly closureService: ClosuresService) {}

  @Get()
  findOrdersByDate(@Body() closureDto: ClosureDto) {
    return this.closureService.getClousureByDate(closureDto);
  }
}
