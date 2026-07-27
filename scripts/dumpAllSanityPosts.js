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

async function main() {
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    "slug": slug.current,
    description,
    seoDescription
  }`);

  console.log(`Total Sanity posts: ${posts.length}`);
  const jsonStr = JSON.stringify(posts, null, 2);
  const fs = require('fs');
  fs.writeFileSync(path.resolve(__dirname, '../all_sanity_posts_full.json'), jsonStr);
  console.log('Saved all posts to all_sanity_posts_full.json');
}

main().catch(console.error);
