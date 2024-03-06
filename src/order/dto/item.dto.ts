import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Color } from 'src/interfaces/color.interface';
import { Model } from 'src/product/entities/model.entity';

export class ItemDto {
  @IsInt()
  @Min(1)
  amount: number;

  @IsString()
  model: Model;

  @IsArray({ message: 'Must be an array of colors' })
  @ArrayMinSize(1, { message: 'Must have one or more colors' })
  colors: Color[];

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly subtotal: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  weight: number;

  @IsOptional()
  @IsString()
  extra: string;
}
