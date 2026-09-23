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

const batch20Slugs = [
  'lead-scoring-automation-with-alfaz-mahmud-rizve',
  'capture-n8n-lead-data-from-wordpress-elementor',
  'n8n-debugging-error-handling-basics',
  'essential-n8n-core-nodes-by-alfaz-mahmud-rizve',
  'n8n-workflow-design-best-practices'
];

async function publishBatch20() {
  console.log('🚀 Publishing Batch 20 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch20Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch20_upgraded_${slug}.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 20 articles successfully published to Sanity CMS!');
}

publishBatch20().catch(err => {
  console.error('❌ Failed to publish Batch 20 to Sanity:', err);
  process.exit(1);
});
