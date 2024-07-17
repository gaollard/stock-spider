"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const db_1 = require("./db");
const funder_entity_1 = require("./entity/funder.entity");
const query_funder_list_1 = require("./utils/query_funder_list");
(0, db_1.initDb)().then(async () => {
    const d = await (0, typeorm_1.getConnection)().getRepository(funder_entity_1.Funder).count();
    (0, query_funder_list_1.crawlerFunderList)();
    console.log(d);
});
