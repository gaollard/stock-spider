import { query_01_连续3日上涨 } from './01_连续3日上涨';

export async function queryMetric() {
    const data = await await query_01_连续3日上涨();
    console.log(data);
}