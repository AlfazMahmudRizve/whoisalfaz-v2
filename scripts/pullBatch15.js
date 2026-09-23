const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const batch15Slugs = [
  'tempmail10min-seo-case-study',
  'manychat-instagram-summit-2026-agenda-review-bonus',
  'manychat-alternatives-2026-top-tools-by-use-case',
  'outstanding-ideas-for-youtube-shorts',
  'outstanding-ideas-for-saas-mvps'
];

async function pullBatch15() {
  console.log('Fetching Batch 15 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch15Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch15_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch15_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 15 raw articles saved to scratch/.');
}

pullBatch15().catch(err => {
  console.error('Error pulling Batch 15:', err);
  process.exit(1);
});
