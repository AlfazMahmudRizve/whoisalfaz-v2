import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const PROXY_PATH = path.resolve('proxy.ts');

test('proxy.ts: must exist at repository root', () => {
  assert.equal(fs.existsSync(PROXY_PATH), true, 'proxy.ts must exist at repository root');
});

test('proxy.ts: must define explicit exemptions for /api/agent and /api/mcp routes', () => {
  assert.equal(fs.existsSync(PROXY_PATH), true, 'proxy.ts must exist at repository root');
  const content = fs.readFileSync(PROXY_PATH, 'utf8');

  // Must explicitly reference /api/agent and /api/mcp
  assert.equal(
    content.includes('/api/agent'),
    true,
    'proxy.ts must contain an explicit exemption check for /api/agent routes'
  );

  assert.equal(
    content.includes('/api/mcp'),
    true,
    'proxy.ts must contain an explicit exemption check for /api/mcp routes'
  );
});

test('proxy.ts: must exempt agent routes so AI bots (ClaudeBot, GPTBot, etc.) are NOT blocked with 403', () => {
  assert.equal(fs.existsSync(PROXY_PATH), true, 'proxy.ts must exist at repository root');
  const content = fs.readFileSync(PROXY_PATH, 'utf8');

  // The bot blocking logic must guard against blocking agent routes
  const hasAgentExemptionLogic =
    content.includes('isAgent') ||
    content.includes('AGENT_ENDPOINTS') ||
    content.includes('AGENT_ROUTES') ||
    (/isBlockedBot\s*&&\s*!/.test(content)) ||
    (content.includes('/api/agent') && content.includes('/api/mcp') && content.includes('isBlockedBot'));

  assert.equal(
    hasAgentExemptionLogic,
    true,
    'proxy.ts must ensure AI agent bots targeting /api/agent or /api/mcp bypass the 403 Access Denied block'
  );
});

test('proxy.ts: must preserve bot shielding for content, marketing, and non-agent routes', () => {
  assert.equal(fs.existsSync(PROXY_PATH), true, 'proxy.ts must exist at repository root');
  const content = fs.readFileSync(PROXY_PATH, 'utf8');

  // Must maintain BLOCKED_BOTS list
  assert.equal(content.includes('BLOCKED_BOTS'), true, 'Must preserve BLOCKED_BOTS array');
  assert.equal(content.includes('ClaudeBot'), true, 'BLOCKED_BOTS must include ClaudeBot');
  assert.equal(content.includes('GPTBot'), true, 'BLOCKED_BOTS must include GPTBot');
  assert.equal(content.includes('Bytespider'), true, 'BLOCKED_BOTS must include Bytespider');

  // Must still return 403 Access Denied when blocked bots attempt to access standard routes
  assert.equal(
    content.includes('Access Denied') && content.includes('403'),
    true,
    'proxy.ts must continue to drop blocked bots on general website routes with 403 Access Denied'
  );
});
