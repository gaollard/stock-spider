import * as cheerio from 'cheerio';
import { dataSource, initDb } from "../db";
import { Funder } from "../entity/funder.entity";
import * as _ from 'lodash'
import console from 'console';
import fs from 'fs'

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

(async function startRun() {
  await initDb()
  let list = await dataSource.getRepository(Funder).find({});

  for (let i = 0; i < list.length; i++) {
    const record = list[i];
    const funder_code = record!.code;
    const funder_title = record!.title;
    console.log(i, funder_code, funder_title);

    if (fs.existsSync(`0330/funder_stock/${funder_code}.json`)) {
      continue;
    }

    const data = await query_by_ccmx_api(funder_code, funder_title);
    fs.writeFileSync(`0330/funder_stock/${funder_code}.json`, JSON.stringify(data))
  }
})()

async function query_by_mx_api(funder_code: string) {
   // 访问基金详情页面
   return await fetch(`https://fund.eastmoney.com/${funder_code}.html`, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "max-age=0",
      "if-modified-since": "Sat, 30 Mar 2024 02:58:02 GMT",
      "if-none-match": "W/\"66077fba-1c9a6\"",
      "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "qgqp_b_id=85e06bb41788f93f88be62752cbe29fa; websitepoptg_api_time=1711720458883; HAList=ty-0-300124-%u6C47%u5DDD%u6280%u672F%2Cty-0-000628-%u9AD8%u65B0%u53D1%u5C55%2Cty-0-000661-%u957F%u6625%u9AD8%u65B0%2Cty-1-600203-%u798F%u65E5%u7535%u5B50%2Cty-1-688221-%u524D%u6CBF%u751F%u7269-U%2Cty-0-002424-%u8D35%u5DDE%u767E%u7075; st_si=86975610485587; st_asi=delete; FundWebTradeUserInfo=JTdCJTIyQ3VzdG9tZXJObyUyMjolMjIlMjIsJTIyQ3VzdG9tZXJOYW1lJTIyOiUyMiUyMiwlMjJWaXBMZXZlbCUyMjolMjIlMjIsJTIyTFRva2VuJTIyOiUyMiUyMiwlMjJJc1Zpc2l0b3IlMjI6JTIyJTIyLCUyMlJpc2slMjI6JTIyJTIyLCUyMlN1cnZleURheSUyMjowLCUyMklzQXVkaXROZWVkUG9wJTIyOnRydWUlN0Q%3D; _adsame_fullscreen_18503=1; EMFUND0=03-29%2023%3A22%3A36@%23%24%u62DB%u5546%u6210%u957F%u5148%u5BFC%u80A1%u7968A@%23%24014589; EMFUND1=03-29%2022%3A45%3A58@%23%24%u5609%u5B9E%u7F8E%u56FD%u6210%u957F%u80A1%u7968%u4EBA%u6C11%u5E01@%23%24000043; EMFUND2=03-29%2023%3A06%3A58@%23%24%u4E2D%u52A0%u8F6C%u578B%u52A8%u529B%u6DF7%u5408A@%23%24005775; EMFUND3=03-30%2010%3A23%3A11@%23%24%u534E%u5B9D%u5236%u9020%u80A1%u7968@%23%24000866; EMFUND4=03-30%2010%3A23%3A11@%23%24%u5174%u94F6%u6D88%u8D39%u65B0%u8D8B%u52BF%u7075%u6D3B%u914D%u7F6EC@%23%24018658; EMFUND5=03-30%2009%3A35%3A11@%23%24%u5E7F%u53D1%u7EB3%u65AF%u8FBE%u514B100ETF%u8054%u63A5%u4EBA%u6C11%u5E01%28QDII%29A@%23%24270042; EMFUND6=03-30%2009%3A35%3A21@%23%24%u535A%u65F6%u6807%u666E500ETF%u8054%u63A5A@%23%24050025; EMFUND8=03-30%2010%3A23%3A11@%23%24%u6469%u6839%u65F6%u4EE3%u777F%u9009%u80A1%u7968C@%23%24014342; ASP.NET_SessionId=4bjfdyhyhg0ppgbwtgtpbmsc; EMFUND9=03-30%2011%3A02%3A01@%23%24%u6C47%u6DFB%u5BCC%u5916%u5EF6%u589E%u957F%u80A1%u7968A@%23%24000925; EMFUND7=03-30 11:12:11@#$%u5E7F%u53D1%u8D44%u6E90%u4F18%u9009%u80A1%u7968A@%23%24005402; st_pvi=26377708967691; st_sp=2024-02-25%2021%3A55%3A01; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=6; st_psi=20240330111210711-112200305282-0188855710"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET"
  }).then((res) => res.text())
}

/**
 * 查询基金的持仓明细
 */
