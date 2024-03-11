import { Injectable } from '@nestjs/common';

@Injectable()
export class ConstantsService {
  readonly ORDER_KEY = 'order';
}