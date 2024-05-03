import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import path from 'path';
import { StockDailyTab } from "../entity/stock-daily.entity";

saveToDb();

async function saveToDb() {
  await initDb()
  const data = require(path.resolve(__dirname, '../../') + '/resource/stock_daily/2024-04-30.json');
  for (let i = 0; i < data.length; i++) {
    const array = data[i].map((it: any) => {
      return {
        stock_name: it['f14'],
        stock_code: it['f12'],
        price: Number.isNaN(Number(it['f2'])) ? 0 : Number(it['f2']),
        市盈率: Number.isNaN(Number(it['f9'])) ? 0 : Number(it['f9']),
        总市值: Number.isNaN(Number(it['f20'])) ? 0 : (Number(it['f20']) / 100000000),
        流通市值:  Number.isNaN(Number(it['f21'])) ? 0 : (Number(it['f21']) / 100000000),
        换手率: it['f8'],
        date: new Date(),
        addressOne: `${it['f12']}.${it['f13']}`
      }
    }).filter((it: any) => !(it.stock_name || '').includes('退市'))
    await dataSource.getRepository(StockDailyTab).save(array)
  }
  dataSource.destroy();
}