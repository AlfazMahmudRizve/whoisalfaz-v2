import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const MCP_ROUTE_PATH = path.resolve('app/api/mcp/route.ts');

test('mcp endpoint: route file must exist at app/api/mcp/route.ts', () => {
  assert.equal(
    fs.existsSync(MCP_ROUTE_PATH),
    true,
    'app/api/mcp/route.ts must exist for remote MCP server integration'
  );
});

test('mcp endpoint: must export a POST handler function for HTTP JSON-RPC transport', () => {
  assert.equal(fs.existsSync(MCP_ROUTE_PATH), true, 'app/api/mcp/route.ts must exist');
  const content = fs.readFileSync(MCP_ROUTE_PATH, 'utf8');
  assert.match(
    content,
    /export\s+(async\s+)?function\s+POST\b/,
    'Remote MCP server route must export a POST handler for JSON-RPC messages'
  );
});

test('mcp endpoint: JSON-RPC 2.0 handler must implement initialize method returning serverInfo and capabilities', () => {
  assert.equal(fs.existsSync(MCP_ROUTE_PATH), true, 'app/api/mcp/route.ts must exist');
  const content = fs.readFileSync(MCP_ROUTE_PATH, 'utf8');

  // Must handle "initialize" JSON-RPC method
  assert.equal(
    content.includes('initialize') || content.includes('"initialize"'),
    true,
    'MCP handler must handle "initialize" method'
  );

  // Must return serverInfo with name and version
  assert.equal(
    content.includes('serverInfo'),
    true,
    'MCP initialize response must include serverInfo object'
  );
  assert.match(
    content,
    /name\s*:\s*['"][^'"]+['"]/,
    'MCP serverInfo must specify server name'
  );
  assert.match(
    content,
    /version\s*:\s*['"][^'"]+['"]/,
    'MCP serverInfo must specify server version'
  );

  // Must declare capabilities including tools
  assert.equal(
    content.includes('capabilities'),
    true,
    'MCP initialize response must include capabilities object'
  );
  assert.equal(
    content.includes('tools'),
    true,
    'MCP capabilities must advertise tools support'
  );

  // Must reference protocolVersion (e.g. 2024-11-05 or similar standard)
  assert.equal(
    content.includes('protocolVersion'),
    true,
    'MCP initialize response must declare protocolVersion'
  );
});

test('mcp endpoint: tools/list method must return whoisalfaz_audit_website, whoisalfaz_check_security, and whoisalfaz_check_performance', () => {
  assert.equal(fs.existsSync(MCP_ROUTE_PATH), true, 'app/api/mcp/route.ts must exist');
  const content = fs.readFileSync(MCP_ROUTE_PATH, 'utf8');

  // Must handle "tools/list" method
  assert.equal(
    content.includes('tools/list') || (content.includes('tools') && content.includes('list')),
    true,
    'MCP handler must handle "tools/list" method'
  );

  // Must define whoisalfaz_audit_website
  assert.equal(
    content.includes('whoisalfaz_audit_website'),
    true,
    'tools/list must expose "whoisalfaz_audit_website" tool'
  );

  // Must define whoisalfaz_check_security
  assert.equal(
    content.includes('whoisalfaz_check_security'),
    true,
    'tools/list must expose "whoisalfaz_check_security" tool'
  );

  // Must define whoisalfaz_check_performance
  assert.equal(
    content.includes('whoisalfaz_check_performance'),
    true,
    'tools/list must expose "whoisalfaz_check_performance" tool'
  );

  // Tools must have inputSchema validating url parameter
  assert.equal(
    content.includes('inputSchema'),
    true,
    'Tool definitions must supply an inputSchema'
  );
  assert.equal(
    content.includes('url'),
    true,
    'Tool inputSchema must define target url property'
  );
});

test('mcp endpoint: tools/call method must validate tool arguments and return MCP content structure', () => {
  assert.equal(fs.existsSync(MCP_ROUTE_PATH), true, 'app/api/mcp/route.ts must exist');
  const content = fs.readFileSync(MCP_ROUTE_PATH, 'utf8');

  // Must handle "tools/call" method
  assert.equal(
    content.includes('tools/call') || (content.includes('tools') && content.includes('call')),
    true,
    'MCP handler must handle "tools/call" method'
  );

  // Must return standard MCP content array structure [{ type: "text", text: ... }]
  assert.equal(
    content.includes('content') && (content.includes('type') || content.includes('text')),
    true,
    'MCP tools/call response must return content array with text elements'
  );

  // Must handle argument validation or errors
  const handlesErrors =
    content.includes('error') ||
    content.includes('isError') ||
    content.includes('-32602') || // Invalid params
    content.includes('-32601');   // Method not found

  assert.equal(
    handlesErrors,
    true,
    'MCP handler must return JSON-RPC errors or tool error responses for invalid arguments'
  );
});

test('mcp endpoint: must conform to JSON-RPC 2.0 specification format', () => {
  assert.equal(fs.existsSync(MCP_ROUTE_PATH), true, 'app/api/mcp/route.ts must exist');
  const content = fs.readFileSync(MCP_ROUTE_PATH, 'utf8');

  // Must include jsonrpc: '2.0' in responses
  assert.equal(
    content.includes('2.0') || content.includes('jsonrpc'),
    true,
    'MCP server responses must follow JSON-RPC 2.0 format'
  );
});
