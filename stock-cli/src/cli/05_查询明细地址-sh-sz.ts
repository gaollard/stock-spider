import { dataSource, initDb } from "../db";
import * as _ from 'lodash'
import path from 'path';
import { Stock } from "../entity/stock.entity";
import dayjs from 'dayjs';
import axios from 'axios'
import { IsNull } from "typeorm";

const date = dayjs().format('YYYY-MM-DD');

function getDetailAddress (address_one: string): Promise<string|null> {
  const url = `https://quote.eastmoney.com/unify/r/` + address_one;
  console.log(`req`, url);
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url,
      maxRedirects: 0,
      "headers": {
        "accept": "text/html, */*; q=0.01",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "qgqp_b_id=85e06bb41788f93f88be62752cbe29fa; EMFUND0=03-31%2012%3A14%3A03@%23%24%u5609%u5B9E%u6838%u5FC3%u4F18%u52BF%u80A1%u7968%u53D1%u8D77%u5F0F@%23%24005612; EMFUND1=03-30%2018%3A10%3A50@%23%24%u76CA%u6C11%u670D%u52A1%u9886%u5148%u6DF7%u5408A@%23%24000410; EMFUND2=03-30%2018%3A22%3A48@%23%24%u534E%u590F%u5927%u76D8%u7CBE%u9009%u6DF7%u5408A@%23%24000011; EMFUND3=04-01%2009%3A53%3A25@%23%24%u5E7F%u53D1%u8D44%u6E90%u4F18%u9009%u80A1%u7968A@%23%24005402; EMFUND4=04-27%2019%3A58%3A40@%23%24%u4E2D%u6B27%u6E2F%u80A1%u6570%u5B57%u7ECF%u6D4E%u6DF7%u5408%u53D1%u8D77%28QDII%29A@%23%24015884; EMFUND5=04-27%2020%3A02%3A13@%23%24%u534E%u590F%u6210%u957F%u6DF7%u5408@%23%24000001; EMFUND7=04-28%2022%3A34%3A40@%23%24%u5927%u6210%u9AD8%u65B0%u6280%u672F%u4EA7%u4E1A%u80A1%u7968C@%23%24011066; EMFUND8=04-30%2016%3A00%3A30@%23%24%u91D1%u9E70%u6DFB%u76C8%u7EAF%u503A%u503A%u5238A@%23%24003384; EMFUND9=04-30%2016%3A00%3A47@%23%24%u4E1C%u8D22%u6570%u5B57%u7ECF%u6D4E%u6DF7%u5408%u53D1%u8D77%u5F0FA@%23%24015096; EMFUND6=05-05 21:44:44@#$%u5B8F%u5229%u8F6C%u578B%u673A%u9047%u80A1%u7968A@%23%24000828; emshistory=%5B%22%E4%B8%AD%E5%9B%BD%E4%B8%AD%E9%93%81%22%2C%22%E5%AF%92%E6%AD%A6%E7%BA%AA%22%2C%22%E7%99%BD%E4%BA%91%E6%9C%BA%E5%9C%BA%22%2C%22%E4%BA%BA%E7%A6%8F%E5%8C%BB%E8%8D%AF%22%2C%22002463%22%2C%22601567%22%5D; HAList=ty-1-601390-%u4E2D%u56FD%u4E2D%u94C1%2Cty-0-000400-%u8BB8%u7EE7%u7535%u6C14%2Cty-1-688256-%u5BD2%u6B66%u7EAA-U%2Cty-1-600004-%u767D%u4E91%u673A%u573A%2Cty-0-300177-%u4E2D%u6D77%u8FBE%2Cty-1-601138-%u5DE5%u4E1A%u5BCC%u8054%2Cty-0-000002-%u4E07%20%20%u79D1%uFF21%2Cty-1-600132-%u91CD%u5E86%u5564%u9152%2Cty-0-002555-%u4E09%u4E03%u4E92%u5A31%2Cty-1-600872-%u4E2D%u70AC%u9AD8%u65B0; st_si=15366407611062; st_pvi=26377708967691; st_sp=2024-02-25%2021%3A55%3A01; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=1; st_psi=20240511095124357-113200301321-6573740820; st_asi=delete",
        "Referer": "https://quote.eastmoney.com/center/gridlist.html",
        "Referrer-Policy": "unsafe-url"
      },
    }).then((res) => {
      console.log(res.data.data)
    }).catch((res) => {
      if (res.response && res.response.status === 302) {
        const v = parseAddress(res.response.data);
        console.log(`url: ${res.response.data}`)
        resolve(v || null)
      } else {
        resolve(null);
        console.log(`error`, res)
      }
    })
  })  
}

function parseAddress (htmlContent: string) {
  // const htmlContent = 'Redirecting to <a href="//quote.eastmoney.com/sz300215.html">//quote.eastmoney.com/sz300215.html</a>.';
  const regex = /<a[^>]+href=["']([^"']+)["']/i;
  const match = htmlContent.match(regex);
  if (match) {
    return `https:${match[1]}`
  }
}

jobQueryDetailAddress()

async function jobQueryDetailAddress () {
  await initDb()
  const repo =  dataSource.getRepository(Stock);
  const list = await repo.find({ where: {
    address_two: IsNull()
  }, select: ['address_one', 'stock_code', 'stock_name']});

  for (let i = 0; i < list.length; i++) {
    const data = list[i];
    if (data) {
      const val = await getDetailAddress(data.address_one);
      if (val) {
        await repo.update({
          stock_code: data.stock_code
        }, {
          address_two: val
        })
      }
    }
  }

  dataSource.destroy();
}