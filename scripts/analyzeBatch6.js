const fs = require('fs');

const FULL_BANNED = [
  'delve', 'delves', 'delving', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 
  'elevate', 'elevates', 'elevating', 'elevated', 'tapestry', 'game-changer', 'game changer', 
  'revolutionize', 'revolutionizing', 'revolutionized', 'unlock the power of', 
  'furthermore', 'moreover', 'it is worth noting that', "in today's fast-paced digital world", 
  'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch6Slugs = [
  'manychat-n8n-whatsapp-voice-bot',
  'lead-enrichment-with-n8n',
  'zero-data-retention-enterprise-rag-vultr-vps',
  'building-an-enterprise-knowledge-graph-rag-n8n',
  'building-multi-tenant-vector-search-n8n-qdrant'
];

batch6Slugs.forEach(slug => {
  const post = JSON.parse(fs.readFileSync(`scratch/batch6_${slug}.json`, 'utf8'));
  console.log(`\n======================================================`);
  console.log(`SLUG: ${slug}`);
  console.log(`Title: ${post.title}`);
  console.log(`seoTitle: "${post.seoTitle}" (${post.seoTitle?.length} chars)`);
  console.log(`seoDescription: "${post.seoDescription}" (${post.seoDescription?.length} chars)`);
  console.log(`Word Count: ${post.body?.split(/\s+/).length}`);
  
  const norm = post.body.replace(/\r\n/g, '\n');
  const paras = norm.trim().split('\n\n');
  console.log(`Para 0: ${paras[0].slice(0, 160)}...`);
  if (paras[1]) console.log(`Para 1: ${paras[1].slice(0, 160)}...`);

  // Banned hits
  const hits = [];
  norm.split('\n').forEach((l, i) => {
    FULL_BANNED.forEach(b => {
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

  // Check Manychat affiliate link
  const hasManychatAffiliate = post.body.includes("partnerlinks.io") || post.body.includes("claim-manychat-bonus");
  console.log(`Has Manychat Affiliate/Bonus Link: ${hasManychatAffiliate}`);
});
