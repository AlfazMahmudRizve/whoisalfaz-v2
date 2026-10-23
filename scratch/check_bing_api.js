const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.BING_API_KEY;
const siteUrl = 'https://whoisalfaz.me';

async function check() {
  const quotaUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlSubmissionQuota?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const quotaRes = await fetch(quotaUrl);
  const quotaData = await quotaRes.json();
  console.log('Quota Data:', quotaData);

  const crawlUrl = `https://ssl.bing.com/webmaster/api.svc/json/GetCrawlStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const crawlRes = await fetch(crawlUrl);
  const crawlData = await crawlRes.json();
  
  // Find entries around August 2026 (timestamp ~ 1786000000000)
  const items = crawlData.d || [];
  console.log(`Total CrawlStats entries: ${items.length}`);
  
  // Print latest 5 and entries around August
  console.log('\n--- LATEST 5 DAYS ---');
  items.slice(-5).forEach(item => {
    const d = new Date(parseInt(item.Date.replace(/\/Date\((\d+)\)\//, '$1')));
    console.log(`${d.toISOString().slice(0, 10)} | Crawled: ${item.CrawledPages} | InIndex: ${item.InIndex} | 2xx: ${item.Code2xx} | 301: ${item.Code301} | 4xx: ${item.Code4xx} | 5xx: ${item.Code5xx} | CrawlErrors: ${item.CrawlErrors} | AllOther: ${item.AllOtherCodes}`);
  });

  console.log('\n--- AUGUST 2026 ENTRIES ---');
  items.forEach(item => {
    const d = new Date(parseInt(item.Date.replace(/\/Date\((\d+)\)\//, '$1')));
    if (d.toISOString().startsWith('2026-08')) {
      console.log(`${d.toISOString().slice(0, 10)} | Crawled: ${item.CrawledPages} | InIndex: ${item.InIndex} | 2xx: ${item.Code2xx} | 301: ${item.Code301} | 4xx: ${item.Code4xx} | 5xx: ${item.Code5xx} | CrawlErrors: ${item.CrawlErrors} | AllOther: ${item.AllOtherCodes}`);
    }
  });
}

check();
