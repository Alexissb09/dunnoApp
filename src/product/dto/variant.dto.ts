import { IsEnum, IsInt, IsString, Min } from 'class-validator';

enum Name {
  mini = 'mini',
  mediano = 'mediano',
  grande = 'grande',
  set = 'set',
}

export class VariantDto {
  @IsString()
  @IsEnum(Name)
  name: Name;

  @IsInt()
  @Min(1)
  font: number;
}
