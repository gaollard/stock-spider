"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_1 = require("./db");
const task_1 = require("./task");
const schedule = require('node-schedule');
const job = schedule.scheduleJob('0 0 22 * * *', function () {
    console.log('The answer to life, the universe, and everything!');
    (0, task_1.run_task)();
});
(0, db_1.initDb)().then(async () => {
    console.log('started');
    // crawlerFunderList()
    // queryMetric()
});
