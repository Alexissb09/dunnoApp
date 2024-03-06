import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateModelDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  variant?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  font?: number;
}
