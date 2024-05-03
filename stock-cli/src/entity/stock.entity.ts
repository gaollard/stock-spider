import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * 股票信息表
 */

@Entity({ name: 't_stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  stock_code: string;

  @Column({})
  stock_name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  市盈率: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, })
  总市值: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, })
  流通市值: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  换手率: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ nullable: true })
  address_one: string;

  @Column({ nullable: true })
  address_two: string;

  @Column({ })
  flag: number;
}