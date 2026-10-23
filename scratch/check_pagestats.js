const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.BING_API_KEY;
const siteUrl = 'https://whoisalfaz.me';

async function checkPageStats() {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/GetPageStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('PageStats count:', (data.d || []).length);
  (data.d || []).forEach(p => {
    console.log(`URL: ${p.Query || p.Url} | Clicks: ${p.Clicks} | Impressions: ${p.Impressions} | AvgPos: ${p.AvgImpressionPosition}`);
  });
}

checkPageStats();
