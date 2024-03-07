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

export class CreateOrderDto {
  @IsDate()
  @IsOptional()
  date: Date;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  downpayment?: number;

  @IsArray({ message: 'Must be an array of items' })
  @ArrayMinSize(1, { message: 'Must have one or more items' })
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: Item[];

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  total: number;

  @IsObject()
  @IsNotEmptyObject()
  @Type(() => CustomerDto)
  customer: Customer;
}
