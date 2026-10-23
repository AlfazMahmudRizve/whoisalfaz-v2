const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const query = `*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    metaDescription,
    "bodyLength": length(body)
  }`;
  
  const posts = await client.fetch(query);
  console.log(`Total posts in Sanity: ${posts.length}`);

  const missingMetaDesc = posts.filter(p => !p.metaDescription || p.metaDescription.trim().length === 0);
  const tooLongSeoTitle = posts.filter(p => (p.seoTitle || '').length > 58);
  const missingSeoTitle = posts.filter(p => !p.seoTitle || p.seoTitle.trim().length === 0);
  const thinPosts = posts.filter(p => (p.bodyLength || 0) < 3000); // < ~500-600 words

  console.log(`\n=== AUDIT SUMMARY ===`);
  console.log(`Posts missing Meta Description: ${missingMetaDesc.length} / ${posts.length}`);
  console.log(`Posts with SEOTitle > 58 chars: ${tooLongSeoTitle.length} / ${posts.length}`);
  console.log(`Posts missing SEOTitle: ${missingSeoTitle.length} / ${posts.length}`);
  console.log(`Thin posts (<3,000 chars): ${thinPosts.length} / ${posts.length}`);

  if (missingMetaDesc.length > 0) {
    console.log(`\n--- POSTS MISSING META DESCRIPTION (${missingMetaDesc.length}) ---`);
    missingMetaDesc.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.slug}] - Title: "${p.title}" (SEOTitle: "${p.seoTitle || 'NONE'}")`);
    });
  }

  if (tooLongSeoTitle.length > 0) {
    console.log(`\n--- POSTS WITH SEOTITLE > 58 CHARS (${tooLongSeoTitle.length}) ---`);
    tooLongSeoTitle.forEach((p, idx) => {
      console.log(`${idx + 1}. [${p.slug}] (${p.seoTitle.length} chars): "${p.seoTitle}"`);
    });
  }
}

run().catch(console.error);
