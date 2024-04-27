import 'reflect-metadata'
import { getConnection } from "typeorm";
import { initDb } from "./db";
import { Funder } from "./entity/funder.entity";
import { crawlerFunderList } from './utils/query_funder_list';

initDb().then(async () => {
    const d = await getConnection().getRepository(Funder).count();
    crawlerFunderList()
    console.log(d)
})