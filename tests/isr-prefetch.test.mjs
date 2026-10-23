import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

function getLinksWithoutPrefetchFalse(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // Match <Link ... > tags (spanning multiple lines if needed)
  const linkRegex = /<Link\b([^>]*?)>/gs;
  const unconfiguredLinks = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const props = match[1];
    // Check if it's an internal content link (href includes /blog/ or dynamic variable)
    if (props.includes('href=') && (props.includes('/blog') || props.includes('slug') || props.includes('post.'))) {
      if (!props.includes('prefetch={false}')) {
        unconfiguredLinks.push(match[0].replace(/\s+/g, ' ').slice(0, 100));
      }
    }
  }

  return unconfiguredLinks;
}

test('app/blog/page.js: all blog post and category links must have prefetch={false}', () => {
  const file = path.resolve('app/blog/page.js');
  const violations = getLinksWithoutPrefetchFalse(file);
  assert.equal(violations.length, 0, `Found links missing prefetch={false} in app/blog/page.js:\n${violations.join('\n')}`);
});

test('app/blog/category/[slug]/page.js: all category post links must have prefetch={false}', () => {
  const file = path.resolve('app/blog/category/[slug]/page.js');
  const violations = getLinksWithoutPrefetchFalse(file);
  assert.equal(violations.length, 0, `Found links missing prefetch={false} in app/blog/category/[slug]/page.js:\n${violations.join('\n')}`);
});

test('app/blog/30-days-of-n8n/page.js: all series post links must have prefetch={false}', () => {
  const file = path.resolve('app/blog/30-days-of-n8n/page.js');
  const violations = getLinksWithoutPrefetchFalse(file);
  assert.equal(violations.length, 0, `Found links missing prefetch={false} in app/blog/30-days-of-n8n/page.js:\n${violations.join('\n')}`);
});

test('app/blog/[slug]/page.js: all pagination and related post links must have prefetch={false}', () => {
  const file = path.resolve('app/blog/[slug]/page.js');
  const violations = getLinksWithoutPrefetchFalse(file);
  assert.equal(violations.length, 0, `Found links missing prefetch={false} in app/blog/[slug]/page.js:\n${violations.join('\n')}`);
});

test('app/page.js: homepage blog post cards must have prefetch={false}', () => {
  const file = path.resolve('app/page.js');
  const violations = getLinksWithoutPrefetchFalse(file);
  assert.equal(violations.length, 0, `Found links missing prefetch={false} in app/page.js:\n${violations.join('\n')}`);
});
