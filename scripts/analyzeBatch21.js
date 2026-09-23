const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch21Slugs = [
  'what-is-n8n-and-how-to-set-it-up',
  'what-is-n8n-by-alfaz-mahmud-rizve',
  'automation-operating-system-for-saas',
  'case-study-client-portfolio-delivery',
  'case-study-whoisalfaz-seo-indexing-engine'
];

console.log('=== ANALYZING BATCH 21 POSTS ===\n');

batch21Slugs.forEach(slug => {
  const filePath = `scratch/batch21_${slug}.json`;
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`--------------------------------------------------`);
  console.log(`Slug: ${slug}`);
  console.log(`Title: ${post.title}`);
  console.log(`seoTitle (${post.seoTitle?.length || 0}c): "${post.seoTitle}"`);
  console.log(`seoDescription (${post.seoDescription?.length || 0}c): "${post.seoDescription}"`);

  const foundBanned = [];
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(`\\b${word.replace(/'/g, "\\'")}\\b`, 'gi');
    const matches = post.body.match(regex);
    if (matches && matches.length > 0) {
      foundBanned.push(`${word} (${matches.length}x)`);
    }
  });
  console.log(`Banned Words: ${foundBanned.length > 0 ? foundBanned.join(', ') : 'None'}`);
  console.log(`Intro Snippet: ${post.body.slice(0, 150).replace(/\n/g, ' ')}...`);
  console.log(`Has Direct Answer: ${post.body.includes('> **Direct Answer')}`);
  console.log(`Has FAQ Section: ${post.body.includes('## Frequently Asked Questions')}`);

  const mcMatches = post.body.match(/https?:\/\/[^\s\)]*manychat[^\s\)]*/gi);
  console.log(`ManyChat URLs: ${mcMatches ? mcMatches.join(', ') : 'None'}`);
  console.log(`Word count: ${post.body.split(/\s+/).filter(Boolean).length}`);
  console.log(`--------------------------------------------------\n`);
});
