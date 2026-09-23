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

const batch8Slugs = [
  'apollo-vs-lusha-vs-aisdr-comparison',
  'tapstitch-vs-printful-ecommerce-pipeline',
  'ai-automation-agency-business-model',
  'n8n-global-error-handling',
  'automations-for-saas-and-agencies'
];

async function publishBatch8() {
  console.log('🚀 Publishing Batch 8 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch8Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch8_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 8 articles successfully published to Sanity CMS!');
}

publishBatch8().catch(err => {
  console.error('❌ Failed to publish Batch 8 to Sanity:', err);
  process.exit(1);
});
