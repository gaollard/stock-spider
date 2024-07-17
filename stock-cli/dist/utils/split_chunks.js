"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitArray = void 0;
function splitArray(arr, len) {
    const total = arr.length;
    const result = [];
    for (let i = 0; i < total; i += len) {
        result.push(arr.slice(i, i + len));
    }
    return result;
}
exports.splitArray = splitArray;
