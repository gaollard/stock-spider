import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import dayjs from 'dayjs';
import axios from 'axios';
import { StockDailyTab } from "../entity/stock-daily.entity";
import { Stock } from "../entity/stock.entity";

export async function run() {
  let all: (any[])[] = [];

  const date = dayjs().format('YYYY-MM-DD');

  async function updateStockSummary() {
    const repo = dataSource.getRepository(Stock);
    for (let i = 0; i < all.length; i++) {
      const array = all[i].filter((it: {
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
            date: date,
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
            date: date,
            used: Number(used)
          })
        }
      }
    }
  }
  
  async function queryList () {
    let pageNum = 1;
    let list = [];
    let all = [];
    do {
      list = await query(pageNum);
      all.push(list);
      pageNum++;
    } while (list.length === 1000);
    return all;
  }
  
  // 来自页面 https://quote.eastmoney.com/center/gridlist.html#hs_a_board
  // 通过排行，可以抓取股票的最新股价
  
  // f12 代号
  // f14 名称
  // f2 最新价
  // f9 市盈率
  // f20 总市值
  // f21 流通市值
  // f8 换手率
  
  function query (pageNum: number) {
    return  axios({
      url: `https://45.push2.eastmoney.com/api/qt/clist/get?pn=${pageNum}&pz=1000&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&wbp2u=|0|0|0|web&fid=f3&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1714314247429`,
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "max-age=0",
        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "cookie": "qgqp_b_id=85e06bb41788f93f88be62752cbe29fa; websitepoptg_api_time=1714206129653; emshistory=%5B%22002463%22%2C%22601567%22%5D; st_si=57374068171843; st_asi=delete; EMFUND0=03-30%2019%3A07%3A37@%23%24%u4E0A%u94F6%u5185%u9700%u589E%u957F%u80A1%u7968C@%23%24015754; EMFUND1=03-31%2012%3A14%3A06@%23%24%u4E07%u5BB6%u5468%u671F%u9A71%u52A8%u80A1%u7968%u53D1%u8D77%u5F0FC@%23%24019880; EMFUND2=03-31%2012%3A14%3A03@%23%24%u5609%u5B9E%u6838%u5FC3%u4F18%u52BF%u80A1%u7968%u53D1%u8D77%u5F0F@%23%24005612; EMFUND3=03-30%2018%3A10%3A50@%23%24%u76CA%u6C11%u670D%u52A1%u9886%u5148%u6DF7%u5408A@%23%24000410; EMFUND4=03-30%2018%3A22%3A48@%23%24%u534E%u590F%u5927%u76D8%u7CBE%u9009%u6DF7%u5408A@%23%24000011; EMFUND5=04-01%2009%3A53%3A25@%23%24%u5E7F%u53D1%u8D44%u6E90%u4F18%u9009%u80A1%u7968A@%23%24005402; EMFUND6=04-27%2019%3A58%3A40@%23%24%u4E2D%u6B27%u6E2F%u80A1%u6570%u5B57%u7ECF%u6D4E%u6DF7%u5408%u53D1%u8D77%28QDII%29A@%23%24015884; EMFUND7=04-27%2020%3A02%3A13@%23%24%u534E%u590F%u6210%u957F%u6DF7%u5408@%23%24000001; EMFUND8=04-28%2022%3A13%3A15@%23%24%u5B8F%u5229%u8F6C%u578B%u673A%u9047%u80A1%u7968A@%23%24000828; EMFUND9=04-28 22:14:39@#$%u5927%u6210%u9AD8%u65B0%u6280%u672F%u4EA7%u4E1A%u80A1%u7968C@%23%24011066; HAList=ty-0-300059-%u4E1C%u65B9%u8D22%u5BCC%2Cty-1-601138-%u5DE5%u4E1A%u5BCC%u8054%2Cty-1-688195-%u817E%u666F%u79D1%u6280%2Cty-0-002463-%u6CAA%u7535%u80A1%u4EFD%2Cty-1-601012-%u9686%u57FA%u7EFF%u80FD%2Cty-0-300274-%u9633%u5149%u7535%u6E90%2Cty-1-601567-%u4E09%u661F%u533B%u7597%2Cty-0-000100-TCL%u79D1%u6280%2Cty-1-603806-%u798F%u65AF%u7279%2Cty-1-603606-%u4E1C%u65B9%u7535%u7F06; st_pvi=26377708967691; st_sp=2024-02-25%2021%3A55%3A01; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=30; st_psi=202404282229187-113200301321-3427684076"
      },
      "method": "GET"
    }).then((res) => {
      return res.data.data.diff
    })
  }

  await initDb()
  const data = all = await queryList()
  console.log(`queryList success`);

  const delRes = await dataSource.getRepository(StockDailyTab).delete({
    date
  });

  console.log(`删除旧数据`, delRes.affected)

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
        date: date,
        address_one: `${it['f12']}.${it['f13']}`,
        address_two: ''
      }
    }).filter((it: any) => !(it.stock_name || '').includes('退市'))
    await dataSource.getRepository(StockDailyTab).save(array)
  }

  console.log('开始更新汇总表');
  await updateStockSummary();
  dataSource.destroy();
}