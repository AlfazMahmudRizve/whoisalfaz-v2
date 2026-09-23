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

const batch3Slugs = [
  'headless-wordpress-vs-monolithic',
  'case-study-veloryc-premium-ecommerce',
  'open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark',
  'n8n-multi-tenant-vector-schema',
  'pinecone-vs-qdrant-vultr-benchmark'
];

async function publishBatch3() {
  console.log('🚀 Publishing Batch 3 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch3Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch3_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 3 articles successfully published to Sanity CMS!');
}

publishBatch3().catch(err => {
  console.error('❌ Failed to publish Batch 3 to Sanity:', err);
  process.exit(1);
});
