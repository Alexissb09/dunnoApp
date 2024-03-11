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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

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
