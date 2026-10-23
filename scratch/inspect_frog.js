const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const post = await client.fetch('*[_type == "post" && slug.current == "screaming-frog-alternatives-free-seo-audit-tools"][0]');
  console.log(post.body.slice(-2500));
}

run().catch(console.error);
