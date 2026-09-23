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

async function publishBatch16() {
  console.log('🚀 Publishing Batch 16 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch16Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch16_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 16 articles successfully published to Sanity CMS!');
}

publishBatch16().catch(err => {
  console.error('❌ Failed to publish Batch 16 to Sanity:', err);
  process.exit(1);
});
