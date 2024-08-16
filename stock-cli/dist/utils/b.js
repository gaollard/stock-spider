"use strict";
// import fs from 'fs'
// import * as cheerio from 'cheerio';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const content = fs.readFileSync('./a.html', 'utf-8');
// const $ = cheerio.load(content);
// $('.box table').each((i: any, el: any) => {
//   if (i === 0) {
//     $(el).find("tr").each((j: any, el) => {
//       if (j < 30) {
//         const item = {
//           code: $(el.children[1]).text(),
//           title: $(el.children[2]).text(),
//           ratio: $(el.children[6]).text(),
//           count: $(el.children[7]).text(),
//           money: ($(el.children[8]).text() || '0').replaceAll(',', ''),
//         }
//         console.log(j, item)
//       }
//     })
//   }
// })
const dayjs_1 = __importDefault(require("dayjs"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
console.log((0, dayjs_1.default)().format("d"));
