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
  const posts = await client.fetch('*[_type == "post" && (body match "*147*" || body match "*$147*")]{ _id, "slug": slug.current, title, body }');
  console.log(`Posts mentioning 147 (${posts.length}):`);
  for (const p of posts) {
    console.log(`\n📄 ${p.slug}:`);
    const lines = p.body.split('\n');
    lines.forEach((l, idx) => {
      if (l.includes('147')) {
        console.log(`  Line ${idx + 1}: ${l}`);
      }
    });
  }
}

run();
