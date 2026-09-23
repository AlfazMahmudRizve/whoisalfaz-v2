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

const batch11Slugs = [
  'vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide',
  'corrective-rag-crag-n8n-blueprint',
  'accelerated-growth-studio-plg-playbook',
  'adcreative-ai-review-n8n-ad-refresh-loop',
  'omnichannel-ai-voice-note-handler'
];

async function publishBatch11() {
  console.log('🚀 Publishing Batch 11 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch11Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch11_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 11 articles successfully published to Sanity CMS!');
}

publishBatch11().catch(err => {
  console.error('❌ Failed to publish Batch 11 to Sanity:', err);
  process.exit(1);
});
