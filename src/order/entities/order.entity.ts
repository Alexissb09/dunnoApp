import { BadRequestException } from '@nestjs/common';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Status } from '../interfaces/status.interface';
import { Item } from '../interfaces/item.interface';
import { Customer } from '../interfaces/customer.interface';
import { PaymentMethod } from '../interfaces/paymentmethod.interface';
import { TypeProduct } from '../interfaces/product.interface';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamptz')
  date: Date;

  @Column('enum', {
    enum: Status,
    default: Status.pending,
  })
  status?: string;

  @Column('float', {
    default: 0,
  })
  downpayment?: number;

  @Column('float', {
    default: 0,
  })
  total: number;

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

  @Column('enum', {
    enum: TypeProduct,
  })
  typeproduct: TypeProduct;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @Column('int2', {
    default: 0,
  })
  box: number;

  @Column('float', {
    default: 0,
  })
  profit: number;

  @BeforeInsert()
  toLowerCaseName() {
    this.customer.username.toLowerCase();
    this.customer.contactmethod.toLowerCase();

    if (this.isActive === false) {
      throw new BadRequestException(
        "You cannot create an order with 'isActive' property in false",
      );
    }
  }
}
