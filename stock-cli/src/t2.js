const path = require("path");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");

const content = fs.readFileSync("./fund.html", "utf-8");
const $ = cheerio.load(content);
const list = []

$("#position_shares").find("tr").each(function(i, el){
  if (i !== 0) {
    let reg = /.*\/(.*).html/g;
    let href = $(el).find("a").attr("href");
    let res = reg.exec(href)

    let item = {}
    $(el).find('td').each(function(k, it) {
      if (k === 0) {
        item.name = $(it).find("a").text()
        item.code = res[1].replace('sz', '')
      }
      if (k === 1) {
        item.share = $(it).html()
      }
      if (k === 2) {
        item.profit = $(it).text()
      }
    })

    list.push(item);
  }
})

console.log(list)
