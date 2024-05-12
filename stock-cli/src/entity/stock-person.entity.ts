import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: 't_stock_person' })
export class StockPersonTab {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({})
  stock_code: string;

  @Index()
  @Column({})
  stock_name: string;

  @Column({ nullable: true })
  人均流通股: number;

  @Column({ nullable: true })
  股东人数: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  人均持仓金额: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  十大股东持股合计: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  十大流通股东持股合计: number;

  @Column({ type: 'decimal', precision: 20, scale: 4, nullable: true })
  较上期变化: number;

  // 00开头：A股证券
  // 30开头：创业板证券
  // 60开头：沪市A股票代码
  @Index()
  @Column({ nullable: true })
  used: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'date' })
  end_date: Date;
}