const fs = require('fs');

const batch3Slugs = [
  'headless-wordpress-vs-monolithic',
  'case-study-veloryc-premium-ecommerce',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'n8n-multi-tenant-vector-schema',
  'pinecone-vs-qdrant-vultr-benchmark'
];

const BANNED = [
  'delve', 'testament', 'leverage', 'seamless', 'paramount', 'crucial', 
  'elevate', 'tapestry', 'game-changer', 'revolutionize', 'unlock the power of', 
  'furthermore', 'moreover', 'beacon', 'vital', 'robust', 'in conclusion'
];

batch3Slugs.forEach(slug => {
  const post = JSON.parse(fs.readFileSync(`scratch/batch3_${slug}.json`, 'utf8'));
  console.log(`\n======================================================`);
  console.log(`SLUG: ${slug}`);
  console.log(`Title: ${post.title}`);
  console.log(`seoTitle: "${post.seoTitle}" (${post.seoTitle?.length} chars)`);
  console.log(`seoDescription: "${post.seoDescription}" (${post.seoDescription?.length} chars)`);
  console.log(`Word Count: ${post.body?.split(/\s+/).length}`);
  
  // First paragraph
  const firstPara = post.body.trim().split('\n\n')[0] || '';
  console.log(`First Para: ${firstPara.slice(0, 200)}...`);

  // Banned hits
  const hits = [];
  post.body.split('\n').forEach((l, i) => {
    BANNED.forEach(b => {
      const re = new RegExp(`\\b${b}\\b`, 'gi');
      if (re.test(l)) {
        hits.push(`L${i + 1} [${b}]: ${l.trim().slice(0, 80)}`);
      }
    });
  });
  console.log(`Banned Word Hits (${hits.length}):`);
  hits.forEach(h => console.log(`  ${h}`));

  // Check robotic filler
  const hasRobotic = post.body.includes("This structural design ensures optimal system throughput");
  console.log(`Has Robotic Filler: ${hasRobotic}`);

  // Check canned FAQ
  const hasCannedFaq = post.body.includes("What is the primary benefit of deploying");
  console.log(`Has Canned FAQ: ${hasCannedFaq}`);

  // Check headings
  const headings = post.body.split('\n').filter(l => l.startsWith('#')).slice(0, 10);
  console.log(`First few headings:`);
  headings.forEach(h => console.log(`  ${h}`));
});
