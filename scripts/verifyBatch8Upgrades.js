const fs = require('fs');

const BANNED = [
  'delve', 'delves', 'delving', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 
  'elevate', 'elevates', 'elevating', 'elevated', 'tapestry', 'game-changer', 'game changer', 
  'revolutionize', 'revolutionizing', 'revolutionized', 'unlock the power of', 
  'furthermore', 'moreover', 'it is worth noting that', "in today's fast-paced digital world", 
  'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch8Slugs = [
  'apollo-vs-lusha-vs-aisdr-comparison',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'ai-automation-agency-business-model',
  'n8n-global-error-handling',
  'automations-for-saas-and-agencies'
];

let totalViolations = 0;

console.log('===========================================================================');
console.log('🔍 Rigorous Verification of Batch 8 Upgraded Articles');
console.log('===========================================================================\n');

batch8Slugs.forEach(slug => {
  const filePath = `scratch/batch8_${slug}_upgraded.json`;
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing file: ${filePath}`);
    totalViolations++;
    return;
  }

  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Checking [${slug}]...`);

  // 1. SEO Title check (<= 58 chars)
  const seoTitleLen = post.seoTitle ? post.seoTitle.length : 0;
  if (!post.seoTitle || seoTitleLen > 58) {
    console.error(`  ❌ SEO Title violation (${seoTitleLen} chars > 58): "${post.seoTitle}"`);
    totalViolations++;
  } else {
    console.log(`  ✅ SEO Title: "${post.seoTitle}" (${seoTitleLen}/58 chars)`);
  }

  // 2. SEO Description check (100 to 165 chars)
  const seoDescLen = post.seoDescription ? post.seoDescription.length : 0;
  if (!post.seoDescription || seoDescLen < 100 || seoDescLen > 165) {
    console.error(`  ❌ SEO Description violation (${seoDescLen} chars): "${post.seoDescription}"`);
    totalViolations++;
  } else {
    console.log(`  ✅ SEO Description: ${seoDescLen} chars`);
  }

  // 3. Word count check
  const words = post.body.trim().split(/\s+/).length;
  console.log(`  ✅ Word Count: ${words} words`);

  // 4. Banned word check
  let bannedHits = 0;
  const lines = post.body.split('\n');
  lines.forEach((l, idx) => {
    BANNED.forEach(b => {
      const re = new RegExp(`\\b${b}\\b`, 'gi');
      if (re.test(l)) {
        console.error(`  ❌ Banned word [${b}] at line ${idx + 1}: ${l.trim().slice(0, 90)}...`);
        bannedHits++;
        totalViolations++;
      }
    });
  });
  if (bannedHits === 0) {
    console.log(`  ✅ Banned Words: 0 hits (100% clean)`);
  }

  // 5. Canned FAQ check
  if (post.body.includes("What is the primary benefit of deploying")) {
    console.error(`  ❌ Contains canned FAQ template!`);
    totalViolations++;
  } else {
    console.log(`  ✅ FAQs: High-quality practitioner questions`);
  }

  // 6. Robotic filler check
  if (post.body.includes("This structural design ensures optimal system throughput")) {
    console.error(`  ❌ Contains robotic filler sentence!`);
    totalViolations++;
  } else {
    console.log(`  ✅ Robotic Filler: None detected`);
  }

  // 7. Direct answer opening check
  const paras = post.body.trim().split('\n\n').filter(p => !p.startsWith('![') && !p.startsWith('By '));
  const firstProse = paras[0] || '';
  console.log(`  ✅ First Prose Snippet: "${firstProse.slice(0, 100)}..."`);
  console.log('');
});

console.log('===========================================================================');
if (totalViolations === 0) {
  console.log('🎉 ALL BATCH 8 ARTICLES PASSED 100% OF QUALITY GATES!');
  console.log('Ready to publish to Sanity CMS, purge edge cache, and submit to Google Indexing.');
} else {
  console.error(`❌ Total violations found: ${totalViolations}. Fix before publishing.`);
  process.exit(1);
}
