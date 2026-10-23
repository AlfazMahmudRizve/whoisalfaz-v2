const fs = require('fs');

const posts = JSON.parse(fs.readFileSync('scratch/all_posts_inventory.json', 'utf8'));

// We want structured batches of ~5 posts each.
// 105 posts / 5 = ~21 batches.
// Let's group them by themes:
// 1. Flagship Benchmarks & High-Traffic Comparison Posts (Top SEO priority)
// 2. n8n Core Architecture & Production Deployments
// 3. RAG, Vector Search & Embeddings
// 4. AI Agents, Voice AI & SDR Automation
// 5. RevOps, Lead Gen & CRM Sync (Apollo, Brevo, ManyChat)
// 6. 30 Days of n8n Series (Days 1 to 30, split into 6 batches of 5)
// 7. Case Studies & Headless CMS Architecture
// 8. Other Specialized Automation Guides

const BATCH_SIZE = 5;
const allBatches = [];

for (let i = 0; i < posts.length; i += BATCH_SIZE) {
  const slice = posts.slice(i, i + BATCH_SIZE);
  allBatches.push({
    batchNumber: Math.floor(i / BATCH_SIZE) + 1,
    posts: slice.map(p => ({
      _id: p._id,
      slug: p.slug,
      title: p.title,
      seoTitle: p.seoTitle,
      category: (p.categories && p.categories[0]) || 'General'
    }))
  });
}

fs.writeFileSync('scratch/content_upgrade_batches.json', JSON.stringify(allBatches, null, 2));

console.log(`Created ${allBatches.length} batches of ~${BATCH_SIZE} posts each.`);
allBatches.forEach(b => {
  console.log(`\nBatch ${b.batchNumber}: (${b.posts.length} posts)`);
  b.posts.forEach(p => console.log(`  - [${p.slug}] ${p.title.slice(0, 50)}...`));
});
