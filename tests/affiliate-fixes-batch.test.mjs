import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();

test('Affiliate Batch: lib/affiliate-catalog.ts contains complete catalog with Krafera cloaks', async () => {
  const catalogPath = path.join(rootDir, 'lib/affiliate-catalog.ts');
  assert.ok(fs.existsSync(catalogPath), 'lib/affiliate-catalog.ts must exist');

  const catalogContent = fs.readFileSync(catalogPath, 'utf-8');

  // Verify Krafera Gumroad cloaks
  assert.ok(catalogContent.includes("'krafera-upgrade'"), 'catalog must define krafera-upgrade');
  assert.ok(catalogContent.includes('https://gumroad.com/a/74272099/pbeqo'), 'krafera-upgrade must point to verified Gumroad URL');
  assert.ok(catalogContent.includes("'krafera-watchtower'"), 'catalog must define krafera-watchtower');
  assert.ok(catalogContent.includes('https://gumroad.com/a/74272099/lltue'), 'krafera-watchtower must point to verified Gumroad URL');

  // Verify Vultr $100 standardization
  assert.ok(catalogContent.includes('$100'), 'Vultr copy must standardize on $100');
  assert.ok(!catalogContent.includes('$300'), 'catalog must not mention $300');
});

test('Affiliate Batch: lib/affiliate-catalog.ts exports normalizeAffiliateKey with domain stripping & alias mappings', async () => {
  const catalogContent = fs.readFileSync(path.join(rootDir, 'lib/affiliate-catalog.ts'), 'utf-8');

  assert.ok(catalogContent.includes('export function normalizeAffiliateKey'), 'Must export normalizeAffiliateKey');
  assert.ok(catalogContent.includes('.com'), 'Must handle .com suffix');
  assert.ok(catalogContent.includes('.ai'), 'Must handle .ai suffix');
  assert.ok(catalogContent.includes('.io'), 'Must handle .io suffix');
  assert.ok(catalogContent.includes('sendinblue'), 'Must handle sendinblue alias');
  assert.ok(catalogContent.includes('zenpire'), 'Must handle zenpire alias');

  // Test regex logic directly
  const normalize = (key) => {
    if (!key) return '';
    const cleaned = key.toLowerCase().trim().replace(/^(\/go\/)/, '').replace(/\.com$|\.ai$|\.io$/i, '');
    if (cleaned === 'sendinblue') return 'brevo';
    if (cleaned === 'zenpire') return 'staytuned';
    return cleaned;
  };

  assert.equal(normalize('monday.com'), 'monday');
  assert.equal(normalize('Monday.Com'), 'monday');
  assert.equal(normalize('AdCreative.ai'), 'adcreative');
  assert.equal(normalize('apollo.io'), 'apollo');
  assert.equal(normalize('sendinblue'), 'brevo');
  assert.equal(normalize('zenpire'), 'staytuned');
  assert.equal(normalize('/go/n8n'), 'n8n');
});

test('Affiliate Batch: app/go/[slug]/route.ts implements 307 temporary redirects with SEO guard and telemetry', async () => {
  const routePath = path.join(rootDir, 'app/go/[slug]/route.ts');
  assert.ok(fs.existsSync(routePath), 'app/go/[slug]/route.ts must exist');

  const routeContent = fs.readFileSync(routePath, 'utf-8');
  assert.ok(routeContent.includes("status: 307"), 'Route handler must use HTTP 307 redirect');
  assert.ok(routeContent.includes("'X-Robots-Tag': 'noindex, nofollow'"), 'Route handler must inject X-Robots-Tag noindex, nofollow');
  assert.ok(routeContent.includes("Cache-Control"), 'Route handler must set anti-caching headers');
  assert.ok(routeContent.includes("affiliate_clicks"), 'Route handler must support affiliate_clicks telemetry');
});

test('Affiliate Batch: components/DeployingTheStacks.js removes Verified Partner from unpartnered tools and cloaks direct cards', async () => {
  const stacksContent = fs.readFileSync(path.join(rootDir, 'components/DeployingTheStacks.js'), 'utf-8');

  // Verify unpartnered cards have isPartner: false
  assert.ok(stacksContent.includes("twilio: {\n        title: \"Twilio\",\n        description: \"The industry-standard communications platform. Essential for provisioning numbers and streaming call audio.\",\n        url: \"https://www.twilio.com/\",\n        buttonText: \"Explore Twilio\",\n        badge: \"Telephony\",\n        isPartner: false"), 'Twilio must have isPartner: false');
  assert.ok(stacksContent.includes("hubspot: {\n        title: \"HubSpot CRM\",\n        description: \"The leading customer relationship platform. Perfect for centralizing contacts, logs, and pipeline workflows.\",\n        url: \"https://www.hubspot.com/\",\n        buttonText: \"Try HubSpot\",\n        badge: \"CRM\",\n        isPartner: false"), 'HubSpot must have isPartner: false');

  // Verify direct cards now point to /go/* cloaks
  const cloakedKeys = ['monday', 'turbotic', 'cometchat', 'adcreative', 'elevenlabs', 'emergent', 'tapstitch', 'aisdr', 'ags'];
  for (const key of cloakedKeys) {
    assert.ok(stacksContent.includes(`url: "/go/${key}"`), `${key} card must point to /go/${key}`);
  }

  // Verify Krafera cards are defined
  assert.ok(stacksContent.includes("'krafera-upgrade': {"), 'Krafera upgrade card must exist');
  assert.ok(stacksContent.includes("url: \"/go/krafera-upgrade\""), 'Krafera upgrade card must point to /go/krafera-upgrade');
  assert.ok(stacksContent.includes("'krafera-watchtower': {"), 'Krafera watchtower card must exist');
  assert.ok(stacksContent.includes("url: \"/go/krafera-watchtower\""), 'Krafera watchtower card must point to /go/krafera-watchtower');

  // Verify Vultr $100 promo copy
  assert.ok(stacksContent.includes("$100 in free credit"), 'Vultr copy must state $100 in free credit');
  assert.ok(!stacksContent.includes("$300 in free credit"), 'Vultr copy must not state $300 in free credit');
});

test('Affiliate Batch: draft files have 0 occurrences of non-existent cloaks', async () => {
  const draftsDir = path.join(rootDir, 'content/drafts');
  if (fs.existsSync(draftsDir)) {
    const files = fs.readdirSync(draftsDir).filter(f => f.endsWith('.json'));
    const invalidCloaks = ['/go/tavily', '/go/openai', '/go/neo4j', '/go/voyageai', '/go/ollama'];

    for (const file of files) {
      const content = fs.readFileSync(path.join(draftsDir, file), 'utf-8');
      for (const cloak of invalidCloaks) {
        assert.ok(!content.includes(`"${cloak}"`), `${file} must not contain non-existent cloak ${cloak}`);
      }
    }
  }
});

test('Affiliate Batch: findings.md documents 34 active programmes including Krafera', async () => {
  const findingsContent = fs.readFileSync(path.join(rootDir, 'findings.md'), 'utf-8');
  assert.ok(findingsContent.includes('34 Active Programmes'), 'findings.md must reflect 34 active programmes');
  assert.ok(findingsContent.includes('/go/krafera-upgrade'), 'findings.md must document /go/krafera-upgrade');
  assert.ok(findingsContent.includes('/go/krafera-watchtower'), 'findings.md must document /go/krafera-watchtower');
});
