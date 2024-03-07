import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  contactmethod: string;
}
