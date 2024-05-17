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
	`t_stock` as t2
on
	t1.`stock_code` = t2.`stock_code`
where
	t2.`总市值` > 100 and t2.`总市值` < 800 and t2.price > t2.price2 and t2.price > t2.price1 and t2.`股东人数` < 40000 
group by `stock_code`
order by cnt desc;
```

## 股票被基金持有家数排名

```sql
select stock_code, stock_name, count(`fund_code`) as cnt
from `t_funder_stock_record`
group by `stock_code`
order by cnt desc;
```

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
	`t_stock` as t2
on
	t1.`stock_code` = t2.`stock_code`
where
	t2.`总市值` > 200 and t2.`总市值` < 800 and t2.price > t2.price1 
group by `stock_code`
order by cnt desc;
```

## 股票被基金持有家数排名_限制总市值范围

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

## 查看某只股票的机构数

## 股票被基金持有家数排名_限制总市值范围

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

## 股票被基金持有家数排名_排名150-180_限制总市值范围

``` sql
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
order by cnt desc
limit 150, 30;
```

## 股票被基金持有家数排名_排名150-180

``` sql
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
group by `stock_code`
order by cnt desc
limit 150, 30;
```

## 股票市值筛选

```sql
select * from `t_stock_day` where `总市值` > 200 and `总市值` < 1000
```

## 股票连续上涨3日

```sql
select * from `t_stock` as t where t.price > t.price1 and t.price1 > t.price2
```

```sql
select * from `t_stock` as t where t.price > t.price1 and t.price1 > t.price2 and t.`股东人数` < 20000 and t.`总市值` > 200
```

```sql
select
	t.*,
	count(r.fund_code) as cnt
from `t_stock` as t
left join `t_funder_stock_record` as r 
on t.stock_code = r.stock_code

where t.price > t.price1 and t.price1 > t.price2 and t.`股东人数` < 20000 and t.`总市值` > 200
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
- 东方财富个股每日排名 https://quote.eastmoney.com/center/gridlist.html#hs_a_board
- 东方财富主力排名 https://data.eastmoney.com/zjlx/list.html

## 想法
- 有些基金，他公布的持有股票明明都是跌的，但是他的收益却是正的，明显的换股了，所以他的持仓应该是无效的，需要剔除这部分数据


股票开头数字的含义主要取决于股票的交易所和板块，具体如下：12

- 沪市A股。股票代码以600、601或603开头。
- 沪市B股。股票代码以900开头。
- 深市A股。股票代码以00开头。
- 深市B股。股票代码以200开头。
- 中小板。股票代码以002开头。
- 创业板。股票代码以300开头。
- 新三板。股票代码通常以430、830、831开头。
- 科创板。股票代码以688开头。

60 00 300

## 总结

(1) 限制市值是一个重要因子

```
t2.`总市值` > 200 and t2.`总市值` < 800
```

