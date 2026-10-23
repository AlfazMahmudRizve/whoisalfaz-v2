const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.BING_API_KEY;
const siteUrl = 'https://whoisalfaz.me';

async function checkTraffic() {
  try {
    const url = `https://ssl.bing.com/webmaster/api.svc/json/GetQueryTraffic?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('QueryTraffic items count:', (data.d || []).length);
    console.log('Sample QueryTraffic:', JSON.stringify((data.d || []).slice(0, 10), null, 2));
  } catch (err) {
    console.error('QueryTraffic error:', err.message);
  }

  try {
    const url = `https://ssl.bing.com/webmaster/api.svc/json/GetUrlTraffic?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log('UrlTraffic items count:', (data.d || []).length);
    console.log('Sample UrlTraffic:', JSON.stringify((data.d || []).slice(0, 10), null, 2));
  } catch (err) {
    console.error('UrlTraffic error:', err.message);
  }
}

checkTraffic();
