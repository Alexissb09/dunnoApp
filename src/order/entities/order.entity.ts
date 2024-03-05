import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../interfaces/status.interface';
import { Item } from '../interfaces/item.interface';
import { Color } from 'src/interfaces/color.interface';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: Date;

  @Column('enum', {
    enum: Status,
    default: Status.pending,
  })
  status?: string;

  @Column('decimal', {
    default: 0,
  })
  downpayment?: number;

  @Column('decimal', {
    default: 0,
  })
  total?: number;

  @Column('jsonb', {
    nullable: true,
  })
  items: Item[];
}
