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

const batch21Slugs = [
  'what-is-n8n-and-how-to-set-it-up',
  'what-is-n8n-by-alfaz-mahmud-rizve',
  'automation-operating-system-for-saas',
  'case-study-client-portfolio-delivery',
  'case-study-whoisalfaz-seo-indexing-engine'
];

async function publishBatch21() {
  console.log('🚀 Publishing Batch 21 (FINAL) upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch21Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch21_upgraded_${slug}.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\n🎉 ALL 5 Batch 21 articles successfully published! 105/105 COMPLETE!');
}

publishBatch21().catch(err => {
  console.error('❌ Failed to publish Batch 21 to Sanity:', err);
  process.exit(1);
});
