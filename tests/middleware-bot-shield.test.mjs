import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('proxy.ts: must exist and implement edge bot and probe protection for Next.js 16', async () => {
  const proxyPath = path.resolve('proxy.ts');
  assert.equal(fs.existsSync(proxyPath), true, 'proxy.ts must exist at repository root');

  const content = fs.readFileSync(proxyPath, 'utf8');

  // Verify it exports a proxy function
  assert.equal(content.includes('export async function proxy') || content.includes('export function proxy'), true);

  // Verify it blocks exploit scanner probes before Next.js routing
  assert.equal(content.includes('.php') || content.includes('wp-admin'), true, 'proxy must block common exploit probes');

  // Verify it exempts legitimate search engine crawlers (Google, Bing)
  assert.equal(content.includes('Googlebot') || content.includes('bingbot'), true, 'proxy must allow legitimate search crawlers');
});
