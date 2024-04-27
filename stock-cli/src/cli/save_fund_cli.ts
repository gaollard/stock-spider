import { sleep } from "../utils/sleep";
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { dataSource, initDb } from "../db";
import { Funder } from "../entity/funder.entity";
import * as _ from 'lodash'
import { In } from "typeorm";

startRun();

let page: any = null;

async function startRun() {
  await initDb()
  const browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()

  // 股票类型
  await page.goto('https://fund.eastmoney.com/data/fundranking.html?spm=100015.lw.2#tgp;c0;r;s6yzf;pn10000;ddesc;qsd20200202;qed20210202;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb')
  await sleep(10000);
  await grabDataByTypeIndex('股票');

  // 混合类型
  await page.goto('https://fund.eastmoney.com/data/fundranking.html?spm=100015.lw.2#thh;c0;r;s6yzf;pn10000;ddesc;qsd20200202;qed20210202;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb')
  await sleep(10000);
  await grabDataByTypeIndex('混合');
}

async function grabDataByTypeIndex(name: string) {
  console.log(`爬取类型: ${name}`)
  const body = await page.$eval('#dbtable', (el: any) => el.outerHTML);
  await grabCurrentPage(name, body);
}

/**
 * 提取数据并入库
 * @param {*} content 
 */
async function grabCurrentPage(type: string, content: string) {
  const list: any[] = [];
  const $ = cheerio.load(content);

  $('tbody tr').each((i: any, el: any) => {
    list.push({
      date: $(el.children[4]).text(),
      code: $(el.children[2]).text(),
      title: $(el.children[3]).text(),
      type,
      day_grow: formatRatio($(el.children[7]).text()),
      week_grow: formatRatio($(el.children[8]).text()),
      month_grow: formatRatio($(el.children[9]).text()),
      three_month_grow: formatRatio($(el.children[10]).text()),
      six_month_grow: formatRatio($(el.children[11]).text()),
      year_grow: formatRatio($(el.children[12]).text()),
      two_year_grow: formatRatio($(el.children[13]).text())
    });
  });

  const chunks = _.chunk<{
    code: string;
    title: string;
  }>(list, 400);

  for (let i = 0; i < chunks.length; i++) {
    console.log(chunks.length, i);
    const dbList = await dataSource.getRepository(Funder).find({
      where: {
        code: In(chunks[i].map(it => it.code))
      }
    });
    const insertList = chunks[i].filter((it) => {
      return !dbList.find((o) => o.code === it.code)
    })
    console.log(`insertList`, insertList)
    if (insertList.length) {
      await dataSource.getRepository(Funder).save(insertList);
    }
  }
}

function formatRatio(str: string) {
  return +(str.replace('%', ''))
}