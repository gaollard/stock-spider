import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 't_funder' })
export class Funder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  title: string;

  @Column({})
  code: string;

  @Column({})
  type: string;
}