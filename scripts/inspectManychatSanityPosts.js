const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1y4vj0w2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_SECRET_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
});

async function inspect() {
  const posts = await client.fetch(`*[_type == "post" && slug.current match "*manychat*"]{
    _id,
    title,
    "slug": slug.current
  }`);
  console.log('📌 Found ManyChat Posts in Sanity:');
  posts.forEach(p => console.log(`   - [${p._id}] ${p.title} (/blog/${p.slug})`));
}

inspect().catch(console.error);
