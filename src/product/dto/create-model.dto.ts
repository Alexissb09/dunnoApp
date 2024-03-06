import {  IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Variant } from '../interfaces/variant.interface';
import { VariantDto } from './variant.dto';
import { Type } from 'class-transformer';

export class CreateModelDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variant?: Variant
}
