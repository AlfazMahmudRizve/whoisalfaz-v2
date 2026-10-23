const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const baseUrl = 'https://whoisalfaz.me';

async function spiderLinks() {
  console.log('🕷️ Spidering internal links starting from homepage and core pages...');

  const queue = [
    `${baseUrl}/`,
    `${baseUrl}/blog/`,
    `${baseUrl}/services/`,
    `${baseUrl}/portfolio/`,
    `${baseUrl}/case-studies/`,
    `${baseUrl}/about/`,
    `${baseUrl}/contact/`,
    `${baseUrl}/store/`,
    `${baseUrl}/labs/`,
    `${baseUrl}/audit/`,
    `${baseUrl}/partners/`
  ];

  const visited = new Set();
  const internalLinks = new Set();
  const linkSources = new Map(); // target -> [sources]

  // Extract links from HTML
  const linkRegex = /href=["'](https:\/\/whoisalfaz\.me[^"']*|\/[^"']*)["']/gi;

  while (queue.length > 0 && visited.size < 60) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);

    try {
      const res = await fetch(current);
      if (!res.ok) continue;
      const html = await res.text();

      let match;
      while ((match = linkRegex.exec(html)) !== null) {
        let raw = match[1];
        // clean hash and query
        const clean = raw.split('#')[0].split('?')[0];
        if (!clean || clean.startsWith('mailto:') || clean.startsWith('tel:')) continue;
        
        let fullUrl = clean.startsWith('http') ? clean : `${baseUrl}${clean.startsWith('/') ? clean : '/' + clean}`;
        // Normalize apex
        fullUrl = fullUrl.replace('http://', 'https://').replace('www.whoisalfaz.me', 'whoisalfaz.me');

        if (!linkSources.has(fullUrl)) {
          linkSources.set(fullUrl, []);
        }
        if (!linkSources.get(fullUrl).includes(current)) {
          linkSources.get(fullUrl).push(current);
        }

        internalLinks.add(fullUrl);
        if (visited.size < 60 && !visited.has(fullUrl) && fullUrl.startsWith(baseUrl) && !fullUrl.includes('/go/') && !fullUrl.includes('/api/')) {
          queue.push(fullUrl);
        }
      }
    } catch (e) {
      console.error('Fetch error:', current, e.message);
    }
  }

  console.log(`Discovered ${internalLinks.size} unique internal URLs referenced across pages.`);

  // Test each discovered internal URL for:
  // 1. 4xx errors
  // 2. 3xx redirects
  // 3. /go/ or robots.txt blocked
  // 4. canonical mismatch
  const redirects = [];
  const errors4xx = [];
  const robotsBlocked = [];
  const canonicalised = [];

  for (const url of internalLinks) {
    if (url.includes('/go/') || url.includes('/api/') || url.includes('/private/')) {
      robotsBlocked.push({ url, sources: linkSources.get(url) });
      continue;
    }

    try {
      const res = await fetch(url, { redirect: 'manual' });
      if (res.status >= 300 && res.status < 400) {
        redirects.push({ url, status: res.status, location: res.headers.get('location'), sources: linkSources.get(url) });
      } else if (res.status >= 400) {
        errors4xx.push({ url, status: res.status, sources: linkSources.get(url) });
      } else if (res.status === 200) {
        const text = await res.text();
        const canMatch = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
        if (canMatch) {
          const canonical = canMatch[1];
          const normU = url.endsWith('/') ? url : url + '/';
          const normCan = canonical.endsWith('/') ? canonical : canonical + '/';
          if (normU !== normCan) {
            canonicalised.push({ url, canonical, sources: linkSources.get(url) });
          }
        }
      }
    } catch (e) {
      console.error('Test error:', url, e.message);
    }
  }

  console.log('\n================ EXACT SPIDER FINDINGS ================');
  console.log(`🔴 Internal 4xx Client Errors (${errors4xx.length}):`);
  console.log(JSON.stringify(errors4xx, null, 2));

  console.log(`\n🟡 Canonicalised URLs (${canonicalised.length}):`);
  console.log(JSON.stringify(canonicalised, null, 2));

  console.log(`\n⚠️ URLs Blocked by Robots.txt with Inlinks (${robotsBlocked.length}):`);
  console.log(JSON.stringify(robotsBlocked.slice(0, 15), null, 2));

  console.log(`\n🔄 Internal Redirects 3xx (${redirects.length}):`);
  console.log(JSON.stringify(redirects.slice(0, 20), null, 2));
}

spiderLinks().catch(console.error);
