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

const batch18Slugs = [
  'n8n-rag-tutorial',
  'n8n-ai-agent-tools',
  'how-to-build-an-api-with-n8n',
  'n8n-google-analytics-4-pipeline',
  'n8n-tips-and-tricks-by-alfaz-mahmud-rizve'
];

async function publishBatch18() {
  console.log('🚀 Publishing Batch 18 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch18Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch18_upgraded_${slug}.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 18 articles successfully published to Sanity CMS!');
}

publishBatch18().catch(err => {
  console.error('❌ Failed to publish Batch 18 to Sanity:', err);
  process.exit(1);
});
