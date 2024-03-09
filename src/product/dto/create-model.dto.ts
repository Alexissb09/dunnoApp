import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Name } from '../interfaces/variant.interface';

export class CreateModelDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Name, {
    each: true,
  })
  variant?: Name[];
}
