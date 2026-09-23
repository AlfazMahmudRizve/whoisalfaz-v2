const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch19Slugs = [
  'n8n-production-workflows-by-alfaz-mahmud-rizve',
  'build-an-automated-rank-tracker-tool-with-n8n',
  'automated-content-research-by-alfaz-mahmud-rizve',
  'facebook-lead-ads-automation-by-alfaz-mahmud-rizve',
  'n8n-slack-notifications-by-alfaz-mahmud-rizve'
];

console.log('=== ANALYZING BATCH 19 POSTS ===\n');

batch19Slugs.forEach(slug => {
  const filePath = `scratch/batch19_${slug}.json`;
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`--------------------------------------------------`);
  console.log(`Slug: ${slug}`);
  console.log(`Title: ${post.title}`);
  console.log(`seoTitle (${post.seoTitle?.length || 0}c): "${post.seoTitle}"`);
  console.log(`seoDescription (${post.seoDescription?.length || 0}c): "${post.seoDescription}"`);

  // Check banned words
  const foundBanned = [];
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word.replace(/'/g, "\\'")}\\b`, 'gi');
    const matches = post.body.match(regex);
    if (matches && matches.length > 0) {
      foundBanned.push(`${word} (${matches.length}x)`);
    }
  });
  console.log(`Banned Words: ${foundBanned.length > 0 ? foundBanned.join(', ') : 'None'}`);

  // Check Intro
  const intro = post.body.slice(0, 300).replace(/\n/g, ' ');
  console.log(`Intro Snippet: ${intro.slice(0, 150)}...`);

  // Check Direct Answer
  const hasDirectAnswer = post.body.includes('> **Direct Answer');
  console.log(`Has Direct Answer: ${hasDirectAnswer}`);

  // Check FAQ
  const hasFaq = post.body.includes('## Frequently Asked Questions');
  console.log(`Has FAQ Section: ${hasFaq}`);

  // Check ManyChat links
  const mcMatches = post.body.match(/https?:\/\/[^\s\)]*manychat[^\s\)]*/gi);
  if (mcMatches) {
    console.log(`⚠️ ManyChat URLs: ${mcMatches.join(', ')}`);
  } else {
    console.log(`✅ Zero ManyChat external URLs found.`);
  }

  console.log(`--------------------------------------------------\n`);
});
