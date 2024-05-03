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

  @Column({ nullable: true })
  price1: number;

  @Column({ nullable: true })
  price2: number;

  @Column({ nullable: true })
  price3: number;

  @Column({ nullable: true })
  price4: number;

  @Column({ nullable: true })
  price5: number;

  @Column({ nullable: true })
  price6: number;

  @Column({ nullable: true })
  price7: number;

  @Column({ nullable: true })
  price8: number;

  @Column({ nullable: true })
  price9: number;

  @Column({ nullable: true })
  price10: number;
}