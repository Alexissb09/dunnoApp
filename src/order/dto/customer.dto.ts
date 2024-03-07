import { IsString, MinLength } from 'class-validator';

export class CustomerDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @MinLength(1)
  contactmethod: string;
}
