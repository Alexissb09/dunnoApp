import {
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Variant } from '../interfaces/variant.interface';
import { VariantDto } from './variant.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModelDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    required: false,
    type: VariantDto
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VariantDto)
  variant?: Variant;
}
