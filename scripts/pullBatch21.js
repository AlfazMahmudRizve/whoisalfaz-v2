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

const batch21Slugs = [
  'what-is-n8n-and-how-to-set-it-up',
  'what-is-n8n-by-alfaz-mahmud-rizve',
  'automation-operating-system-for-saas',
  'case-study-client-portfolio-delivery',
  'case-study-whoisalfaz-seo-indexing-engine'
];

async function pullBatch21() {
  console.log('Fetching Batch 21 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch21Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch21_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch21_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 21 raw articles saved to scratch/.');
}

pullBatch21().catch(err => {
  console.error('Error pulling Batch 21:', err);
  process.exit(1);
});
