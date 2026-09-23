const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

const BANNED_TERMS = [
  'delve',
  'testament',
  'leverage',
  'seamless',
  'paramount',
  'crucial',
  'elevate',
  'in the realm of',
  'tapestry',
  'game-changer',
  'revolutionize',
  'unlock the power of',
  'furthermore',
  'moreover',
  'it is worth noting that',
  'in today\'s fast-paced',
  'fast-paced digital',
  'beacon',
  'vital',
  'robust',
  'in conclusion',
  'wrapping up'
];

async function run() {
  const query = `*[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    date,
    "categories": categories[]->name
  }`;

  const posts = await client.fetch(query);
  console.log(`Auditing ${posts.length} posts for AI patterns...`);

  const results = [];

  for (const post of posts) {
    const body = post.body || '';
    const bodyLower = body.toLowerCase();
    
    // Count banned terms
    const foundTerms = {};
    let totalBannedHits = 0;
    for (const term of BANNED_TERMS) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      const matches = body.match(regex);
      if (matches && matches.length > 0) {
        foundTerms[term] = matches.length;
        totalBannedHits += matches.length;
      }
    }

    // Check intro paragraph for syrupy AI phrases
    const firstParagraph = body.split('\n\n')[0] || '';
    const hasSyrupyIntro = /in today|landscape|fast-paced|businesses face|rapidly evolving|crucial role/i.test(firstParagraph);

    // Title length check
    const effectiveTitle = post.seoTitle || post.title || '';
    const titleLength = effectiveTitle.length;

    // Word count approx
    const wordCount = body.trim().split(/\s+/).filter(Boolean).length;

    results.push({
      _id: post._id,
      slug: post.slug,
      title: post.title,
      seoTitle: post.seoTitle || null,
      titleLength,
      titleOverLimit: titleLength > 58,
      wordCount,
      totalBannedHits,
      foundTerms,
      hasSyrupyIntro,
      category: (post.categories && post.categories[0]) || 'Uncategorized',
      date: post.date
    });
  }

  // Sort by total banned hits descending (worst offenders first)
  results.sort((a, b) => b.totalBannedHits - a.totalBannedHits);

  const fs = require('fs');
  fs.writeFileSync('scratch/ai_slop_audit.json', JSON.stringify(results, null, 2));

  console.log('\n--- TOP 15 WORST AI SLOP OFFENDERS ---');
  results.slice(0, 15).forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.slug}] (Hits: ${r.totalBannedHits}, Words: ${r.wordCount}, TitleLen: ${r.titleLength})`);
    console.log(`   Top Terms: ${JSON.stringify(r.foundTerms)}`);
  });

  const totalHits = results.reduce((acc, r) => acc + r.totalBannedHits, 0);
  const titlesOver58 = results.filter(r => r.titleOverLimit).length;
  const syrupyIntros = results.filter(r => r.hasSyrupyIntro).length;

  console.log('\n--- OVERALL AUDIT METRICS ---');
  console.log(`Total Posts: ${posts.length}`);
  console.log(`Total Banned Words Across All Posts: ${totalHits}`);
  console.log(`Posts with Titles > 58 Characters: ${titlesOver58}`);
  console.log(`Posts with Generic Syrupy Intros: ${syrupyIntros}`);
}

run().catch(console.error);
