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

const batch14Slugs = [
  'n8n-data-privacy-security-guide',
  'automated-marketing-reporting-with-n8n-at-whoisalfaz',
  'automated-email-follow-up-n8n-brevo',
  'case-study-careerops-ai-resume-builder',
  'case-study-cashops-financial-dashboard'
];

async function publishBatch14() {
  console.log('🚀 Publishing Batch 14 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch14Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch14_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 14 articles successfully published to Sanity CMS!');
}

publishBatch14().catch(err => {
  console.error('❌ Failed to publish Batch 14 to Sanity:', err);
  process.exit(1);
});
