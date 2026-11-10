import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Honeypot Protection: components/NewsletterForm.js must include hp_website honeypot input', async () => {
  const formPath = path.resolve('components/NewsletterForm.js');
  assert.equal(fs.existsSync(formPath), true, 'components/NewsletterForm.js must exist');

  const content = fs.readFileSync(formPath, 'utf8');
  assert.equal(content.includes('hpWebsite') || content.includes('hp_website'), true, 'Must define hp_website state/prop');
  assert.equal(content.includes('name="hp_website"'), true, 'Must render hidden input with name="hp_website"');
});

test('Honeypot Protection: app/api/newsletter/route.ts must silently drop bot submissions', async () => {
  const routePath = path.resolve('app/api/newsletter/route.ts');
  assert.equal(fs.existsSync(routePath), true, 'app/api/newsletter/route.ts must exist');

  const content = fs.readFileSync(routePath, 'utf8');
  assert.equal(content.includes('hp_website'), true, 'Schema must accept hp_website');
  assert.equal(
    content.includes('hp_website.trim().length > 0'),
    true,
    'Must check if hp_website is non-empty and trap bot'
  );
});
