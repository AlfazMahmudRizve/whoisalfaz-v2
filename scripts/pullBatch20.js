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

const batch20Slugs = [
  'lead-scoring-automation-with-alfaz-mahmud-rizve',
  'capture-n8n-lead-data-from-wordpress-elementor',
  'n8n-debugging-error-handling-basics',
  'essential-n8n-core-nodes-by-alfaz-mahmud-rizve',
  'n8n-workflow-design-best-practices'
];

async function pullBatch20() {
  console.log('Fetching Batch 20 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch20Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch20_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch20_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 20 raw articles saved to scratch/.');
}

pullBatch20().catch(err => {
  console.error('Error pulling Batch 20:', err);
  process.exit(1);
});
