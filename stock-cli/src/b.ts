import fs from 'fs'
import * as cheerio from 'cheerio';

const content = fs.readFileSync('./a.html', 'utf-8');

const $ = cheerio.load(content);

$('.box table').each((i: any, el: any) => {
  if (i === 0) {
    $(el).find("tr").each((j: any, el) => {
      if (j < 30) {
        const item = {
          code: $(el.children[1]).text(),
          title: $(el.children[2]).text(),
          ratio: $(el.children[6]).text(),
          count: $(el.children[7]).text(),
          money: ($(el.children[8]).text() || '0').replaceAll(',', ''),
        }
        console.log(j, item)
      }
    })
  }
})