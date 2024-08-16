"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query_01_连续3日上涨 = void 0;
const db_1 = require("../db");
async function query_01_连续3日上涨() {
    const sql = `
  select * from t_stock as t
  where
    t.price > t.price1 and
    t.price1 > t.price2 and
    t.换手率 > 10;
  `;
    const data = await db_1.dataSource.query(sql);
    return data;
}
exports.query_01_连续3日上涨 = query_01_连续3日上涨;
