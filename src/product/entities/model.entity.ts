import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryColumn('text', {
    unique: true,
  })
  name: string;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @BeforeInsert()
  toLowerCaseName() {
    this.name.toLowerCase();
  }
}
