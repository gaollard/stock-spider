import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

/**
 * 股票信息表
 */

@Entity({ name: 't_stock' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({})
  stock_code: string;

  @Index()
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

  // 00开头：A股证券
  // 30开头：创业板证券
  // 60开头：沪市A股票代码
  @Index()
  @Column({ })
  used: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price1: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price2: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price3: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price4: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price5: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price6: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price7: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price8: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price9: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 2, })
  price10: number;
}