async function query_by_ccmx_api(fund_code: string, fund_name: string) {
  const data = await fetch(`https://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${fund_code}&topline=10&year=&month=12&rt=0.7986558010439477`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-CN,zh;q=0.9",
      "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "script",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "same-origin",
      "cookie": "qgqp_b_id=85e06bb41788f93f88be62752cbe29fa; websitepoptg_api_time=1711720458883; st_si=86975610485587; FundWebTradeUserInfo=JTdCJTIyQ3VzdG9tZXJObyUyMjolMjIlMjIsJTIyQ3VzdG9tZXJOYW1lJTIyOiUyMiUyMiwlMjJWaXBMZXZlbCUyMjolMjIlMjIsJTIyTFRva2VuJTIyOiUyMiUyMiwlMjJJc1Zpc2l0b3IlMjI6JTIyJTIyLCUyMlJpc2slMjI6JTIyJTIyLCUyMlN1cnZleURheSUyMjowLCUyMklzQXVkaXROZWVkUG9wJTIyOnRydWUlN0Q%3D; EMFUND0=03-30%2010%3A23%3A11@%23%24%u6469%u6839%u65F6%u4EE3%u777F%u9009%u80A1%u7968C@%23%24014342; EMFUND2=03-30%2017%3A50%3A52@%23%24%u5609%u5B9E%u7814%u7A76%u963F%u5C14%u6CD5%u80A1%u7968A@%23%24000082; EMFUND8=03-30%2018%3A10%3A50@%23%24%u76CA%u6C11%u670D%u52A1%u9886%u5148%u6DF7%u5408A@%23%24000410; EMFUND9=03-30%2018%3A22%3A48@%23%24%u534E%u590F%u5927%u76D8%u7CBE%u9009%u6DF7%u5408A@%23%24000011; EMFUND3=03-30%2018%3A36%3A52@%23%24%u62DB%u5546%u79D1%u6280%u52A8%u529B3%u4E2A%u6708%u6EDA%u52A8%u6301%u6709%u80A1%u7968A@%23%24009601; EMFUND4=03-30%2018%3A37%3A12@%23%24%u5927%u6469%u91CF%u5316%u591A%u7B56%u7565%u80A1%u7968@%23%24001291; EMFUND5=03-30%2019%3A07%3A37@%23%24%u4E0A%u94F6%u5185%u9700%u589E%u957F%u80A1%u7968C@%23%24015754; st_asi=delete; ASP.NET_SessionId=eus3zat2cslmyit0xuqznnjq; HAList=ty-1-600519-%u8D35%u5DDE%u8305%u53F0%2Cty-1-601088-%u4E2D%u56FD%u795E%u534E%2Cty-0-000100-TCL%u79D1%u6280%2Cty-1-601225-%u9655%u897F%u7164%u4E1A%2Cty-1-603993-%u6D1B%u9633%u94BC%u4E1A%2Cty-1-600026-%u4E2D%u8FDC%u6D77%u80FD%2Cty-0-300124-%u6C47%u5DDD%u6280%u672F%2Cty-0-000628-%u9AD8%u65B0%u53D1%u5C55%2Cty-0-000661-%u957F%u6625%u9AD8%u65B0%2Cty-1-600203-%u798F%u65E5%u7535%u5B50; EMFUND1=03-30%2021%3A40%3A32@%23%24%u6C47%u6DFB%u5BCC%u5916%u5EF6%u589E%u957F%u80A1%u7968A@%23%24000925; EMFUND7=03-30%2021%3A47%3A09@%23%24%u5609%u5B9E%u6838%u5FC3%u4F18%u52BF%u80A1%u7968%u53D1%u8D77%u5F0F@%23%24005612; EMFUND6=03-30 21:47:19@#$%u4E07%u5BB6%u5468%u671F%u9A71%u52A8%u80A1%u7968%u53D1%u8D77%u5F0FC@%23%24019880; st_pvi=26377708967691; st_sp=2024-02-25%2021%3A55%3A01; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=59; st_psi=20240330215130451-112200305283-5529258201",
      "Referer": "https://fundf10.eastmoney.com/ccmx_000925.html",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  }).then((res) => res.text())
  .then((res) => {
    return res
  })
  let func = new Function (data + '; return apidata');
  const _data = func();
  const $ = cheerio.load(_data.content);
  const list: Item[] = []

  $('.box table tbody').each((i: any, el: any) => {
    if (i === 0) {
      $(el).find("tr").each((j: any, el) => {
        if (j < 30) {
          const item = {
            stock_code: $(el.children[1]).text(),
            stock_name: $(el.children[2]).text(),
            fund_code,
            fund_name,
            ratio: $(el.children[6]).text(),
            count: $(el.children[7]).text(),
            money: ($(el.children[8]).text() || '0').replaceAll(',', ''),
          }
          list.push(item)
        }
      })
    }
  })

  return list;
}