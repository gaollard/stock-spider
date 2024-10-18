import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * 股票每日价格表
 */

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

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  振幅: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  最高: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  最低: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, })
  开盘: string;

  @Column({ type: 'date' })
  date: string;
}