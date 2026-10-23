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

const batch17Slugs = [
  'what-is-revops-technical-definition-saas',
  'manychat-pricing-2026',
  'apollo-n8n-outreach',
  'automated-youtube-shorts-generator',
  'n8n-ai-receptionist'
];

async function publishBatch17() {
  console.log('🚀 Publishing Batch 17 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch17Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch17_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 17 articles successfully published to Sanity CMS!');
}

publishBatch17().catch(err => {
  console.error('❌ Failed to publish Batch 17 to Sanity:', err);
  process.exit(1);
});
