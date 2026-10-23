const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const post = await client.fetch('*[_type == "post" && slug.current == "manychat-instagram-summit-2026-agenda-review-bonus"][0]');
  console.log('TITLE:', post.title);
  console.log('SEO TITLE:', post.seoTitle);
  console.log('DESCRIPTION:', post.description);
  console.log('SEO DESCRIPTION:', post.seoDescription);
  console.log('\n--- BODY ---');
  console.log(post.body);
}

run();
