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

const batch7Slugs = [
  'n8n-ai-agent-memory-persistence-qdrant-vector-store',
  'n8n-vector-store-memory-management-production-guide',
  'brevo-cold-email-ip-warming-guide',
  'waterfall-data-enrichment-pipeline-n8n-guide',
  'aisdr-vs-human-sdr-unit-economics-benchmark'
];

async function publishBatch7() {
  console.log('🚀 Publishing Batch 7 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch7Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch7_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 7 articles successfully published to Sanity CMS!');
}

publishBatch7().catch(err => {
  console.error('❌ Failed to publish Batch 7 to Sanity:', err);
  process.exit(1);
});
