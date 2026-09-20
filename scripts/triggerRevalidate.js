#!/usr/bin/env node
/**
 * scripts/triggerRevalidate.js
 *
 * Programmatically triggers Next.js On-Demand Revalidation via /api/revalidate.
 *
 * Usage:
 *   node scripts/triggerRevalidate.js --all
 *   node scripts/triggerRevalidate.js /blog/tempmail10min-seo-case-study/
 *   node scripts/triggerRevalidate.js /blog/ /services/ /portfolio/
 *   node scripts/triggerRevalidate.js --local /blog/
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
  const lines = fs.readFileSync(envLocalPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const secret = process.env.REVALIDATION_SECRET;
if (!secret) {
  console.error('❌ Error: REVALIDATION_SECRET is not set in .env.local or environment.');
  process.exit(1);
}

const args = process.argv.slice(2);
const isLocal = args.includes('--local');
const isAll = args.includes('--all');
const filteredArgs = args.filter(a => a !== '--local' && a !== '--all');

const baseUrl = isLocal ? 'http://localhost:3000' : 'https://whoisalfaz.me';
const endpoint = `${baseUrl}/api/revalidate`;

async function main() {
  const body = isAll ? { all: true } : { paths: filteredArgs.length > 0 ? filteredArgs : ['/'] };

  console.log(`📡 Triggering on-demand revalidation at ${endpoint}...`);
  console.log(`📦 Payload:`, JSON.stringify(body, null, 2));

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ Revalidation failed [HTTP ${response.status}]:`, data);
      process.exit(1);
    }

    console.log(`✅ Revalidation succeeded!`);
    console.log(data);
  } catch (err) {
    console.error('❌ Network error during revalidation request:', err.message);
    process.exit(1);
  }
}

main();
