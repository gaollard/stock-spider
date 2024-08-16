"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryMetric = void 0;
const _01___3___1 = require("./01_\u8FDE\u7EED3\u65E5\u4E0A\u6DA8");
async function queryMetric() {
    const data = await await (0, _01___3___1.query_01_连续3日上涨)();
    console.log(data);
}
exports.queryMetric = queryMetric;
