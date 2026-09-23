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

const batch5Slugs = [
  'automated-pdf-document-chunking-vectorization-n8n',
  'semantic-search-api-n8n-qdrant-fastapi-bridge',
  'closed-loop-lead-attribution-engine',
  'databox-revops-dashboard-pipeline-velocity',
  'whatconverts-vs-callrail-attribution'
];

async function publishBatch5() {
  console.log('🚀 Publishing Batch 5 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch5Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch5_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 5 articles successfully published to Sanity CMS!');
}

publishBatch5().catch(err => {
  console.error('❌ Failed to publish Batch 5 to Sanity:', err);
  process.exit(1);
});
