import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('middleware.ts: must exist and implement edge bot and probe protection', async () => {
  const middlewarePath = path.resolve('middleware.ts');
  assert.equal(fs.existsSync(middlewarePath), true, 'middleware.ts must exist at repository root');

  const content = fs.readFileSync(middlewarePath, 'utf8');

  // Verify it exports a middleware function
  assert.equal(content.includes('export function middleware') || content.includes('export async function middleware'), true);

  // Verify it blocks exploit scanner probes before Next.js routing
  assert.equal(content.includes('.php') || content.includes('wp-admin'), true, 'middleware must block common exploit probes');

  // Verify it exempts legitimate search engine crawlers (Google, Bing)
  assert.equal(content.includes('Googlebot') || content.includes('bingbot'), true, 'middleware must allow legitimate search crawlers');
});
