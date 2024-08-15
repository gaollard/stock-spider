import { dataSource } from '../db';
import * as fs from 'fs';
import * as path from 'path';

export async function query_01_连续3日上涨() {
  const sql = `
  select * from t_stock as t
  where
    t.price > t.price1 and
    t.price1 > t.price2 and
    t.换手率 > 10;
  `;
  const data = await dataSource.query(sql);
  return data;
}