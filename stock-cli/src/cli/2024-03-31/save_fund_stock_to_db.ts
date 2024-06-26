import { dataSource, initDb } from "../../db";
import * as _ from 'lodash'
import console from 'console';
import fs from 'fs'
import { FunderStockMonth } from "../../entity/funder-stock-record.entity";
import path from 'path';

saveToDb();

async function saveToDb() {
  await initDb()
  const files = fs.readdirSync('resource/2024-03-31/funder_stock').filter((it) => it.includes('json'));
  // await dataSource.getRepository(FunderStockMonth).clear()
  for (let i = 0; i < files.length; i++) {
    try {
      console.log(i, files[i])
      const data = require(path.resolve(__dirname, '../../../') + '/resource/2024-03-31/funder_stock/' + files[i]);
      const {
        stock_code,
        stock_name,
        fund_code,
        fund_name,
        count,
        money,
        ratio,
      } = data;
      const list = data.map(({
        stock_code,
        stock_name,
        fund_code,
        fund_name,
        count,
        money,
        ratio,
      }: any) => {
          return {
            stock_code,
            stock_name,
            fund_code,
            fund_name,
            ratio,
            count: (count || '0').replaceAll(',', ''),
            money: (money || '0').replaceAll(',', ''),
            term: "2024-03-31"
          }
      });
      if (list.length) {
        const one = await dataSource.getRepository(FunderStockMonth).findOne({
          where: {
            stock_code: list[0].fund_code
          }
        })
        if (!one) {
          await dataSource.getRepository(FunderStockMonth).save(list)
        }
      }
    } catch (e) {
      console.log(files[i], e)
    }
  }
}