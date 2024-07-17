"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const console_1 = __importDefault(require("console"));
const fs_1 = __importDefault(require("fs"));
const funder_stock_record_entity_1 = require("../../entity/funder-stock-record.entity");
const path_1 = __importDefault(require("path"));
saveToDb();
async function saveToDb() {
    await (0, db_1.initDb)();
    const files = fs_1.default.readdirSync('resource/2024-03-31/funder_stock').filter((it) => it.includes('json'));
    // await dataSource.getRepository(FunderStockMonth).clear()
    for (let i = 0; i < files.length; i++) {
        try {
            console_1.default.log(i, files[i]);
            const data = require(path_1.default.resolve(__dirname, '../../../') + '/resource/2024-03-31/funder_stock/' + files[i]);
            const { stock_code, stock_name, fund_code, fund_name, count, money, ratio, } = data;
            const list = data.map(({ stock_code, stock_name, fund_code, fund_name, count, money, ratio, }) => {
                return {
                    stock_code,
                    stock_name,
                    fund_code,
                    fund_name,
                    ratio,
                    count: (count || '0').replaceAll(',', ''),
                    money: (money || '0').replaceAll(',', ''),
                    term: "2024-03-31"
                };
            });
            if (list.length) {
                const one = await db_1.dataSource.getRepository(funder_stock_record_entity_1.FunderStockMonth).findOne({
                    where: {
                        stock_code: list[0].fund_code
                    }
                });
                if (!one) {
                    await db_1.dataSource.getRepository(funder_stock_record_entity_1.FunderStockMonth).save(list);
                }
            }
        }
        catch (e) {
            console_1.default.log(files[i], e);
        }
    }
}
