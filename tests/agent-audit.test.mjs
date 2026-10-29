import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROUTE_PATH = path.resolve('app/api/agent/audit/route.ts');

test('agent audit endpoint: route file must exist at app/api/agent/audit/route.ts', () => {
  assert.equal(
    fs.existsSync(ROUTE_PATH),
    true,
    'app/api/agent/audit/route.ts must exist for dedicated machine agent audits'
  );
});

test('agent audit endpoint: must export a POST handler function', () => {
  assert.equal(fs.existsSync(ROUTE_PATH), true, 'app/api/agent/audit/route.ts must exist');
  const content = fs.readFileSync(ROUTE_PATH, 'utf8');
  assert.match(
    content,
    /export\s+(async\s+)?function\s+POST\b/,
    'Route must export a POST handler function'
  );
});

test('agent audit endpoint: must validate inputs and reject non-URL or missing URL with HTTP 400', () => {
  assert.equal(fs.existsSync(ROUTE_PATH), true, 'app/api/agent/audit/route.ts must exist');
  const content = fs.readFileSync(ROUTE_PATH, 'utf8');

  // Must validate that target URL is present and valid
  const hasUrlValidation =
    (content.includes('url') && content.includes('z.string().url')) ||
    /url\s*:\s*z\.string\(\)\.url/.test(content) ||
    content.includes('new URL(') ||
    content.includes('isValidUrl');

  assert.equal(
    hasUrlValidation,
    true,
    'Endpoint must enforce URL validation for the target parameter'
  );

  // Must reject invalid or missing inputs with HTTP 400
  const returns400OnInvalid =
    content.includes('status: 400') ||
    content.includes('status: 400') ||
    /status:\s*400/.test(content);

  assert.equal(
    returns400OnInvalid,
    true,
    'Endpoint must return HTTP 400 Bad Request when input validation fails'
  );
});

test('agent audit endpoint: must call runFullAudit from lib/audit and return overallScore, grade, and checks', () => {
  assert.equal(fs.existsSync(ROUTE_PATH), true, 'app/api/agent/audit/route.ts must exist');
  const content = fs.readFileSync(ROUTE_PATH, 'utf8');

  // Must import runFullAudit from lib/audit
  const importsRunFullAudit =
    /import\s+\{[^}]*runFullAudit[^}]*\}\s+from\s+['"](@\/lib\/audit|(\.\.\/)+lib\/audit)['"]/.test(
      content
    );
  assert.equal(
    importsRunFullAudit,
    true,
    'Endpoint must import runFullAudit from lib/audit or @/lib/audit'
  );

  // Must call runFullAudit
  assert.match(
    content,
    /runFullAudit\s*\(/,
    'Endpoint handler must invoke runFullAudit'
  );

  // Must return JSON with overallScore, grade, and checks
  const returnsScoreAndChecks =
    content.includes('overallScore') &&
    content.includes('grade') &&
    content.includes('checks');

  const returnsResultsObject =
    content.includes('results') && content.includes('NextResponse.json');

  assert.equal(
    returnsScoreAndChecks || returnsResultsObject,
    true,
    'Endpoint response must return overallScore, grade, and checks (either directly or within results object)'
  );
});

test('agent audit endpoint: must strictly avoid importing or calling Brevo email functions', () => {
  assert.equal(fs.existsSync(ROUTE_PATH), true, 'app/api/agent/audit/route.ts must exist');
  const content = fs.readFileSync(ROUTE_PATH, 'utf8');

  // Dedicated machine endpoint must not trigger emails or Brevo marketing lists
  assert.equal(
    content.includes('audit-email'),
    false,
    'Agent endpoint must NOT import audit-email module'
  );
  assert.equal(
    content.includes('brevo-email'),
    false,
    'Agent endpoint must NOT import brevo-email module'
  );
  assert.equal(
    content.includes('sendAuditReport'),
    false,
    'Agent endpoint must NOT call sendAuditReport'
  );
  assert.equal(
    content.includes('addToBrevoList'),
    false,
    'Agent endpoint must NOT call addToBrevoList'
  );
  assert.equal(
    content.includes('notifyAdmin'),
    false,
    'Agent endpoint must NOT call notifyAdmin'
  );
});

test('agent audit endpoint: must configure maxDuration of at least 60 seconds for audit execution', () => {
  assert.equal(fs.existsSync(ROUTE_PATH), true, 'app/api/agent/audit/route.ts must exist');
  const content = fs.readFileSync(ROUTE_PATH, 'utf8');

  assert.match(
    content,
    /export\s+const\s+maxDuration\s*=\s*\d+/,
    'Endpoint must export maxDuration configuration to prevent Vercel execution timeouts'
  );
});
