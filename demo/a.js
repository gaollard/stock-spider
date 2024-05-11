const htmlContent = 'Redirecting to <a href="//quote.eastmoney.com/sz300215.html">//quote.eastmoney.com/sz300215.html</a>.';
const regex = /<a[^>]+href=["']([^"']+)["']/i;
const match = htmlContent.match(regex);
 
if (match) {
    console.log(match[1]); // 输出: https://example.com
}