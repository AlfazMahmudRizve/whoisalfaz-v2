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

async function main() {
  const post = await client.fetch('*[_type == "post" && slug.current == "automated-youtube-shorts-generator"][0]');
  if (!post) {
    console.error('Post not found');
    return;
  }
  console.log('ID:', post._id);
  console.log('Title:', post.title);
  console.log('seoTitle:', post.seoTitle);
  console.log('Word count (approx):', post.body.split(/\s+/).length);
  
  // Save body to scratch for inspection
  const fs = require('fs');
  fs.writeFileSync(path.resolve(__dirname, 'automated-youtube-shorts-generator_body.md'), post.body, 'utf-8');
  console.log('Body saved to scratch/automated-youtube-shorts-generator_body.md');
}

main().catch(console.error);
