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

const batch13Slugs = [
  'manychat-n8n-async-timeout-fix',
  'case-study-urban-cafe-foodtech-platform',
  'manychat-to-n8n-integration-lead-scoring',
  'build-personal-ai-assistant',
  'automate-client-reporting-with-n8n'
];

async function publishBatch13() {
  console.log('🚀 Publishing Batch 13 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch13Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch13_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 13 articles successfully published to Sanity CMS!');
}

publishBatch13().catch(err => {
  console.error('❌ Failed to publish Batch 13 to Sanity:', err);
  process.exit(1);
});
