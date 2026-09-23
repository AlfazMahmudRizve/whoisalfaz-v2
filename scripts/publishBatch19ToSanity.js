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

const batch19Slugs = [
  'n8n-production-workflows-by-alfaz-mahmud-rizve',
  'build-an-automated-rank-tracker-tool-with-n8n',
  'automated-content-research-by-alfaz-mahmud-rizve',
  'facebook-lead-ads-automation-by-alfaz-mahmud-rizve',
  'n8n-slack-notifications-by-alfaz-mahmud-rizve'
];

async function publishBatch19() {
  console.log('🚀 Publishing Batch 19 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch19Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch19_upgraded_${slug}.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 19 articles successfully published to Sanity CMS!');
}

publishBatch19().catch(err => {
  console.error('❌ Failed to publish Batch 19 to Sanity:', err);
  process.exit(1);
});
