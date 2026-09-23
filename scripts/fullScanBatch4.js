const fs = require('fs');

const FULL_BANNED = [
  'delve', 'delves', 'delving', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 
  'elevate', 'elevates', 'elevating', 'elevated', 'tapestry', 'game-changer', 'game changer', 
  'revolutionize', 'revolutionizing', 'revolutionized', 'unlock the power of', 
  'furthermore', 'moreover', 'it is worth noting that', "in today's fast-paced digital world", 
  'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const slugs = [
  'monday-crm-advanced-lead-scoring',
  'trainual-alternatives-active-agency-sop-engine',
  'how-to-audit-competitor-seo-no-verification',
  'n8n-apollo-lead-enrichment-pipeline',
  'automate-personal-branding-with-n8n'
];

slugs.forEach(slug => {
  const p = JSON.parse(fs.readFileSync(`scratch/batch4_${slug}.json`, 'utf8'));
  console.log(`\n=================== ${slug} ===================`);
  console.log(`Current Title: "${p.title}"`);
  console.log(`Current seoTitle: "${p.seoTitle}" (${p.seoTitle?.length} chars)`);
  
  const lines = p.body.replace(/\r\n/g, '\n').split('\n');
  let hitCount = 0;
  lines.forEach((l, i) => {
    FULL_BANNED.forEach(b => {
      const re = new RegExp(`\\b${b}\\b`, 'gi');
      if (re.test(l)) {
        hitCount++;
        console.log(`  L${i+1} [${b}]: ${l.trim().slice(0, 100)}...`);
      }
    });
  });
  console.log(`Total hits: ${hitCount}`);
});
