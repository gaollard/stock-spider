import { DataSource, createConnection } from "typeorm";

export let dataSource: DataSource = new  DataSource({
  type: "mysql",
  host: "120.78.151.117",
  port: 3306,
  username: "stock",
  password: "KcS858ARnaKwKZ3F",
  database: "stock",
  synchronize: true,
  logging: false,
  entities: ["src/entity/*.ts"],
});;

export async function initDb () {
  return dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
}