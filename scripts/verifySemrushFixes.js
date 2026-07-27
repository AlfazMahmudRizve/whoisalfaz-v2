const fs = require('fs');
const path = require('path');
const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

function getWordCount(body) {
  if (!body) return 0;
  if (typeof body === 'string') return body.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(body)) {
    let text = '';
    body.forEach(block => {
      if (block.children) {
        block.children.forEach(c => { text += ' ' + (c.text || ''); });
      }
    });
    return text.split(/\s+/).filter(Boolean).length;
  }
  return 0;
}

async function verifyFixes() {
  console.log("==========================================================================");
  console.log("🔍 VERIFYING ALL SEMRUSH TECHNICAL & CONTENT FIXES");
  console.log("==========================================================================\n");

  // 1. Check abu-testimonial.png asset
  const imgPath = path.resolve(__dirname, '../public/abu-testimonial.png');
  const imgExists = fs.existsSync(imgPath) && fs.statSync(imgPath).size > 0;
  console.log(`[Image Check] /public/abu-testimonial.png exists: ${imgExists ? '✅ PASS' : '❌ FAIL'}`);

  // 2. Check llms.txt & llms-full.txt
  const llmsTxt = fs.readFileSync(path.resolve(__dirname, '../public/llms.txt'), 'utf-8');
  const llmsFullTxt = fs.readFileSync(path.resolve(__dirname, '../public/llms-full.txt'), 'utf-8');
  const hasCluster2Llms = llmsTxt.includes('Cluster #2') && llmsFullTxt.includes('self-hosted-qdrant-cluster-vultr-docker-sop');
  console.log(`[LLMs.txt Check] Cluster #2 included in llms.txt & llms-full.txt: ${hasCluster2Llms ? '✅ PASS' : '❌ FAIL'}`);

  // 3. Check expanded legacy posts in Sanity
  const legacySlugs = [
    "outstanding-ideas-for-b2b-lead-capture",
    "outstanding-ideas-for-b2b-lead-generation",
    "outstanding-ideas-for-saas-mvps",
    "outstanding-ideas-for-youtube-shorts"
  ];

  const legacyPosts = await client.fetch(`*[_type == "post" && slug.current in $slugs]{
    "slug": slug.current,
    title,
    body
  }`, { slugs: legacySlugs });

  console.log("\n[Legacy Posts Word Count Check]:");
  let thinCount = 0;
  legacyPosts.forEach(p => {
    const wc = getWordCount(p.body);
    if (wc < 1500) thinCount++;
    console.log(`  - [${p.slug}] ${wc} words | ${wc >= 1500 ? '✅ PASS (>=1500w)' : '❌ FAIL (<1500w)'}`);
  });

  console.log("\n==========================================================================");
  if (imgExists && hasCluster2Llms && thinCount === 0) {
    console.log("🎉 ALL SEMRUSH TECHNICAL SEO FIXES VERIFIED SUCCESSFULLY!");
  } else {
    console.log("⚠️ SOME VERIFICATION CHECKS FAILED!");
  }
}

verifyFixes();
