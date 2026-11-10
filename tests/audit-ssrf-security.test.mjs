import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('SSRF Protection: lib/audit.ts must export isPrivateOrLocalUrl', async () => {
  const auditLibPath = path.resolve('lib/audit.ts');
  assert.equal(fs.existsSync(auditLibPath), true, 'lib/audit.ts must exist');

  const content = fs.readFileSync(auditLibPath, 'utf8');
  assert.equal(
    content.includes('export function isPrivateOrLocalUrl') || content.includes('export const isPrivateOrLocalUrl'),
    true,
    'lib/audit.ts must export isPrivateOrLocalUrl function'
  );
});

test('SSRF Protection: app/api/audit/route.ts must enforce SSRF guard against private/local URLs', async () => {
  const routePath = path.resolve('app/api/audit/route.ts');
  assert.equal(fs.existsSync(routePath), true, 'app/api/audit/route.ts must exist');

  const content = fs.readFileSync(routePath, 'utf8');

  // Must import or use isPrivateOrLocalUrl
  assert.equal(
    content.includes('isPrivateOrLocalUrl'),
    true,
    'app/api/audit/route.ts must check target URLs using isPrivateOrLocalUrl'
  );

  // Must return status 400 when private or local URL is detected
  assert.equal(
    content.includes('isPrivateOrLocalUrl(normalizedUrl)') || content.includes('isPrivateOrLocalUrl(url)'),
    true,
    'app/api/audit/route.ts must block private/local URLs before executing runFullAudit'
  );
});
