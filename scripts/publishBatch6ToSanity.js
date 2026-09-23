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

const batch6Slugs = [
  'manychat-n8n-whatsapp-voice-bot',
  'lead-enrichment-with-n8n',
  'zero-data-retention-enterprise-rag-vultr-vps',
  'building-an-enterprise-knowledge-graph-rag-n8n',
  'building-multi-tenant-vector-search-n8n-qdrant'
];

async function publishBatch6() {
  console.log('🚀 Publishing Batch 6 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch6Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch6_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 6 articles successfully published to Sanity CMS!');
}

publishBatch6().catch(err => {
  console.error('❌ Failed to publish Batch 6 to Sanity:', err);
  process.exit(1);
});
