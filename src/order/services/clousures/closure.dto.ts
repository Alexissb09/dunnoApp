import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, Matches } from 'class-validator';
import { TypeProduct } from 'src/order/interfaces/product.interface';

export class ClosureDto {
  @ApiProperty({
    example: '2024-03-13T14:26:25.540Z',
    description: 'Fecha del pedido en formato ISO 8601',
  })
  @IsDateString()
  from: Date;

  @ApiProperty({
    example: '2024-03-13T14:26:25.540Z',
    description: 'Fecha del pedido en formato ISO 8601',
  })
  @IsDateString()
  until: Date;

  @ApiProperty()
  @IsEnum(TypeProduct)
  typeproduct: TypeProduct;
}
