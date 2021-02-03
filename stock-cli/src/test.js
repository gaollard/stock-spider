const path = require('path');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const FundModel = require('./model/fund');

startRun();

const sleep = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 8000)
  })
}

let page = null;

/**
 * 通过ajax获取基金排行
 */
async function startRun() {
  const browser = await puppeteer.launch({ headless: false })
  page = await browser.newPage()

  // 进入首页
  await page.goto('http://fund.eastmoney.com/data/fundranking.html?spm=100015.lw.2#tgp;c0;r;s6yzf;pn50;ddesc;qsd20200202;qed20210202;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb')
  await sleep(10000);

  // 获取基金类型
  const typesHTML = await page.$eval('#types', el => el.outerHTML);
  const $ = cheerio.load(typesHTML);
  const types = [];
  $('li').each((i, el) => {
    if (i !== 0 && i !== 6) {
      types.push({
        index: i,
        name: $(el).text().split('(')[0]
      });
    }
  });

  for(let index = 1; index < types.length; index++) {
    await grabDataByTypeIndex(types[index].index, types[index].name);
  }
}

async function grabDataByTypeIndex(index, name) {
  console.log(`爬取类型: ${name}`)

  // 跳转到指定类型
  const buttons = await page.$$('#types li');
  await buttons[index].click();

  await sleep();

  // 获取最大的分页数量
  let totalPage = await page.$eval('#pagebar label:nth-child(8)', el => el.innerText);
  totalPage = Number(totalPage);

  const nextPage = async function(index) {
    console.log('  爬取分页:' + index);

    // 设置输入框的值
    const input = await page.$('#pagebar #pnum');
    input.type(`${index}`);

    // 点击搜索按钮
    const button = await page.$('#pagebar .pgo');
    await button.click();

    await sleep(10000)

    const body = await page.$eval('#dbtable', el => el.outerHTML);
    await grabCurrentPage(body, index);
  }

  for(let index = 1; index <= totalPage; index++) {
    await nextPage(index);
  }
}

/**
 * 提取数据并入库
 * @param {*} content 
 */
async function grabCurrentPage(content, index) {
  const list = [];
  const $ = cheerio.load(content);

  $('tbody tr').each((i, el) => {
    list.push({
      date: $(el.children[4]).text(),
      code: $(el.children[2]).text(),
      title: $(el.children[3]).text(),
      day_grow: formatRatio($(el.children[7]).text()),
      week_grow: formatRatio($(el.children[8]).text()),
      month_grow: formatRatio($(el.children[9]).text()),
      three_month_grow: formatRatio($(el.children[10]).text()),
      six_month_grow: formatRatio($(el.children[11]).text()),
      year_grow: formatRatio($(el.children[12]).text()),
      two_year_grow: formatRatio($(el.children[13]).text())
    });
  });

  for(let index = 0; index < list.length; index++) {
    await FundModel.create(list[index]);
  }
}

function formatRatio(str) {
  return +(str.replace('%', ''))
}