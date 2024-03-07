import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Color } from 'src/interfaces/color.interface';
import { CreateModelDto } from 'src/product/dto/create-model.dto';
import { Model } from 'src/product/entities/model.entity';

export class ItemDto {
  @ApiProperty({
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  amount: number;

  @ApiProperty()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateModelDto)
  model: Model;

  @ApiProperty()
  @IsArray({ message: 'Must be an array of colors' })
  @ArrayMinSize(1, { message: 'Must have one or more colors' })
  colors: Color[];

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly subtotal: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  weight: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  extra?: string;
}
