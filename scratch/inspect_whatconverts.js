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
  const post = await client.fetch('*[_type == "post" && slug.current == "whatconverts-vs-callrail-attribution"][0]');
  const idx = post.body.indexOf('## Feature Matrix');
  console.log(post.body.slice(idx + 1200, idx + 2500));
}

run().catch(console.error);
