import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Status } from '../interfaces/status.interface';
import { Item } from '../interfaces/item.interface';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';
import { Customer } from '../interfaces/customer.interface';
import { CustomerDto } from './customer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    required: false,
  })
  @IsDate()
  @IsOptional()
  date: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  downpayment?: number;

  @ApiProperty({
    minimum: 1,
  })
  @IsArray({ message: 'Must be an array of items' })
  @ArrayMinSize(1, { message: 'Must have one or more items' })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: Item[];

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  total: number;

  @ApiProperty({
    type: CustomerDto,
  })
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => CustomerDto)
  customer: Customer;
}
