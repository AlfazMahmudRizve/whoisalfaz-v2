const https = require('https');

const urls = [
  "https://whoisalfaz.me/blog/whatconverts-vs-callrail-attribution/",
  "https://whoisalfaz.me/blog/monday-crm-advanced-lead-scoring/"
];

urls.forEach(url => {
  https.get(url, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      const hasCanonical = body.includes('rel="canonical"');
      const hasH1 = body.includes('<h1');
      console.log(`[URL] ${url}`);
      console.log(`  Status Code: ${res.statusCode}`);
      console.log(`  Has Canonical: ${hasCanonical}`);
      console.log(`  Has H1: ${hasH1}`);
      console.log(`  Body Length: ${body.length} bytes\n`);
    });
  }).on('error', err => {
    console.error(`Error fetching ${url}:`, err.message);
  });
});
