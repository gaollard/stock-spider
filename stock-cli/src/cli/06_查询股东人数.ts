// https://emweb.securities.eastmoney.com/pc_hsf10/pages/index.html?type=web&code=SZ002463&color=b#/gdyj

// import * as cheerio from 'cheerio';
// import { dataSource, initDb } from "../../db";
// import * as _ from 'lodash'
// import console from 'console';
// import fs from 'fs'
// import { Stock } from '../../entity/stock.entity';

// interface Item {
//   fund_name: string;
//   fund_code: string;
//   stock_name: string;
//   stock_code: string;
//   // 持仓比例
//   ratio: string;
//   // 持仓数量
//   count: string;
//   // 持仓金额
//   money: string;
// }

// // (async function startRun() {
// //   await initDb()
// //   // 查询所有股票
// //   let list = await dataSource.getRepository(Stock).find({});
// //   for (let i = 0; i < list.length; i++) {
// //     const record = list[i];
// //     const funder_code = record!.code;
// //     query_people();
// //   }
// // })()

query_people()

function query_people () {
  return fetch("https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_F10_EH_HOLDERNUM&columns=SECUCODE%2CSECURITY_CODE%2CEND_DATE%2CHOLDER_TOTAL_NUM%2CTOTAL_NUM_RATIO%2CAVG_FREE_SHARES%2CAVG_FREESHARES_RATIO%2CHOLD_FOCUS%2CPRICE%2CAVG_HOLD_AMT%2CHOLD_RATIO_TOTAL%2CFREEHOLD_RATIO_TOTAL&quoteColumns=&filter=(SECUCODE%3D%22002463.SZ%22)&pageNumber=1&pageSize=10&sortTypes=-1&sortColumns=END_DATE&source=HSF10&client=PC&v=020948659474490938", {
      "headers": {
        "accept": "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "Referer": "https://emweb.securities.eastmoney.com/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then((res) => {
      return res.json()
    }).then((res) => {
      // HOLDER_TOTAL_NUM 股东人数
      // AVG_FREE_SHARES 人均流通股
      // AVG_HOLD_AMT 人均持股金额
      const { HOLDER_TOTAL_NUM, AVG_FREE_SHARES, AVG_HOLD_AMT } = res.result.data[0];
    })
}