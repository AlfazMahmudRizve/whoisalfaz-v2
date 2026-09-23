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

const batch19Slugs = [
  'n8n-production-workflows-by-alfaz-mahmud-rizve',
  'build-an-automated-rank-tracker-tool-with-n8n',
  'automated-content-research-by-alfaz-mahmud-rizve',
  'facebook-lead-ads-automation-by-alfaz-mahmud-rizve',
  'n8n-slack-notifications-by-alfaz-mahmud-rizve'
];

async function pullBatch19() {
  console.log('Fetching Batch 19 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch19Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch19_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch19_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 19 raw articles saved to scratch/.');
}

pullBatch19().catch(err => {
  console.error('Error pulling Batch 19:', err);
  process.exit(1);
});
