import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import path from 'path';
import { Stock } from "../entity/stock.entity";
import dayjs from 'dayjs';

const date = dayjs().format('YYYY-MM-DD');

saveToDb();

async function saveToDb() {
  await initDb()
  const repo =  dataSource.getRepository(Stock);
  const data = require(path.resolve(__dirname, '../../') + `/resource/stock_daily/${date}.json`);
  for (let i = 0; i < data.length; i++) {
    const array = data[i].filter((it: {
      stock_name: string;
      stock_code: number;
    }) => !(it.stock_name || '').includes('退市'));
    for (let j = 0; j < array.length; j++) {
      console.log(i, j)
      const it = array[j]

      const one = await repo.findOne({
        where: {
          stock_name: it['f14'],
          stock_code: it['f12'],
        }
      });

      let v = `${it['f12']}`;
      let used = false;
      if (v.indexOf('00') === 0) {
        used = true;
      } else if (v.indexOf('30') === 0) {
        used = true;
      } else if (v.indexOf('60') === 0) {
        used = true;
      }

      if (one) {
        await repo.update({
          stock_code: it['f12'],
        }, {
          stock_name: it['f14'],
          price: Number.isNaN(Number(it['f2'])) ? 0 : Number(it['f2']),
          市盈率: Number.isNaN(Number(it['f9'])) ? 0 : Number(it['f9']),
          总市值: Number.isNaN(Number(it['f20'])) ? 0 : (Number(it['f20']) / 100000000),
          流通市值:  Number.isNaN(Number(it['f21'])) ? 0 : (Number(it['f21']) / 100000000),
          换手率: it['f8'],
          address_one: `${it['f13']}.${it['f12']}`,
          flag: it['f13'],
          date: '2024-04-30',
          used: Number(used),
          price1: one.price,
          price2: one.price1,
          price3: one.price2,
          price4: one.price3,
          price5: one.price4,
          price6: one.price5,
          price7: one.price6,
          price8: one.price7,
          price9: one.price8,
          price10: one.price9,
        })
      } else {
        await repo.save({
          stock_name: it['f14'],
          stock_code: it['f12'],
          price: Number.isNaN(Number(it['f2'])) ? 0 : Number(it['f2']),
          市盈率: Number.isNaN(Number(it['f9'])) ? 0 : Number(it['f9']),
          总市值: Number.isNaN(Number(it['f20'])) ? 0 : (Number(it['f20']) / 100000000),
          流通市值:  Number.isNaN(Number(it['f21'])) ? 0 : (Number(it['f21']) / 100000000),
          换手率: it['f8'],
          address_one: `${it['f13']}.${it['f12']}`,
          flag: it['f13'],
          date: '2024-04-30',
          used: Number(used)
        })
      }
    }
  }
  dataSource.destroy();
}