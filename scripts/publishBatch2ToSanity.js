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

const batch2Slugs = [
  'elevenlabs-n8n-voice-ai-sales-agent',
  'corrective-rag-crag-blueprint-n8n-tavily-fallback',
  'self-hosted-qdrant-docker-vultr',
  'emergent-ai-autonomous-gtm-guide',
  'dify-vs-n8n-architecture'
];

async function publishBatch2() {
  console.log('🚀 Publishing Batch 2 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch2Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch2_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 2 articles successfully published to Sanity CMS!');
}

publishBatch2().catch(err => {
  console.error('❌ Failed to publish Batch 2 to Sanity:', err);
  process.exit(1);
});
