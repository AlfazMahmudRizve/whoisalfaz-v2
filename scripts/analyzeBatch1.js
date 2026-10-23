const fs = require('fs');

const batch1Slugs = [
  'cometchat-dify-inapp-voice',
  'headless-wordpress-seo-nextjs-guide',
  'dify-ai-vultr-gpu-docker-deployment-guide',
  'apollo-to-brevo-n8n-pipeline-guide',
  'turbotic-automation-governance'
];

batch1Slugs.forEach(slug => {
  const post = JSON.parse(fs.readFileSync(`scratch/batch1_${slug}.json`, 'utf8'));
  console.log(`\n======================================================`);
  console.log(`POST: ${slug}`);
  console.log(`Title: ${post.title}`);
  console.log(`seoTitle: "${post.seoTitle}" (${post.seoTitle?.length} chars)`);
  console.log(`Word Count: ${post.body?.split(/\s+/).length}`);
  
  // Find banned words
  const BANNED = ['delve', 'testament', 'leverage', 'seamless', 'paramount', 'crucial', 'elevate', 'tapestry', 'game-changer', 'revolutionize', 'unlock the power of', 'furthermore', 'moreover', 'beacon', 'vital', 'robust', 'in conclusion'];
  const hits = [];
  post.body.split('\n').forEach((l, i) => {
    BANNED.forEach(b => {
      const re = new RegExp(`\\b${b}\\b`, 'gi');
      if (re.test(l)) {
        hits.push(`Line ${i + 1} [${b}]: ${l.trim().slice(0, 80)}`);
      }
    });
  });
  console.log(`Banned Word Hits (${hits.length}):`);
  hits.forEach(h => console.log(`  ${h}`));
  
  // Code blocks count
  const codeBlocks = (post.body.match(/```[a-z]*[\s\S]*?```/g) || []).length;
  console.log(`Code Blocks: ${codeBlocks}`);
});
