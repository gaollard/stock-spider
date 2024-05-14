// https://emweb.securities.eastmoney.com/pc_hsf10/pages/index.html?type=web&code=SZ002463&color=b#/gdyj

import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import { Stock } from "../entity/stock.entity";
import axios from 'axios'
import { StockPersonTab } from "../entity/stock-person.entity";
import { sleep } from "../utils/sleep";
import { IsNull, Not } from "typeorm";
import dayjs from 'dayjs';

const date = dayjs().format('YYYY-MM-DD');

jobQueryDetailAddress()

async function jobQueryDetailAddress () {
  await initDb()
  const repo =  dataSource.getRepository(Stock);
  const peopleRepo = dataSource.getRepository(StockPersonTab);
  let list = await repo.find({ where: [
    {
      used: 1,
      person_update_date: Not(date),
    },
    {
      used: 1,
      person_update_date: IsNull(),
    }
  ], select: ['address_one', 'address_two', 'stock_code', 'stock_name', 'used']})

  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    const address_two = data.address_two;
    if (address_two) {
      const code = address_two.split('/');
      let sourceCode = code[code.length - 1].replace('.html', '');

      await sleep(100);

      let list: ResultItem[] = [];
      if (sourceCode.includes('sz')) {
        sourceCode = sourceCode.replace('sz', '') + '.SZ';
        list = await query_people(sourceCode);
      }
      else if (sourceCode.includes('sh')) {
        sourceCode = sourceCode.replace('sh', '') + '.SH';
        list = await query_people(sourceCode);
      }

      if (list.length) {
        console.log(list.length, i, sourceCode);
        await repo.update({
          stock_code: data.stock_code,
        }, {
          ...list[0],
          person_update_date: date
        });
        await peopleRepo.delete({
          stock_code: data.stock_code,
        });
        const records = list.map((it) => {
          return peopleRepo.create({
            ...it,
            stock_code: data.stock_code,
            stock_name: data.stock_name,
            date: new Date(),
            used: data.used
          })
        });
        await peopleRepo.save(records);
      }
    }
  }

  dataSource.destroy();
}

interface Item {
  AVG_FREE_SHARES: number;
  HOLDER_TOTAL_NUM: number;
  AVG_HOLD_AMT: number;
  HOLD_RATIO_TOTAL: number;
  FREEHOLD_RATIO_TOTAL: number;
  TOTAL_NUM_RATIO: number
  END_DATE: string;
}

interface ResultItem {
  人均流通股: number,
  股东人数: number,
  人均持仓金额: number,
  十大股东持股合计: number,
  十大流通股东持股合计: number,
  较上期变化: number,
  person_end_date: string;
}

// query_people("000511.SZ")

function query_people (sourceCode: string): Promise<Array<ResultItem>> {
  // https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_F10_EH_HOLDERNUM&columns=SECUCODE%2CSECURITY_CODE%2CEND_DATE%2CHOLDER_TOTAL_NUM%2CTOTAL_NUM_RATIO%2CAVG_FREE_SHARES%2CAVG_FREESHARES_RATIO%2CHOLD_FOCUS%2CPRICE%2CAVG_HOLD_AMT%2CHOLD_RATIO_TOTAL%2CFREEHOLD_RATIO_TOTAL&quoteColumns=&filter=(SECUCODE%3D%22002616.SZ%22)&pageNumber=1&pageSize=10&sortTypes=-1&sortColumns=END_DATE&source=HSF10&client=PC&v=020948659474490938
  const url = `https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_F10_EH_HOLDERNUM&columns=SECUCODE%2CSECURITY_CODE%2CEND_DATE%2CHOLDER_TOTAL_NUM%2CTOTAL_NUM_RATIO%2CAVG_FREE_SHARES%2CAVG_FREESHARES_RATIO%2CHOLD_FOCUS%2CPRICE%2CAVG_HOLD_AMT%2CHOLD_RATIO_TOTAL%2CFREEHOLD_RATIO_TOTAL&quoteColumns=&filter=(SECUCODE%3D%22${sourceCode}%22)&pageNumber=1&pageSize=10&sortTypes=-1&sortColumns=END_DATE&source=HSF10&client=PC&v=020948659474490938`
  return axios({
    url,
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
    method: 'GET'
  }).then((res: any) => {
    console.log(res.data)
    let data = res.data.result.data;
    return  (data || []).map(({
      AVG_FREE_SHARES,
      HOLDER_TOTAL_NUM,
      HOLD_RATIO_TOTAL,
      AVG_HOLD_AMT,
      FREEHOLD_RATIO_TOTAL,
      TOTAL_NUM_RATIO,
      END_DATE
    }: Item) => {
      return {
        人均流通股: AVG_FREE_SHARES,
        股东人数: HOLDER_TOTAL_NUM,
        人均持仓金额: AVG_HOLD_AMT,
        十大股东持股合计: HOLD_RATIO_TOTAL,
        十大流通股东持股合计: FREEHOLD_RATIO_TOTAL,
        较上期变化: TOTAL_NUM_RATIO,
        person_end_date: END_DATE
      }
    });
  })
}