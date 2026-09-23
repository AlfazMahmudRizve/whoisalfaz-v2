const fs = require('fs');

const BANNED_WORDS = [
  'delve', 'testament', 'leverage', 'leveraging', 'leveraged', 'leverages',
  'seamless', 'seamlessly', 'paramount', 'crucial', 'elevate', 'elevates', 'elevating', 'elevated',
  'tapestry', 'game-changer', 'game changer', 'revolutionize', 'revolutionizing', 'revolutionized',
  'unlock the power of', 'furthermore', 'moreover', 'it is worth noting that',
  "in today's fast-paced digital world", 'beacon', 'vital', 'robust', 'in conclusion', 'summary'
];

const batch11Slugs = [
  'vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide',
  'corrective-rag-crag-n8n-blueprint',
  'accelerated-growth-studio-plg-playbook',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'omnichannel-ai-voice-note-handler'
];

console.log('=== VERIFYING BATCH 11 UPGRADES ===\n');

let allPassed = true;

batch11Slugs.forEach((slug, idx) => {
  const filePath = `scratch/batch11_${slug}_upgraded.json`;
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing upgraded file: ${filePath}`);
    allPassed = false;
    return;
  }

  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`[${idx + 1}/5] Verifying: ${slug}`);

  // 1. Title length
  if (!post.seoTitle || post.seoTitle.length > 58) {
    console.error(`  ❌ seoTitle exceeds 58 characters (${post.seoTitle?.length}c): "${post.seoTitle}"`);
    allPassed = false;
  } else {
    console.log(`  ✅ seoTitle: "${post.seoTitle}" (${post.seoTitle.length}c)`);
  }

  // 2. Direct Answer present
  if (!post.body.includes('> **Direct Answer')) {
    console.error(`  ❌ Missing Direct Answer block!`);
    allPassed = false;
  } else {
    console.log(`  ✅ Direct Answer block verified.`);
  }

  // 3. Check Banned Words
  const bodyLower = post.body.toLowerCase();
  const foundBanned = [];
  BANNED_WORDS.forEach(word => {
    // Check with regex word boundary
    const regex = new RegExp(`\\b${word.replace(/'/g, "\\'")}\\b`, 'gi');
    const matches = post.body.match(regex);
    if (matches && matches.length > 0) {
      foundBanned.push(`${word} (${matches.length}x)`);
    }
  });

  if (foundBanned.length > 0) {
    console.error(`  ❌ Found banned words: ${foundBanned.join(', ')}`);
    allPassed = false;
  } else {
    console.log(`  ✅ ZERO banned words detected.`);
  }

  // 4. Check for robotic boilerplate
  const roboticPhrases = [
    "This structural design ensures optimal system throughput across high-volume enterprise production environments",
    "Implementing this approach eliminates operational bottlenecks and delivers maximum scalability"
  ];
  let foundRobotic = false;
  roboticPhrases.forEach(rp => {
    if (post.body.includes(rp)) {
      console.error(`  ❌ Found robotic boilerplate: "${rp.slice(0, 50)}..."`);
      foundRobotic = true;
      allPassed = false;
    }
  });
  if (!foundRobotic) {
    console.log(`  ✅ Zero robotic boilerplate detected.`);
  }

  console.log('');
});

if (allPassed) {
  console.log('🎉 ALL BATCH 11 POSTS PASSED RIGOROUS VERIFICATION!');
} else {
  console.error('❌ Verification failed. Fix issues before publishing.');
  process.exit(1);
}
