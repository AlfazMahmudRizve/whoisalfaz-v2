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

const batch9Slugs = [
  'outstanding-ideas-for-b2b-lead-capture',
  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
  'high-throughput-batch-vector-ingestion-n8n-qdrant',
  'hybrid-vector-keyword-search-qdrant-n8n-pipeline',
  'pinecone-namespaces-vs-qdrant-payload-filters-comparison'
];

async function publishBatch9() {
  console.log('🚀 Publishing Batch 9 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch9Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch9_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 9 articles successfully published to Sanity CMS!');
}

publishBatch9().catch(err => {
  console.error('❌ Failed to publish Batch 9 to Sanity:', err);
  process.exit(1);
});
