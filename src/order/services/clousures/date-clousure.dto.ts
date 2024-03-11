import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class DateClousureDto {
  @ApiProperty({
    example: '2024-03-11',
    description: 'Fecha del pedido en formato ISO 8601',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'The date format is incorrect, must be like: 2020-01-01',
  })
  from: Date;

  @ApiProperty({
    example: '2024-03-11',
    description: 'Fecha del pedido en formato ISO 8601',
  })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'The date format is incorrect, must be like: 2020-01-01',
  })
  until: Date;
}
