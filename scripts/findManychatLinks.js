const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function run() {
  console.log('=== 1. SEARCHING CODEBASE FOR MANYCHAT / 404 LINKS ===\n');

  function scanDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (['node_modules', '.git', '.next', 'scratch'].includes(f)) continue;
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        scanDir(full, fileList);
      } else if (/\.(js|jsx|ts|tsx|json|md)$/.test(f)) {
        fileList.push(full);
      }
    }
    return fileList;
  }

  const allFiles = scanDir('.');
  console.log(`Scanning ${allFiles.length} files in repository...`);

  const codeHits = [];
  for (const f of allFiles) {
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((l, i) => {
      if (/manychat\.partnerlinks\.io|\/go\/manychat|partnerstack.*manychat|claim-manychat-bonus|igsummit\.manychat\.com/i.test(l)) {
        codeHits.push({ file: f, line: i + 1, text: l.trim() });
      }
    });
  }

  console.log(`Found ${codeHits.length} occurrences in repository code:`);
  codeHits.forEach(h => console.log(`  ${h.file}:${h.line} -> ${h.text}`));

  console.log('\n=== 2. SEARCHING SANITY CMS POSTS FOR MANYCHAT AFFILIATE / 404 LINKS ===\n');
  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    "slug": slug.current,
    body,
    affiliates
  }`);

  console.log(`Scanning ${posts.length} Sanity posts...`);
  const postHits = [];

  for (const p of posts) {
    const body = p.body || '';
    const lines = body.split('\n');
    const hitsInPost = [];

    lines.forEach((l, i) => {
      if (/manychat\.partnerlinks\.io|\/go\/manychat|claim-manychat-bonus|igsummit\.manychat\.com|manychat\.pxf\.io/i.test(l)) {
        hitsInPost.push({ line: i + 1, text: l.trim() });
      }
    });

    const hasAffiliate = Array.isArray(p.affiliates) && p.affiliates.includes('manychat');

    if (hitsInPost.length > 0 || hasAffiliate) {
      postHits.push({
        _id: p._id,
        slug: p.slug,
        title: p.title,
        hasAffiliate,
        hits: hitsInPost
      });
    }
  }

  console.log(`Found ${postHits.length} posts in Sanity with ManyChat affiliate/redirect links:`);
  postHits.forEach(p => {
    console.log(`\nPost: [${p.slug}] (ID: ${p._id})`);
    if (p.hasAffiliate) console.log(`  - Has 'manychat' in affiliates array`);
    p.hits.forEach(h => console.log(`  - L${h.line}: ${h.text}`));
  });

  fs.writeFileSync('scratch/manychat_links_audit.json', JSON.stringify({ codeHits, postHits }, null, 2));
}

run().catch(console.error);
