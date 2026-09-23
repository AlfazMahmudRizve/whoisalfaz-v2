const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch12Slugs = [
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'cold-email-machine-apollo-aisdr-brevo',
  'screaming-frog-alternatives-free-seo-audit-tools',
  'revops-automation-stack-saas-2026',
  'aisdr-vs-human-sdr-performance-teardown'
];

console.log('=== ANALYZING BATCH 12 POSTS ===\n');

batch12Slugs.forEach(slug => {
  const filePath = `scratch/batch12_${slug}.json`;
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

  // Check for robotic phrases
  const roboticPhrases = [
    "This structural design ensures optimal system throughput across high-volume enterprise production environments",
    "Implementing this approach eliminates operational bottlenecks and delivers maximum scalability"
  ];
  roboticPhrases.forEach(rp => {
    if (post.body.includes(rp)) {
      console.log(`⚠️ Robotic Phrase Detected: "${rp.slice(0, 40)}..."`);
    }
  });

  console.log(`--------------------------------------------------\n`);
});
