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

const batch18Slugs = [
  'n8n-rag-tutorial',
  'n8n-ai-agent-tools',
  'how-to-build-an-api-with-n8n',
  'n8n-google-analytics-4-pipeline',
  'n8n-tips-and-tricks-by-alfaz-mahmud-rizve'
];

async function pullBatch18() {
  console.log('Fetching Batch 18 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch18Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch18_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch18_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 18 raw articles saved to scratch/.');
}

pullBatch18().catch(err => {
  console.error('Error pulling Batch 18:', err);
  process.exit(1);
});
