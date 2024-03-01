import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  username: string;

  @Column('text')
  password: string;

  @Column('boolean', { default: true })
  isActive: boolean;
}
