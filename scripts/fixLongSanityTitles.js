const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const updates = [
  {
    slug: 'case-study-cashops-financial-dashboard',
    seoTitle: 'CashOps Financial Operations Architecture | Alfaz Mahmud',
  },
  {
    slug: 'case-study-urban-cafe-foodtech-platform',
    seoTitle: 'Zero-Hardware Kitchen POS System: Next.js PWA Guide',
  },
  {
    slug: 'lead-scoring-automation-with-alfaz-mahmud-rizve',
    seoTitle: 'Lead Scoring Automation: n8n, Brevo & HeyReach Guide',
  },
];

async function fixLongSanityTitles() {
  console.log('Starting Sanity long title patch process...\n');

  for (const item of updates) {
    console.log(`Searching for post with slug: "${item.slug}"...`);
    const posts = await client.fetch(
      `*[_type == "post" && slug.current == $slug] { _id, title, seoTitle }`,
      { slug: item.slug }
    );

    if (!posts || posts.length === 0) {
      console.warn(`⚠️ Warning: No document found for slug "${item.slug}"`);
      continue;
    }

    for (const post of posts) {
      console.log(`Patching document ${post._id}...`);
      const res = await client
        .patch(post._id)
        .set({ seoTitle: item.seoTitle })
        .commit();

      console.log(`✅ Successfully updated ${res._id}:`);
      console.log(`   Slug: ${item.slug}`);
      console.log(`   New seoTitle: "${res.seoTitle}" (${res.seoTitle.length} chars)`);
    }
    console.log('---');
  }

  console.log('Finished updating Sanity post titles.');
}

fixLongSanityTitles().catch((err) => {
  console.error('❌ Error executing script:', err.message);
  process.exit(1);
});
