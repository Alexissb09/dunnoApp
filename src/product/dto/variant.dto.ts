import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Min } from 'class-validator';

enum Name {
  mini = 'mini',
  mediano = 'mediano',
  grande = 'grande',
  set = 'set',
}

export class VariantDto {
  @ApiProperty()
  @IsString()
  @IsEnum(Name)
  name: Name;

  @ApiProperty()
  @IsInt()
  @Min(1)
  font: number;
}
