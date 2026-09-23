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

const batch13Slugs = [
  'manychat-n8n-async-timeout-fix',
  'case-study-urban-cafe-foodtech-platform',
  'manychat-to-n8n-integration-lead-scoring',
  'build-personal-ai-assistant',
  'automate-client-reporting-with-n8n'
];

async function pullBatch13() {
  console.log('Fetching Batch 13 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch13Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch13_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch13_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 13 raw articles saved to scratch/.');
}

pullBatch13().catch(err => {
  console.error('Error pulling Batch 13:', err);
  process.exit(1);
});
