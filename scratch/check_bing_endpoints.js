const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const apiKey = process.env.BING_API_KEY;
const siteUrl = 'https://whoisalfaz.me';

async function check() {
  const endpoints = [
    'GetRankAndTrafficStats',
    'GetQueryStats',
    'GetFeeds'
  ];

  for (const ep of endpoints) {
    try {
      const url = `https://ssl.bing.com/webmaster/api.svc/json/${ep}?siteUrl=${encodeURIComponent(siteUrl)}&apikey=${apiKey}`;
      const res = await fetch(url);
      console.log(`\n=== ${ep} (Status: ${res.status}) ===`);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (Array.isArray(json.d)) {
          console.log(`Count: ${json.d.length}`);
          console.log('Sample:', JSON.stringify(json.d.slice(-10), null, 2));
        } else {
          console.log('Result:', JSON.stringify(json, null, 2));
        }
      } catch {
        console.log('Raw output:', text.slice(0, 300));
      }
    } catch (err) {
      console.error(`Error ${ep}:`, err.message);
    }
  }
}

check();
