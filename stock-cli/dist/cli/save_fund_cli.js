"use strict";
/**
 *  查询所有基金，保存到 db
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = require("../utils/sleep");
const cheerio = __importStar(require("cheerio"));
const puppeteer = __importStar(require("puppeteer"));
const db_1 = require("../db");
const funder_entity_1 = require("../entity/funder.entity");
const _ = __importStar(require("lodash"));
const typeorm_1 = require("typeorm");
startRun();
let page = null;
async function startRun() {
    await (0, db_1.initDb)();
    const browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // 股票类型
    await page.goto('https://fund.eastmoney.com/data/fundranking.html?spm=100015.lw.2#tgp;c0;r;s6yzf;pn10000;ddesc;qsd20200202;qed20210202;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb');
    await (0, sleep_1.sleep)(10000);
    await grabDataByTypeIndex('股票');
    // 混合类型
    await page.goto('https://fund.eastmoney.com/data/fundranking.html?spm=100015.lw.2#thh;c0;r;s6yzf;pn10000;ddesc;qsd20200202;qed20210202;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb');
    await (0, sleep_1.sleep)(10000);
    await grabDataByTypeIndex('混合');
}
async function grabDataByTypeIndex(name) {
    console.log(`爬取类型: ${name}`);
    const body = await page.$eval('#dbtable', (el) => el.outerHTML);
    await grabCurrentPage(name, body);
}
/**
 * 提取数据并入库
 * @param {*} content
 */
async function grabCurrentPage(type, content) {
    const list = [];
    const $ = cheerio.load(content);
    $('tbody tr').each((i, el) => {
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
    const chunks = _.chunk(list, 400);
    for (let i = 0; i < chunks.length; i++) {
        console.log(chunks.length, i);
        const dbList = await db_1.dataSource.getRepository(funder_entity_1.Funder).find({
            where: {
                code: (0, typeorm_1.In)(chunks[i].map(it => it.code))
            }
        });
        const insertList = chunks[i].filter((it) => {
            return !dbList.find((o) => o.code === it.code);
        });
        if (insertList.length) {
            await db_1.dataSource.getRepository(funder_entity_1.Funder).save(insertList);
        }
    }
}
function formatRatio(str) {
    return +(str.replace('%', ''));
}
