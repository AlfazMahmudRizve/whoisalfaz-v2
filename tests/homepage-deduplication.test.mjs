import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Architecture: app/demo/AwwwardsHomepage.tsx must not duplicate ProductionHomepage.tsx', async () => {
  const awwwardsPath = path.resolve('app/demo/AwwwardsHomepage.tsx');
  assert.equal(fs.existsSync(awwwardsPath), true, 'app/demo/AwwwardsHomepage.tsx must exist');

  const content = fs.readFileSync(awwwardsPath, 'utf8');
  const lineCount = content.split('\n').length;

  // Must NOT be a 1900+ line monolith clone
  assert.ok(
    lineCount < 20,
    `app/demo/AwwwardsHomepage.tsx must be a clean lightweight re-export (< 20 lines), but has ${lineCount} lines`
  );

  // Must re-export ProductionHomepage
  assert.equal(
    content.includes('ProductionHomepage'),
    true,
    'app/demo/AwwwardsHomepage.tsx must re-export ProductionHomepage'
  );
});
