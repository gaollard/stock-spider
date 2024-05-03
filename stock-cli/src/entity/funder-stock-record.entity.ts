import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * 基金持仓明细
 */

@Entity({ name: 't_funder_stock_record' })
export class FunderStockMonth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  fund_code: string;

  @Column({})
  fund_name: string;

  @Column({})
  stock_code: string;

  @Column({})
  stock_name: string;

  @Column({})
  ratio: string;

  @Column({})
  count: string;

  @Column({})
  money: string;

  @Column({})
  term: string;
}