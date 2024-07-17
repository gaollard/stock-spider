"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
const sleep = (time = 8000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(undefined);
        }, time);
    });
};
exports.sleep = sleep;
