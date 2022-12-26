const path = require("path");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const FundModel = require("./model/fund");

// 501057
// 汇添富中证新

let stockCode = 501057;
let page = null;

startRun();

async function startRun() {
  const browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();

  await page.goto(`http://fund.eastmoney.com/${stockCode}.html?spm=search`);
  await sleep(3000);

  const body = await page.$eval("#quotationItem_DataTable", (el) => el.outerHTML);
  getStockList(body);
}

function getStockList(body) {
  const $ = cheerio.load(body);
  const list = [];

  $("#position_shares")
    .find("tr")
    .each(function (i, el) {
      if (i !== 0) {
        let reg = /.*\/(.*).html/g;
        let href = $(el).find("a").attr("href");
        let res = reg.exec(href);

        let item = {};
        $(el)
          .find("td")
          .each(function (k, it) {
            if (k === 0) {
              item.name = $(it).find("a").text();
              item.code = res[1].replace("sz", "");
            }
            if (k === 1) {
              item.share = $(it).html();
            }
            if (k === 2) {
              item.profit = $(it).text();
            }
          });

        list.push(item);
      }
    });

  console.log(list);
}

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
