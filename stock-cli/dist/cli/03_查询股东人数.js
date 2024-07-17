"use strict";
// https://emweb.securities.eastmoney.com/pc_hsf10/pages/index.html?type=web&code=SZ002463&color=b#/gdyj
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const stock_entity_1 = require("../entity/stock.entity");
const axios_1 = __importDefault(require("axios"));
const stock_person_entity_1 = require("../entity/stock-person.entity");
const sleep_1 = require("../utils/sleep");
const typeorm_1 = require("typeorm");
const dayjs_1 = __importDefault(require("dayjs"));
const date = (0, dayjs_1.default)().format('YYYY-MM-DD');
run();
async function run() {
    await (0, db_1.initDb)();
    const repo = db_1.dataSource.getRepository(stock_entity_1.Stock);
    const peopleRepo = db_1.dataSource.getRepository(stock_person_entity_1.StockPersonTab);
    let list = await repo.find({ where: [
            {
                used: 1,
                person_update_date: (0, typeorm_1.Not)(date),
            },
            {
                used: 1,
                person_update_date: (0, typeorm_1.IsNull)(),
            }
        ], select: ['address_one', 'address_two', 'stock_code', 'stock_name', 'used'] });
    for (let i = 0; i < list.length; i++) {
        console.log(i);
        const data = list[i];
        const address_two = data.address_two;
        if (address_two) {
            const code = address_two.split('/');
            let sourceCode = code[code.length - 1].replace('.html', '');
            await (0, sleep_1.sleep)(10);
            let list = [];
            if (sourceCode.includes('sz')) {
                sourceCode = sourceCode.replace('sz', '') + '.SZ';
                list = await query_people(sourceCode);
            }
            else if (sourceCode.includes('sh')) {
                sourceCode = sourceCode.replace('sh', '') + '.SH';
                list = await query_people(sourceCode);
            }
            if (list.length) {
                // 更新汇总表
                await repo.update({
                    stock_code: data.stock_code,
                }, {
                    ...list[0],
                    person_update_date: date
                });
                // 更新记录表
                await peopleRepo.delete({
                    stock_code: data.stock_code,
                });
                const records = list.map((it) => {
                    return peopleRepo.create({
                        ...it,
                        stock_code: data.stock_code,
                        stock_name: data.stock_name,
                        date: new Date(),
                        used: data.used
                    });
                });
                await peopleRepo.save(records);
            }
        }
    }
    db_1.dataSource.destroy();
}
// query_people("000511.SZ")
function query_people(sourceCode) {
    // https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_F10_EH_HOLDERNUM&columns=SECUCODE%2CSECURITY_CODE%2CEND_DATE%2CHOLDER_TOTAL_NUM%2CTOTAL_NUM_RATIO%2CAVG_FREE_SHARES%2CAVG_FREESHARES_RATIO%2CHOLD_FOCUS%2CPRICE%2CAVG_HOLD_AMT%2CHOLD_RATIO_TOTAL%2CFREEHOLD_RATIO_TOTAL&quoteColumns=&filter=(SECUCODE%3D%22002616.SZ%22)&pageNumber=1&pageSize=10&sortTypes=-1&sortColumns=END_DATE&source=HSF10&client=PC&v=020948659474490938
    const url = `https://datacenter.eastmoney.com/securities/api/data/v1/get?reportName=RPT_F10_EH_HOLDERNUM&columns=SECUCODE%2CSECURITY_CODE%2CEND_DATE%2CHOLDER_TOTAL_NUM%2CTOTAL_NUM_RATIO%2CAVG_FREE_SHARES%2CAVG_FREESHARES_RATIO%2CHOLD_FOCUS%2CPRICE%2CAVG_HOLD_AMT%2CHOLD_RATIO_TOTAL%2CFREEHOLD_RATIO_TOTAL&quoteColumns=&filter=(SECUCODE%3D%22${sourceCode}%22)&pageNumber=1&pageSize=10&sortTypes=-1&sortColumns=END_DATE&source=HSF10&client=PC&v=020948659474490938`;
    return (0, axios_1.default)({
        url,
        "headers": {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9",
            "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "Referer": "https://emweb.securities.eastmoney.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        method: 'GET'
    }).then((res) => {
        if (res.data.result && res.data.result.data) {
            console.log(`查询股东人数成功-${sourceCode}`);
            let data = res.data.result.data;
            return (data || []).map(({ AVG_FREE_SHARES, HOLDER_TOTAL_NUM, HOLD_RATIO_TOTAL, AVG_HOLD_AMT, FREEHOLD_RATIO_TOTAL, TOTAL_NUM_RATIO, END_DATE }) => {
                return {
                    人均流通股: AVG_FREE_SHARES,
                    股东人数: HOLDER_TOTAL_NUM,
                    人均持仓金额: AVG_HOLD_AMT,
                    十大股东持股合计: HOLD_RATIO_TOTAL,
                    十大流通股东持股合计: FREEHOLD_RATIO_TOTAL,
                    较上期变化: TOTAL_NUM_RATIO,
                    person_end_date: END_DATE
                };
            });
        }
        else {
            console.log(`查询股东人数失败-${sourceCode}`);
            return [];
        }
    });
}
