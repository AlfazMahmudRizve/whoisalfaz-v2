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

const batch12Slugs = [
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'cold-email-machine-apollo-aisdr-brevo',
  'screaming-frog-alternatives-free-seo-audit-tools',
  'revops-automation-stack-saas-2026',
  'aisdr-vs-human-sdr-performance-teardown'
];

async function pullBatch12() {
  console.log('Fetching Batch 12 articles from Sanity CMS...\n');
  const query = `*[_type == "post" && slug.current in $slugs]{
    _id,
    title,
    "slug": slug.current,
    seoTitle,
    seoDescription,
    body,
    publishedAt
  }`;

  const posts = await client.fetch(query, { slugs: batch12Slugs });

  for (const post of posts) {
    fs.writeFileSync(`scratch/batch12_${post.slug}.json`, JSON.stringify(post, null, 2));
    console.log(`Saved: scratch/batch12_${post.slug}.json (title: "${post.title}")`);
  }

  console.log('\nAll Batch 12 raw articles saved to scratch/.');
}

pullBatch12().catch(err => {
  console.error('Error pulling Batch 12:', err);
  process.exit(1);
});
