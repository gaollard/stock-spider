## 股票被基金持有家数排名

> 1

```sql
select stock_code, stock_name, count(`fund_code`) as cnt
from `t_funder_stock_record`
group by `stock_code`
order by cnt desc;
```

> 2

```sql
select
	t1.stock_code,
	t1.stock_name,
	t2.`总市值` as `总市值`,
	t2.`总市值` as `总市值`,
	count(t1.fund_code) as cnt
from
	`t_funder_stock_record` as t1
left join
	`t_stock_day` as t2
on
	t1.`stock_code` = t2.`stock_code`
where
	t2.`总市值` > 200 and t2.`总市值` < 800
group by `stock_code`
order by cnt desc;
```

## 股票市值筛选

```sql
select * from `t_stock_day` where `总市值` > 200 and `总市值` < 1000
```

## 股东筛选

## 数据表

- t_funder 全部基金
- t_funder_stock_month 基金月度涨幅
- t_stock 全部股票
- t_stock_day 股票每日涨幅
- t_stock_week 股票5日涨幅
- t_stock_month 股票月度涨幅

## 东方财富数据
- 东方财富基金排行 https://fund.eastmoney.com/data/fundranking.html#tall;c0;r;s1nzf;pn50;ddesc;qsd20230427;qed20240427;qdii;zq;gg;gzbd;gzfs;bbzt;sfbb

## 想法
- 有些基金，他公布的持有股票明明都是跌的，但是他的收益却是正的，明显的换股了，所以他的持仓应该是无效的，需要剔除这部分数据