import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 't_stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;
}