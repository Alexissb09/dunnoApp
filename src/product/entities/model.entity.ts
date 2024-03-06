import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Model {
  @PrimaryColumn('text', {
    unique: true,
  })
  name: string;

  @Column('text', {
    nullable: true,
  })
  variant: string;

  @Column('smallint', {
    nullable: true,
  })
  font: number;

  @Column('boolean', {
    default: true,
  })
  isActive: boolean;

  @BeforeInsert()
  toLowerCaseName() {
    this.name.toLowerCase();
  }
}
