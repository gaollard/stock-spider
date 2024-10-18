import 'reflect-metadata'
import { initDb } from "./db";
import { Funder } from "./entity/funder.entity";
import { queryMetric } from './query';
import { run_task } from './task';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const schedule = require('node-schedule');

const job = schedule.scheduleJob('0 0 22 * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

function run () {
  const week = dayjs().format("d")
  if (week !== '0' && week !== '6') {
    run_task();
  }
}

console.log('11')

initDb().then(async () => {
  console.log('started')
  // crawlerFunderList()
  // queryMetric()
  run();
})