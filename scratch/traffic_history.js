const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.BING_API_KEY;
const siteUrl = 'https://whoisalfaz.me';

async function checkTrafficHistory() {
  const url = `https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const items = data.d || [];
  
  console.log('Days with Impressions > 0:');
  const positive = items.filter(x => x.Impressions > 0);
  positive.forEach(x => {
    const d = new Date(parseInt(x.Date.replace(/\/Date\((\d+)\)\//, '$1')));
    console.log(`${d.toISOString().slice(0, 10)} | Impressions: ${x.Impressions} | Clicks: ${x.Clicks}`);
  });

  console.log(`\nTotal positive days: ${positive.length}`);
  if (positive.length > 0) {
    const first = new Date(parseInt(positive[0].Date.replace(/\/Date\((\d+)\)\//, '$1')));
    const last = new Date(parseInt(positive[positive.length - 1].Date.replace(/\/Date\((\d+)\)\//, '$1')));
    console.log(`Impression active window: ${first.toISOString().slice(0, 10)} to ${last.toISOString().slice(0, 10)}`);
  }
}

checkTrafficHistory();
