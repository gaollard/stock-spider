function query(page_num: number) {
  const dt = Date.now();
  return fetch(`https://fund.eastmoney.com/Data/Fund_JJJZ_Data.aspx?t=1&lx=1&letter=&gsid=&text=&sort=zdf,desc&page=${page_num},200&dt=${dt}&atfc=&onlySale=0`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-origin",
    "cookie": "qgqp_b_id=85e06bb41788f93f88be62752cbe29fa; websitepoptg_api_time=1711720458883; st_si=25176432857589; ASP.NET_SessionId=l034vzfd25nw1dz1hz4yryqq; st_asi=delete; HAList=ty-0-300124-%u6C47%u5DDD%u6280%u672F%2Cty-0-000628-%u9AD8%u65B0%u53D1%u5C55%2Cty-0-000661-%u957F%u6625%u9AD8%u65B0%2Cty-1-600203-%u798F%u65E5%u7535%u5B50%2Cty-1-688221-%u524D%u6CBF%u751F%u7269-U%2Cty-0-002424-%u8D35%u5DDE%u767E%u7075; _adsame_fullscreen_18503=1; EMFUND0=03-29%2022%3A15%3A03@%23%24%u4E2D%u6D77%u987A%u946B%u7075%u6D3B%u914D%u7F6E%u6DF7%u5408@%23%24002213; EMFUND1=03-29%2022%3A15%3A30@%23%24%u534E%u590F%u6210%u957F%u6DF7%u5408@%23%24000001; EMFUND2=03-29%2022%3A21%3A24@%23%24%u534E%u590F%u963F%u5C14%u6CD5%u7CBE%u9009%u6DF7%u5408A@%23%24011936; EMFUND3=03-29%2023%3A21%3A12@%23%24%u94F6%u6CB3%u6587%u4F53%u5A31%u4E50%u6DF7%u5408C@%23%24015667; EMFUND4=03-29%2023%3A21%3A45@%23%24%u4E1C%u8D22%u6210%u957F%u4F18%u9009%u6DF7%u5408%u53D1%u8D77%u5F0FA@%23%24017981; EMFUND5=03-29%2023%3A21%3A58@%23%24%u8BFA%u5B89%u79EF%u6781%u56DE%u62A5%u6DF7%u5408A@%23%24001706; EMFUND6=03-29%2023%3A22%3A36@%23%24%u62DB%u5546%u6210%u957F%u5148%u5BFC%u80A1%u7968A@%23%24014589; EMFUND7=03-29%2022%3A45%3A58@%23%24%u5609%u5B9E%u7F8E%u56FD%u6210%u957F%u80A1%u7968%u4EBA%u6C11%u5E01@%23%24000043; EMFUND8=03-29%2023%3A06%3A58@%23%24%u4E2D%u52A0%u8F6C%u578B%u52A8%u529B%u6DF7%u5408A@%23%24005775; EMFUND9=03-30 08:53:39@#$%u534E%u5B9D%u5236%u9020%u80A1%u7968@%23%24000866; st_pvi=26377708967691; st_sp=2024-02-25%2021%3A55%3A01; st_inirUrl=https%3A%2F%2Fwww.baidu.com%2Flink; st_sn=38; st_psi=20240330091142122-112200312934-1140569658",
    "Referer": "https://fund.eastmoney.com/jzzzl.html",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": null,
  "method": "GET"
}).then((res) => {
  return (res.text())
})
}

export async function crawlerFunderList () {
  const list = await query(1);
  console.log(list)
}