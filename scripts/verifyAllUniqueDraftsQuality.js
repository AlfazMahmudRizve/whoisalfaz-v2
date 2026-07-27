const fs = require('fs');
const path = require('path');

function getShingles(text, n = 5) {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean);
  const shingles = new Set();
  for (let i = 0; i <= words.length - n; i++) {
    shingles.add(words.slice(i, i + n).join(' '));
  }
  return shingles;
}

function jaccardSimilarity(setA, setB) {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return (intersection / union) * 100;
}

async function qualityCheck() {
  console.log("==========================================================================");
  console.log("🔍 RUNNING RIGOROUS 3-LAYER QUALITY CHECK ON ALL 20 BESPOKE DRAFT FILES");
  console.log("==========================================================================");

  const drafts = [];
  let thinCount = 0;
  let tagCount = 0;
  let invalidDateCount = 0;

  for (let idx = 1; idx <= 20; idx++) {
    const numStr = idx.toString().padStart(2, '0');
    const filePath = path.resolve(__dirname, `../draft-unique-${numStr}.json`);

    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing draft file: draft-unique-${numStr}.json`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const bodyText = typeof data.body === 'string' ? data.body : JSON.stringify(data.body);
    const wc = bodyText.split(/\s+/).filter(Boolean).length;
    const desc = data.description || '';
    const hasTag = desc.includes('[BOFU]') || desc.includes('[MOFU]');
    const isValidDate = data.date === "2026-07-26T21:45:00.000Z";

    if (wc < 2000) thinCount++;
    if (hasTag) tagCount++;
    if (!isValidDate) invalidDateCount++;

    drafts.push({
      num: numStr,
      slug: data.slug.current || data.slug,
      title: data.title,
      wordCount: wc,
      shingles: getShingles(bodyText, 5),
      hasTag,
      isValidDate
    });
  }

  console.log("\n--- LAYER 1 & 3: WORD COUNTS, METADATA & DATE VERIFICATION ---");
  drafts.forEach(d => {
    console.log(`[Draft ${d.num}] ${d.slug}`);
    console.log(`  Word Count: ${d.wordCount} words | ${d.wordCount >= 2000 ? '✅ GOOD (>=2000w)' : '❌ THIN (<2000w)'}`);
    console.log(`  Description Tag: ${d.hasTag ? '❌ HAS BRACKET TAG' : '✅ CLEAN'}`);
    console.log(`  Date Validity: ${d.isValidDate ? '✅ VALID DATE' : '❌ INVALID DATE'}`);
  });

  console.log("\n--- LAYER 2: 5-GRAM PAIRWISE JACCARD SIMILARITY & DUPLICATION CHECK ---");
  const highSimPairs = [];
  for (let i = 0; i < drafts.length; i++) {
    for (let j = i + 1; j < drafts.length; j++) {
      const sim = jaccardSimilarity(drafts[i].shingles, drafts[j].shingles);
      if (sim > 15) {
        highSimPairs.push({
          draftA: `draft-unique-${drafts[i].num}.json`,
          draftB: `draft-unique-${drafts[j].num}.json`,
          similarity: sim.toFixed(2) + "%"
        });
      }
    }
  }

  console.log(`Pairwise Comparisons Analyzed: ${(drafts.length * (drafts.length - 1)) / 2}`);
  console.log(`High Similarity Pairs (>15% overlap):`, highSimPairs);

  console.log("\n==========================================================================");
  console.log("📊 FINAL QUALITY AUDIT REPORT:");
  console.log(`- Files Audited: ${drafts.length} / 20`);
  console.log(`- Thin Content Files (<2000 words): ${thinCount} / 20`);
  console.log(`- Files with Bracket Tags: ${tagCount} / 20`);
  console.log(`- Files with Invalid Date: ${invalidDateCount} / 20`);
  console.log(`- Duplicate/Template Pairs (>15% overlap): ${highSimPairs.length} / 190`);
  console.log("==========================================================================");

  if (thinCount === 0 && tagCount === 0 && invalidDateCount === 0 && highSimPairs.length === 0) {
    console.log("\n🎉 ALL 20 BESPOKE DRAFT FILES PASSED 100% OF QUALITY CHECKS!");
  } else {
    console.log("\n⚠️ QUALITY AUDIT FAILED! CORRECTIONS REQUIRED BEFORE PRODUCTION.");
  }
}

qualityCheck();
