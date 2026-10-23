import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('next.config.ts: must define long-lived edge cache headers for blog routes', () => {
  const content = fs.readFileSync(path.resolve('next.config.ts'), 'utf8');

  // Must have dedicated /blog/:path* header rule with s-maxage >= 604800 (7 days)
  const hasBlogCacheRule = content.includes('/blog/:path*') || content.includes('/blog/:slug*');
  assert.equal(hasBlogCacheRule, true, 'next.config.ts must have a dedicated header rule for /blog/:path*');

  // Must contain s-maxage of at least 604800 (7 days)
  const hasLongEdgeTTL = content.includes('s-maxage=604800') || content.includes('s-maxage=2592000');
  assert.equal(hasLongEdgeTTL, true, 'next.config.ts blog header must specify s-maxage=604800 (7 days) or higher');
});
