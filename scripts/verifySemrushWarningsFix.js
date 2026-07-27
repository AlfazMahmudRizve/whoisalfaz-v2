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

async function verifyWarnings() {
  console.log("==========================================================================");
  console.log("🔍 VERIFYING SEMRUSH WARNINGS REMEDIATION");
  console.log("==========================================================================\n");

  // 1. Check title lengths for Sanity posts
  const posts = await client.fetch(`*[_type == "post"]{
    "slug": slug.current,
    title,
    seoTitle
  }`);

  let longTitleCount = 0;
  posts.forEach(p => {
    const titleToUse = p.seoTitle || p.title || '';
    if (titleToUse.length > 60) {
      longTitleCount++;
      console.log(`  ❌ Long Title (>60c): [${p.slug}] (${titleToUse.length} chars) -> "${titleToUse}"`);
    }
  });

  console.log(`[Title Length Check] Posts with title > 60 chars: ${longTitleCount} | ${longTitleCount === 0 ? '✅ PASS' : '⚠️ WARN'}`);

  // 2. Check Sanity category descriptions
  const categories = await client.fetch(`*[_type == "category"]{
    "slug": slug.current,
    title,
    description
  }`);

  console.log("\n[Category Description Check]:");
  let emptyCatDesc = 0;
  categories.forEach(c => {
    const descLen = c.description ? c.description.split(/\s+/).filter(Boolean).length : 0;
    if (descLen < 30) emptyCatDesc++;
    console.log(`  - Category [${c.slug}] ${descLen} words | ${descLen >= 30 ? '✅ PASS' : '❌ FAIL'}`);
  });

  console.log("\n==========================================================================");
  if (longTitleCount === 0 && emptyCatDesc === 0) {
    console.log("🎉 ALL SEMRUSH WARNINGS VERIFIED & RESOLVED!");
  } else {
    console.log("⚠️ SOME WARNING CHECKS NEED ATTENTION!");
  }
}

verifyWarnings();
