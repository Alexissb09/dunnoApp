import { IsNumber } from 'class-validator';

export class PriceDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;
}
