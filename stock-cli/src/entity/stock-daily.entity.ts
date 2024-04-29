import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 't_stock_day' })
export class StockDailyTab {
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
}