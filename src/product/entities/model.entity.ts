import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { Variant } from '../interfaces/variant.interface';

@Entity()
export class Model {
  @PrimaryColumn('text', {
    unique: true,
  })
  name: string;

  @Column('jsonb', {
    nullable: true,
  })
  variant?: Variant;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @BeforeInsert()
  toLowerCaseName() {
    this.name.toLowerCase();
  }
}
