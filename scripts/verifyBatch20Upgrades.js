const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch20Slugs = [
  'lead-scoring-automation-with-alfaz-mahmud-rizve',
  'capture-n8n-lead-data-from-wordpress-elementor',
  'n8n-debugging-error-handling-basics',
  'essential-n8n-core-nodes-by-alfaz-mahmud-rizve',
  'n8n-workflow-design-best-practices'
];

console.log('=== VERIFYING BATCH 20 UPGRADES ===\n');

let allPassed = true;

batch20Slugs.forEach(slug => {
  const filePath = `scratch/batch20_upgraded_${slug}.json`;
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`--------------------------------------------------`);
  console.log(`Checking: ${slug}`);

  // 1. SEO Title check
  const titleLen = post.seoTitle?.length || 0;
  if (titleLen > 58) {
    console.error(`❌ SEO Title too long (${titleLen}c): "${post.seoTitle}"`);
    allPassed = false;
  } else {
    console.log(`✅ SEO Title (${titleLen}c): "${post.seoTitle}"`);
  }

  // 2. SEO Description check
  const descLen = post.seoDescription?.length || 0;
  if (descLen < 120 || descLen > 165) {
    console.warn(`⚠️ SEO Description length outside ideal range (${descLen}c): "${post.seoDescription}"`);
  } else {
    console.log(`✅ SEO Description (${descLen}c): "${post.seoDescription}"`);
  }

  // 3. Direct Answer check
  if (!post.body.includes('> **Direct Answer:')) {
    console.error(`❌ Missing Direct Answer block!`);
    allPassed = false;
  } else {
    console.log(`✅ Direct Answer block present.`);
  }

  // 4. Banned words check
  const hits = [];
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word.replace(/'/g, "\\'")}\\b`, 'gi');
    const matches = post.body.match(regex);
    if (matches) {
      hits.push(`${word} (${matches.length}x)`);
    }
  });

  if (hits.length > 0) {
    console.error(`❌ Banned words detected: ${hits.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`✅ Zero banned words detected.`);
  }

  // 5. ManyChat dead links check
  const mcMatches = post.body.match(/https?:\/\/[^\s\)]*manychat[^\s\)]*/gi);
  if (mcMatches) {
    console.error(`❌ Dead ManyChat URLs detected: ${mcMatches.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`✅ Zero ManyChat links.`);
  }

  // 6. FAQ check
  if (!post.body.includes('## Frequently Asked Questions')) {
    console.error(`❌ Missing FAQ section!`);
    allPassed = false;
  } else {
    const faqCount = (post.body.match(/###\s+/g) || []).length;
    console.log(`✅ FAQ section present with ${faqCount} questions.`);
  }

  // 7. Word count check
  const words = post.body.split(/\s+/).filter(Boolean).length;
  console.log(`✅ Word count: ${words} words.`);

  console.log(`--------------------------------------------------\n`);
});

if (allPassed) {
  console.log('🎉 ALL BATCH 20 POSTS PASSED AUDIT CRITERIA STRICTLY!\n');
} else {
  console.error('❌ SOME CHECKS FAILED. FIX BEFORE PUBLISHING.\n');
  process.exit(1);
}
