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
  const post = await client.fetch('*[_type == "post" && slug.current == "manychat-pricing-2026"][0]');
  const start = post.body.indexOf('### Plan Comparison Table');
  const end = post.body.indexOf('## What ManyChat Actually Does Well in 2026');
  console.log(post.body.slice(start, end));
}

run().catch(console.error);
