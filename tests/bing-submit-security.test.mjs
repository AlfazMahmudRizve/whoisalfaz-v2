import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('bing-submit security: must strictly require process.env.CRON_SECRET without hardcoded backdoors', async () => {
  const routePath = path.resolve('app/api/bing/submit/route.ts');
  assert.equal(fs.existsSync(routePath), true, 'app/api/bing/submit/route.ts must exist');

  const content = fs.readFileSync(routePath, 'utf8');

  // 1. Must NOT contain the hardcoded secret backdoor string
  assert.equal(
    content.includes('bing_auto_submission_secret_2024'),
    false,
    'SECURITY RISK: Hardcoded secret backdoor "bing_auto_submission_secret_2024" must be completely removed'
  );

  // 2. Must verify that CRON_SECRET is present and non-empty before authenticating
  assert.equal(
    content.includes('process.env.CRON_SECRET'),
    true,
    'Must authenticate against process.env.CRON_SECRET'
  );

  // 3. Must check if CRON_SECRET is configured; if missing, fail closed (401)
  const failsClosedWhenUnset = content.includes('!cronSecret') || 
                               content.includes('!validSecret') || 
                               content.includes('if (!process.env.CRON_SECRET)');
  assert.equal(
    failsClosedWhenUnset,
    true,
    'Must fail closed (reject access) if CRON_SECRET is not configured'
  );
});
