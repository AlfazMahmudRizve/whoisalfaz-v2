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
  const posts = await client.fetch('*[_type == "post" && (body match "*bonus*" || title match "*bonus*" || description match "*bonus*")]{ _id, "slug": slug.current, title }');
  console.log(`Posts mentioning bonus (${posts.length}):`);
  for (const p of posts) {
    console.log(`- ${p.slug} | ${p.title}`);
  }
}

run();
