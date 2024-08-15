import { dataSource } from '../db';
import * as fs from 'fs';
import * as path from 'path';

// export default async function query() {
//   const sql = `
//   select * from t_stock as t
//   where
//     t.换手率 > 5 and
//     t.price1 > t.price2
//   `;
//   const data = await dataSource.query(sql);
//   return data;
// }