import * as cheerio from 'cheerio';
import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import console from 'console';
import fs from 'fs'
import { Stock } from '../entity/stock.entity';
import axios from 'axios';

interface Item {
  fund_name: string;
  fund_code: string;
  stock_name: string;
  stock_code: string;
  // 持仓比例
  ratio: string;
  // 持仓数量
  count: string;
  // 持仓金额
  money: string;
}

startRun()

async function startRun() {
  console.log(222);

  await initDb()
  // 查询所有股票
  let list = await dataSource.getRepository(Stock).findOne({
    where: {
      used: 1
    }
  });

  console.log(`https://quote.eastmoney.com/unify/r/${list?.address_one}`)

  const res = await axios.get(`https://quote.eastmoney.com/unify/r/${list?.address_one}`, {
    headers: {

    }
  })
  console.log(res.data)
  // for (let i = 0; i < list.length; i++) {
  //   const record = list[i];
  // }
}