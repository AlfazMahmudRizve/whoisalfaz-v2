#!/usr/bin/env node

const https = require('https');

const targetUrl = process.argv[2];

if (!targetUrl || targetUrl === '--help' || targetUrl === '-h') {
  console.log(`
\x1b[1m\x1b[36mWhoisAlfaz Website & Technical SEO Auditor\x1b[0m
Fast, zero-dependency audit engine for Performance, SSL, DNS, and Security Headers.

\x1b[1mUsage:\x1b[0m
  npx whoisalfaz-audit <url>
  whoisalfaz-audit https://example.com

\x1b[1mInteractive Web Audit:\x1b[0m
  https://whoisalfaz.me/audit/
`);
  process.exit(0);
}

const normalizedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

console.log(`\n🔍 \x1b[36mRunning full technical audit on:\x1b[0m \x1b[1m${normalizedUrl}\x1b[0m`);
console.log(`⏳ Evaluating Core Web Vitals, SSL, DNS, Meta Tags & Security Headers...\n`);

const payload = JSON.stringify({ url: normalizedUrl });

const req = https.request('https://whoisalfaz.me/api/audit/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload),
    'User-Agent': 'WhoisAlfaz-Audit-CLI/1.0'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (data.error) {
        console.error(`\x1b[31m❌ Error:\x1b[0m ${data.error}`);
        process.exit(1);
      }

      const results = data.results || data;

      if (!results || !results.checks) {
        console.error('\x1b[31m❌ Error:\x1b[0m Unable to retrieve audit checks.');
        process.exit(1);
      }

      console.log('=' .repeat(65));
      const gradeColor = results.grade === 'A' ? '\x1b[32m' : results.grade === 'B' ? '\x1b[36m' : '\x1b[33m';
      console.log(`📊 \x1b[1mOVERALL AUDIT SCORE:\x1b[0m ${gradeColor}\x1b[1m${results.overallScore}/100 (Grade ${results.grade})\x1b[0m`);
      console.log('=' .repeat(65));

      results.checks.forEach((check) => {
        const icon = check.status === 'pass' ? '\x1b[32m✔\x1b[0m' : check.status === 'warn' ? '\x1b[33m⚠\x1b[0m' : '\x1b[31m✖\x1b[0m';
        console.log(`\n${icon} \x1b[1m${check.name}\x1b[0m — Score: ${check.score}/100`);
        console.log(`   ${check.summary}`);
      });

      try {
        const shareData = {
          u: results.url,
          o: results.overallScore,
          g: results.grade,
          c: results.checks.map(ch => ({ n: ch.name, s: ch.score, st: ch.status, sm: ch.summary })),
          t: Date.now(),
        };
        const shareHash = Buffer.from(JSON.stringify(shareData))
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=+$/, '');
        console.log('\n' + '=' .repeat(65));
        console.log(`🔗 \x1b[1mView Full Interactive Report:\x1b[0m \x1b[36mhttps://whoisalfaz.me/audit/results/${shareHash}/\x1b[0m`);
      } catch {
        console.log('\n' + '=' .repeat(65));
        console.log(`🔗 \x1b[1mRun unlimited audits at:\x1b[0m \x1b[36mhttps://whoisalfaz.me/audit/\x1b[0m`);
      }

      console.log(`👨‍💻 \x1b[1mEngineered by Alfaz Mahmud Rizve:\x1b[0m \x1b[36mhttps://whoisalfaz.me/\x1b[0m`);
      console.log('=' .repeat(65) + '\n');
    } catch (err) {
      console.error('Failed to parse audit response:', err.message);
    }
  });
});

req.on('error', (err) => {
  console.error('\x1b[31mConnection error:\x1b[0m', err.message);
});

req.write(payload);
req.end();
