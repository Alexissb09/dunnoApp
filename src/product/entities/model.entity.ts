import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from 'src/product/interfaces/variant.interface';
import { IsOptional } from 'class-validator';

@Entity()
export class Model {
  @PrimaryColumn('varchar', {
    unique: true,
    nullable: false,
  })
  name: string;

  @Column('enum', {
    enum: Name,
    nullable: true,
  })
  variant?: Name[];

  @IsOptional()
  @Column('boolean', {
    default: true,
    nullable: true,
  })
  isActive: boolean;
}
