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

const batch16Slugs = [
  'outstanding-ideas-for-b2b-lead-generation',
  'manychat-whatsapp-b2b-lead-capture-agency',
  'apollo-brevo-n8n-outbound-pipeline',
  'monday-com-automation-recipes-revops-2026',
  'pinecone-n8n-rag-knowledge-base-blueprint'
];

async function pullBatch16() {
  console.log('Fetching Batch 16 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch16Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch16_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch16_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 16 raw articles saved to scratch/.');
}

pullBatch16().catch(err => {
  console.error('Error pulling Batch 16:', err);
  process.exit(1);
});
