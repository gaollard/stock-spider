"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "120.78.151.117",
    port: 3306,
    username: "stock",
    password: "KcS858ARnaKwKZ3F",
    database: "stock",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
});
;
async function initDb() {
    return exports.dataSource.initialize()
        .then(() => {
        console.log("Data Source has been initialized!");
    })
        .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
}
exports.initDb = initDb;
