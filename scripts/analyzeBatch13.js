const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch13Slugs = [
  'manychat-n8n-async-timeout-fix',
  'case-study-urban-cafe-foodtech-platform',
  'manychat-to-n8n-integration-lead-scoring',
  'build-personal-ai-assistant',
  'automate-client-reporting-with-n8n'
];

console.log('=== ANALYZING BATCH 13 POSTS ===\n');

batch13Slugs.forEach(slug => {
  const filePath = `scratch/batch13_${slug}.json`;
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

  // Check FAQ
  const hasFaq = post.body.includes('## Frequently Asked Questions');
  console.log(`Has FAQ Section: ${hasFaq}`);
  if (hasFaq) {
    const faqSlice = post.body.slice(post.body.indexOf('## Frequently Asked Questions'), post.body.indexOf('## Frequently Asked Questions') + 400);
    console.log(`FAQ Sample: ${faqSlice.replace(/\n/g, ' ').slice(0, 150)}...`);
  }

  // Check ManyChat links
  const mcMatches = post.body.match(/https?:\/\/[^\s\)]*manychat[^\s\)]*/gi);
  if (mcMatches) {
    console.log(`⚠️ ManyChat URLs found: ${mcMatches.join(', ')}`);
  } else {
    console.log(`✅ Zero ManyChat external URLs found.`);
  }

  console.log(`--------------------------------------------------\n`);
});
