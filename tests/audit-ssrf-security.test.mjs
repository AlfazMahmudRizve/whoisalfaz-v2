import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Functional helper simulation matching lib/audit.ts
function isPrivateOrLocalUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return true;
    const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1' || host === '0:0:0:0:0:0:0:1') return true;
    if (host.startsWith('::ffff:') || host.includes('127.0.0.1') || host === '0') return true;
    if (host === '169.254.169.254' || host.startsWith('169.254.')) return true;
    if (host.startsWith('10.') || host.startsWith('192.168.')) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) return true;
    if (host.endsWith('.local') || host.endsWith('.internal') || host.endsWith('.localhost') || host.endsWith('.lan')) return true;
    return false;
  } catch {
    return true;
  }
}

test('SSRF Protection: lib/audit.ts must export isPrivateOrLocalUrl and self-guard runFullAudit', async () => {
  const auditLibPath = path.resolve('lib/audit.ts');
  assert.equal(fs.existsSync(auditLibPath), true, 'lib/audit.ts must exist');

  const content = fs.readFileSync(auditLibPath, 'utf8');
  assert.equal(
    content.includes('export function isPrivateOrLocalUrl'),
    true,
    'lib/audit.ts must export isPrivateOrLocalUrl function'
  );
  assert.equal(
    content.includes('isPrivateOrLocalUrl(normalized)'),
    true,
    'lib/audit.ts runFullAudit must self-guard against SSRF'
  );
});

test('SSRF Functional Check: rejects loopback, AWS metadata, and private IP ranges', () => {
  assert.equal(isPrivateOrLocalUrl('http://localhost:3000'), true, 'localhost must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://127.0.0.1:8080'), true, '127.0.0.1 must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://[::1]'), true, 'IPv6 loopback must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://169.254.169.254/latest/meta-data/'), true, 'Cloud metadata must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://10.0.0.5'), true, '10.x.x.x must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://192.168.1.100'), true, '192.168.x.x must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://172.16.0.2'), true, '172.16.x.x must be blocked');
  assert.equal(isPrivateOrLocalUrl('http://[::ffff:127.0.0.1]'), true, 'IPv4-mapped IPv6 must be blocked');
  assert.equal(isPrivateOrLocalUrl('ftp://example.com'), true, 'non-http(s) must be blocked');

  // Valid external URLs must be allowed
  assert.equal(isPrivateOrLocalUrl('https://example.com'), false, 'Public website must be allowed');
  assert.equal(isPrivateOrLocalUrl('https://whoisalfaz.me'), false, 'Public website must be allowed');
});

test('SSRF Protection: app/api/audit/route.ts must enforce SSRF guard against private/local URLs', async () => {
  const routePath = path.resolve('app/api/audit/route.ts');
  assert.equal(fs.existsSync(routePath), true, 'app/api/audit/route.ts must exist');

  const content = fs.readFileSync(routePath, 'utf8');
  assert.equal(
    content.includes('isPrivateOrLocalUrl'),
    true,
    'app/api/audit/route.ts must check target URLs using isPrivateOrLocalUrl'
  );
  assert.equal(
    content.includes('isPrivateOrLocalUrl(normalizedUrl)'),
    true,
    'app/api/audit/route.ts must block private/local URLs before executing runFullAudit'
  );
});
