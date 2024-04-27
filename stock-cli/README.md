## 股票被基金持有家数排名

```sql
select stock_code, stock_name, count(`fund_code`) as cnt from `t_funder_stock_month` group by `stock_code` order by cnt desc;
```
## 股票查询

```sql
select * from `t_funder_stock_month` where `stock_title` = "三七互娱"
```

## 数据表

- t_funder 全部基金
- t_funder_stock_month 基金月度涨幅
- t_stock 全部股票
- t_stock_day 股票每日涨幅
- t_stock_week 股票5日涨幅
- t_stock_month 股票月度涨幅

## 东方财富基金排行

https://fund.eastmoney.com/data/fundranking.html#tall;c0;r;s1nzf;pn50;ddesc;qsd20230427;qed20240427;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb