import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Affiliate Sync: next.config.ts must define all 10 new /go/* redirects with permanent status', async () => {
  const configContent = fs.readFileSync(path.join(rootDir, 'next.config.ts'), 'utf-8');

  const requiredRedirects = [
    { slug: 'vistasocial', dest: 'https://join.vistasocial.com/d333w96sai9t' },
    { slug: 'softsync', dest: 'https://affiliate.softsync.ai/f0s8n3dsp6tu' },
    { slug: 'runpod', dest: 'https://get.runpod.io/9jlyvj42j3t7' },
    { slug: 'clickup', dest: 'https://try.web.clickup.com/j02z9h7xns1x' },
    { slug: 'staytuned', dest: 'https://try.zenpire.tech/gwex67j1p4u3' },
    { slug: 'deel', dest: 'https://get.deel.com/fvthdmduwz5d' },
    { slug: 'plansom', dest: 'https://get.plansom.com/yy8i59lv14g4' },
    { slug: 'mindstudio', dest: 'https://get.mindstudio.ai/abhrejep48v7' },
    { slug: 'foxit', dest: 'https://partnerstack.foxit.com/sr8x95o9c32x' },
    { slug: 'callhippo', dest: 'https://join.callhippo.com/hhmmpa4bynwl' },
  ];

  for (const { slug, dest } of requiredRedirects) {
    assert.ok(
      configContent.includes(`'/go/${slug}'`) || configContent.includes(`"/go/${slug}"`),
      `next.config.ts must include redirect route for /go/${slug}`
    );
    assert.ok(
      configContent.includes(dest),
      `next.config.ts must redirect /go/${slug} to ${dest}`
    );
  }
});

test('Affiliate Sync: components/DeployingTheStacks.js must include all 10 new cards with /go/* links', async () => {
  const stacksContent = fs.readFileSync(path.join(rootDir, 'components/DeployingTheStacks.js'), 'utf-8');

  const requiredKeys = [
    'vistasocial',
    'softsync',
    'runpod',
    'clickup',
    'staytuned',
    'deel',
    'plansom',
    'mindstudio',
    'foxit',
    'callhippo',
  ];

  for (const key of requiredKeys) {
    assert.ok(
      stacksContent.includes(`${key}: {`),
      `DeployingTheStacks.js must define affiliate card for key: ${key}`
    );
    assert.ok(
      stacksContent.includes(`url: "/go/${key}"`),
      `DeployingTheStacks.js must point ${key} to /go/${key}`
    );
  }
});

test('Affiliate Sync: components/DeployingTheStacks.js must use /go/* cloaks for n8n, brevo, apollo, and databox', async () => {
  const stacksContent = fs.readFileSync(path.join(rootDir, 'components/DeployingTheStacks.js'), 'utf-8');

  assert.ok(stacksContent.includes('url: "/go/n8n"'), 'n8n card must point to /go/n8n');
  assert.ok(stacksContent.includes('url: "/go/brevo"'), 'brevo card must point to /go/brevo');
  assert.ok(stacksContent.includes('url: "/go/apollo"'), 'apollo card must point to /go/apollo');
  assert.ok(stacksContent.includes('url: "/go/databox"'), 'databox card must point to /go/databox');
});

test('Affiliate Sync: findings.md master inventory must document 31 tools', async () => {
  const findingsContent = fs.readFileSync(path.join(rootDir, 'findings.md'), 'utf-8');
  assert.ok(
    findingsContent.includes('Master Affiliate Inventory (31 Tier-1 Tools)'),
    'findings.md must reflect 31 Tier-1 tools'
  );
  assert.ok(findingsContent.includes('/go/vistasocial'), 'findings.md must include /go/vistasocial');
  assert.ok(findingsContent.includes('/go/runpod'), 'findings.md must include /go/runpod');
});
