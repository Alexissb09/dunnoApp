import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../interfaces/status.interface';
import { Item } from '../interfaces/item.interface';
import { Customer } from '../interfaces/customer.interface';
import { PaymentMethod } from '../interfaces/paymentmethod.interface';

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

  @Column('jsonb')
  customer: Customer;

  @Column('enum', {
    enum: PaymentMethod,
  })
  paymentmethod: PaymentMethod;

  @BeforeInsert()
  toLowerCaseName() {
    this.customer.username.toLowerCase();
    this.customer.contactmethod.toLowerCase();
  }
}
