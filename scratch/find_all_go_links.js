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
  const posts = await client.fetch('*[_type == "post" && body match "/go/"]{ "slug": slug.current, affiliates, body }');
  console.log(`Found ${posts.length} posts with /go/ links in body:`);
  posts.slice(0, 5).forEach(p => {
    const matches = p.body.match(/\[[^\]]+\]\(https?:\/\/[^\s)]*\/go\/[^\s)]+\)/g);
    console.log(`- ${p.slug}:`, matches);
  });
}

run().catch(console.error);
