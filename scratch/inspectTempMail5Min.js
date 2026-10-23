const https = require('https');

https.get('https://temp-mail10min.online/5-minute-mail', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('H1 on page:', h1Match ? h1Match[1].trim() : 'NONE');

    const titleMatch = data.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    console.log('Title tag:', titleMatch ? titleMatch[1].trim() : 'NONE');

    const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    console.log('Canonical tag:', canonicalMatch ? canonicalMatch[1] : 'NONE');

    const timerMatch = data.match(/id=["']countdown-timer["'][^>]*data-duration=["']([^"']*)["']/i);
    console.log('Timer duration attr:', timerMatch ? timerMatch[1] : 'NONE');

    const leadMatch = data.match(/class=["'][^"']*header-text\s+lead[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    console.log('Lead text:', leadMatch ? leadMatch[1].trim() : 'NONE');
  });
}).on('error', err => console.error(err.message));
