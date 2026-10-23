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

const batch17Slugs = [
  'what-is-revops-technical-definition-saas',
  'manychat-pricing-2026',
  'apollo-n8n-outreach',
  'automated-youtube-shorts-generator',
  'n8n-ai-receptionist'
];

async function pullBatch17() {
  console.log('Fetching Batch 17 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch17Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch17_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch17_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 17 raw articles saved to scratch/.');
}

pullBatch17().catch(err => {
  console.error('Error pulling Batch 17:', err);
  process.exit(1);
});
