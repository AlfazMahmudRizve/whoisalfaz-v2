const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const baseUrl = 'https://whoisalfaz.me';

async function findTechnicalIssues() {
  console.log('🔍 Crawling sitemap to check HTTP statuses, canonicals, and headers...');
  
  // 1. Fetch sitemap.xml
  const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapXml = await sitemapRes.text();
  
  const urlRegex = /<loc>([^<]+)<\/loc>/g;
  const urls = [];
  let m;
  while ((m = urlRegex.exec(sitemapXml)) !== null) {
    urls.push(m[1]);
  }
  console.log(`Found ${urls.length} URLs in sitemap.`);

  // 2. Fetch each URL with HEAD/GET to check status, canonical, security headers
  const issues = {
    redirects: [],
    clientErrors: [],
    canonicalMismatches: [],
    missingSecurityHeaders: [],
    soft404s: []
  };

  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    try {
      const res = await fetch(u, { redirect: 'manual' });
      
      if (res.status >= 300 && res.status < 400) {
        issues.redirects.push({ url: u, status: res.status, location: res.headers.get('location') });
      } else if (res.status >= 400) {
        issues.clientErrors.push({ url: u, status: res.status });
      } else if (res.status === 200) {
        // Check headers
        const secHeaders = [
          'x-frame-options',
          'x-content-type-options',
          'referrer-policy',
          'content-security-policy'
        ];
        const missing = secHeaders.filter(h => !res.headers.has(h));
        if (missing.length > 0) {
          issues.missingSecurityHeaders.push({ url: u, missing });
        }

        // For a sample of pages or suspect pages, check body for soft 404 and canonical
        const text = await res.text();
        const canMatch = text.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
        if (canMatch) {
          const canonical = canMatch[1];
          // normalize trailing slash
          const normU = u.endsWith('/') ? u : u + '/';
          const normCan = canonical.endsWith('/') ? canonical : canonical + '/';
          if (normU !== normCan) {
            issues.canonicalMismatches.push({ url: u, canonical });
          }
        }

        if (text.includes('Page Not Found') || text.includes('404 - Not Found') || text.includes('This page could not be found')) {
          issues.soft404s.push({ url: u });
        }
      }
    } catch (err) {
      console.error(`Error fetching ${u}:`, err.message);
    }
  }

  console.log('\n--- AUDIT RESULTS ---');
  console.log('Redirects (3xx):', issues.redirects.length, issues.redirects);
  console.log('Client Errors (4xx):', issues.clientErrors.length, issues.clientErrors);
  console.log('Canonical Mismatches:', issues.canonicalMismatches.length, issues.canonicalMismatches);
  console.log('Soft 404s:', issues.soft404s.length, issues.soft404s);
  console.log('Missing Security Headers on sitemap URLs:', issues.missingSecurityHeaders.length, issues.missingSecurityHeaders.slice(0, 5));
}

findTechnicalIssues().catch(console.error);
