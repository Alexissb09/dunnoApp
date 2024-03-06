import { Color } from 'src/interfaces/color.interface';
import { Model } from './model.interface';

export interface Item {
  amount: number;
  subtotal: number;
  model: Model;
  color: Color[];
  price: number;
}