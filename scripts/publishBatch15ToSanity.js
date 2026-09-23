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

const batch15Slugs = [
  'tempmail10min-seo-case-study',
  'manychat-instagram-summit-2026-agenda-review-bonus',
  'manychat-alternatives-2026-top-tools-by-use-case',
  'outstanding-ideas-for-youtube-shorts',
  'outstanding-ideas-for-saas-mvps'
];

async function publishBatch15() {
  console.log('🚀 Publishing Batch 15 upgrades to Sanity CMS (live production)...\n');

  for (const slug of batch15Slugs) {
    const postData = JSON.parse(fs.readFileSync(`scratch/batch15_${slug}_upgraded.json`, 'utf8'));
    console.log(`Patching [${slug}] (ID: ${postData._id})...`);

    const patch = client.patch(postData._id).set({
      seoTitle: postData.seoTitle,
      seoDescription: postData.seoDescription,
      body: postData.body,
    });

    const result = await patch.commit();
    console.log(`✅ Successfully updated in Sanity: ${result._id} (${result.title})`);
  }

  console.log('\nAll 5 Batch 15 articles successfully published to Sanity CMS!');
}

publishBatch15().catch(err => {
  console.error('❌ Failed to publish Batch 15 to Sanity:', err);
  process.exit(1);
});
