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

const batch10Slugs = [
  'pinecone-serverless-vs-qdrant-vultr-latency-benchmark',
  'scaling-qdrant-vector-database-to-10-million-embeddings',
  'securing-self-hosted-vector-databases-ssl-vultr-firewall',
  'self-hosted-qdrant-cluster-vultr-docker-sop',
  'the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n'
];

async function publishBatch10() {
  console.log('🚀 Publishing Batch 10 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch10Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch10_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 10 articles successfully published to Sanity CMS!');
}

publishBatch10().catch(err => {
  console.error('❌ Failed to publish Batch 10 to Sanity:', err);
  process.exit(1);
});
