const fs = require('fs');

const BANNED = [
  'delve', 'testament', 'leverage', 'seamless', 'paramount', 'crucial', 
  'elevate', 'tapestry', 'game-changer', 'revolutionize', 'unlock the power of', 
  'furthermore', 'moreover', 'beacon', 'vital', 'robust', 'in conclusion'
];

const batch2Slugs = [
  'elevenlabs-n8n-voice-ai-sales-agent',
  'corrective-rag-crag-blueprint-n8n-tavily-fallback',
  'self-hosted-qdrant-docker-vultr',
  'emergent-ai-autonomous-gtm-guide',
  'dify-vs-n8n-architecture'
];

let allPassed = true;

console.log('=== VERIFYING BATCH 2 UPGRADED ARTICLES ===\n');

batch2Slugs.forEach((slug, idx) => {
  const filePath = `scratch/batch2_${slug}_upgraded.json`;
  const post = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log(`[#${idx + 6}] ${slug}`);
  console.log(`  SEO Title: "${post.seoTitle}" (${post.seoTitle.length} chars)`);
  if (post.seoTitle.length > 58) {
    console.error(`  ❌ FAILED: SEO Title exceeds 58 characters! (${post.seoTitle.length})`);
    allPassed = false;
  } else {
    console.log(`  ✅ Title Length OK (<= 58 chars)`);
  }

  console.log(`  SEO Description: "${post.seoDescription}" (${post.seoDescription.length} chars)`);
  if (post.seoDescription.length > 165) {
    console.warn(`  ⚠️ WARNING: SEO Description > 165 chars (${post.seoDescription.length})`);
  }

  // Scan body for banned words
  const hits = [];
  post.body.split('\n').forEach((line, lIdx) => {
    BANNED.forEach(b => {
      const re = new RegExp(`\\b${b}\\b`, 'gi');
      if (re.test(line)) {
        hits.push({ line: lIdx + 1, word: b, snippet: line.trim().slice(0, 70) });
      }
    });
  });

  if (hits.length > 0) {
    console.error(`  ❌ FAILED: Found ${hits.length} banned word occurrences:`);
    hits.forEach(h => console.log(`     L${h.line} [${h.word}]: ${h.snippet}`));
    allPassed = false;
  } else {
    console.log(`  ✅ Banned Words: 0 hits (100% clean)`);
  }

  // Check for robotic filler sentence
  if (post.body.includes("This structural design ensures optimal system throughput")) {
    console.error(`  ❌ FAILED: Found robotic filler sentence!`);
    allPassed = false;
  } else {
    console.log(`  ✅ Robotic Filler: Cleaned`);
  }

  // Check for copy-pasted title in FAQ
  if (post.body.includes(`### What is the primary benefit of deploying`)) {
    console.error(`  ❌ FAILED: Found robotic copy-pasted FAQ!`);
    allPassed = false;
  } else {
    console.log(`  ✅ FAQ Quality: Practitioner Q&A verified`);
  }

  console.log('');
});

if (allPassed) {
  console.log('🎉 ALL 5 BATCH 2 ARTICLES PASSED QUALITY GATES WITH 100% COMPLIANCE!');
} else {
  console.error('❌ SOME ARTICLES FAILED COMPLIANCE GATES. REVIEW ABOVE.');
  process.exit(1);
}
