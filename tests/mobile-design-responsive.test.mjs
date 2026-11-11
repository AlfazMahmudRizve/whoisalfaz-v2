import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Mobile Design: Navbar must enforce mobile hamburger menu', async () => {
  const navbarPath = path.resolve('components/Navbar.tsx');
  assert.equal(fs.existsSync(navbarPath), true, 'components/Navbar.tsx must exist');
  const content = fs.readFileSync(navbarPath, 'utf8');

  // 1. Desktop links must be hidden on mobile/tablet (hidden lg:flex or hidden md:flex)
  assert.equal(
    content.includes('hidden lg:flex') || content.includes('hidden md:flex'),
    true,
    'Desktop navigation links must be hidden on mobile'
  );

  // 2. Mobile hamburger menu button must exist and be visible on mobile (flex lg:hidden or flex md:hidden)
  assert.equal(
    content.includes('lg:hidden') || content.includes('md:hidden'),
    true,
    'Mobile hamburger menu toggle must be present and hidden on desktop'
  );

  // 3. Must contain hamburger icon toggle (Menu from lucide-react)
  assert.equal(
    content.includes('<Menu') || content.includes('Menu size='),
    true,
    'Navbar must render Menu hamburger icon for mobile navigation'
  );
});

test('Mobile Design: Recent Insights blog cards must stack to 1 column on mobile', async () => {
  const hpPath = path.resolve('components/homepage/ProductionHomepage.tsx');
  assert.equal(fs.existsSync(hpPath), true, 'components/homepage/ProductionHomepage.tsx must exist');
  const content = fs.readFileSync(hpPath, 'utf8');

  // Find Recent Insights section and verify its grid definition
  const insightsIndex = content.indexOf('READ ALL INSIGHTS');
  assert.equal(insightsIndex !== -1, true, 'Recent Insights section must exist');
  const snippet = content.slice(insightsIndex, insightsIndex + 500);

  assert.equal(
    snippet.includes('grid-cols-1') || snippet.includes('flex flex-col'),
    true,
    'Recent Insights blog grid must explicitly define grid-cols-1 on mobile'
  );
});

test('Mobile Design: 60 Seconds Timeline must stack vertically on mobile', async () => {
  const hpPath = path.resolve('components/homepage/ProductionHomepage.tsx');
  const content = fs.readFileSync(hpPath, 'utf8');

  // Timeline must use flex-col on mobile or explicit grid-cols-1
  const timelineStacked = content.includes('flex flex-col md:grid') ||
                          content.includes('flex-col md:grid-cols-4') ||
                          content.includes('grid-cols-1 md:grid-cols-4');
  assert.equal(
    timelineStacked,
    true,
    '60 Seconds timeline must be vertically stacked (flex-col or grid-cols-1) on mobile'
  );
});

test('Mobile Design: How We Work With You (WorkflowSteps) must stack to 1 column on mobile', async () => {
  const wfPath = path.resolve('components/WorkflowSteps.js');
  assert.equal(fs.existsSync(wfPath), true, 'components/WorkflowSteps.js must exist');
  const content = fs.readFileSync(wfPath, 'utf8');

  // Must NOT be grid-cols-2 or grid-cols-4 on mobile without grid-cols-1
  const hasSingleColumnMobile = content.includes('grid-cols-1') || content.includes('flex flex-col');
  assert.equal(
    hasSingleColumnMobile,
    true,
    'WorkflowSteps must stack to 1 column on mobile (grid-cols-1 or flex flex-col)'
  );
});

test('Mobile Design: Fixed Audio Pill must have mobile-safe positioning', async () => {
  const hpPath = path.resolve('components/homepage/ProductionHomepage.tsx');
  const content = fs.readFileSync(hpPath, 'utf8');

  // Must use mobile-safe positioning e.g. bottom-4 left-4 sm:bottom-6 sm:left-6
  const hasMobileSafeAudio = content.includes('bottom-4 left-4') || 
                             content.includes('bottom-4 sm:bottom-6');
  assert.equal(
    hasMobileSafeAudio,
    true,
    'Fixed audio pill must use responsive mobile padding to prevent overlapping viewport CTAs'
  );
});
