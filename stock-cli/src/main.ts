import 'reflect-metadata'
import { initDb } from "./db";
import { Funder } from "./entity/funder.entity";
import { queryMetric } from './query';
import { run_task } from './task';

const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 0 22 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
  run_task();
});

initDb().then(async () => {
  console.log('started')
  // crawlerFunderList()
  // queryMetric()
})