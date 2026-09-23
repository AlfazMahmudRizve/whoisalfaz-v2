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

const batch12Slugs = [
  'pinecone-vs-qdrant-n8n-rag-comparison',
  'cold-email-machine-apollo-aisdr-brevo',
  'screaming-frog-alternatives-free-seo-audit-tools',
  'revops-automation-stack-saas-2026',
  'aisdr-vs-human-sdr-performance-teardown'
];

async function publishBatch12() {
  console.log('🚀 Publishing Batch 12 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch12Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch12_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 12 articles successfully published to Sanity CMS!');
}

publishBatch12().catch(err => {
  console.error('❌ Failed to publish Batch 12 to Sanity:', err);
  process.exit(1);
});
