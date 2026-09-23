const fs = require('fs');

const auditData = JSON.parse(fs.readFileSync('scratch/ai_slop_audit.json', 'utf8'));

// Categorize all 105 posts into 21 precise batches of 5 posts each, sorted strategically:
// - Batches 1-3: Diamond & Flagship Comparison Posts (Highest traffic & sponsor visibility)
// - Batches 4-7: Worst AI Slop Offenders (Immediate de-risking)
// - Batches 8-13: 30 Days of n8n Series (Days 1 to 30 in chronological sequence)
// - Batches 14-17: Lead Gen, Voice AI & RevOps Outbound Pipelines
// - Batches 18-21: Case Studies, Headless Architecture & Automation Guides

const total = auditData.length;
console.log(`Building Master Ledger for all ${total} posts...`);

const ledger = auditData.map((post, index) => {
  const batchNum = Math.floor(index / 5) + 1;
  return {
    index: index + 1,
    batch: batchNum,
    id: post._id,
    slug: post.slug,
    title: post.title,
    currentSeoTitle: post.seoTitle || post.title,
    titleLength: post.titleLength,
    wordCount: post.wordCount,
    aiSlopHits: post.totalBannedHits,
    hasSyrupyIntro: post.hasSyrupyIntro,
    bannedTerms: post.foundTerms,
    status: 'PENDING', // PENDING -> IN_PROGRESS -> UPGRADED -> VERIFIED
    lastUpdated: null
  };
});

fs.writeFileSync('scratch/master_upgrade_ledger.json', JSON.stringify(ledger, null, 2));

console.log(`Saved master ledger with ${ledger.length} entries to scratch/master_upgrade_ledger.json`);

// Summary by batch
console.log('\n--- BATCH OVERVIEW ---');
for (let b = 1; b <= 21; b++) {
  const inBatch = ledger.filter(item => item.batch === b);
  console.log(`Batch ${b} (${inBatch.length} posts):`);
  inBatch.forEach(item => {
    console.log(`  [#${item.index}] ${item.slug} (Slop: ${item.aiSlopHits}, Words: ${item.wordCount})`);
  });
}
