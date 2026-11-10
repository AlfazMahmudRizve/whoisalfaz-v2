import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Email Sanitization: lib/utils.ts must export escapeHtml function', async () => {
  const utilsPath = path.resolve('lib/utils.ts');
  assert.equal(fs.existsSync(utilsPath), true, 'lib/utils.ts must exist');

  const content = fs.readFileSync(utilsPath, 'utf8');
  assert.equal(
    content.includes('export function escapeHtml'),
    true,
    'lib/utils.ts must export escapeHtml function'
  );
});

test('Email Sanitization: lib/brevo-email.ts must sanitize user inputs in email templates', async () => {
  const brevoPath = path.resolve('lib/brevo-email.ts');
  assert.equal(fs.existsSync(brevoPath), true, 'lib/brevo-email.ts must exist');

  const content = fs.readFileSync(brevoPath, 'utf8');
  assert.equal(
    content.includes('escapeHtml'),
    true,
    'lib/brevo-email.ts must sanitize name, service, and message using escapeHtml'
  );
});

test('Email Sanitization: app/api/claim-bonus/route.js must sanitize user inputs in email templates', async () => {
  const claimPath = path.resolve('app/api/claim-bonus/route.js');
  assert.equal(fs.existsSync(claimPath), true, 'app/api/claim-bonus/route.js must exist');

  const content = fs.readFileSync(claimPath, 'utf8');
  assert.equal(
    content.includes('escapeHtml'),
    true,
    'app/api/claim-bonus/route.js must sanitize user name/inputs using escapeHtml'
  );
});
