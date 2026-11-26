const { createClient } = require('@sanity/client');
require('dotenv').config({ path: 'E:/Ai Agents/whoisalfaz.me/Web Projects/antigravity/whoisalfaz-v2/.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function run() {
  const posts = await client.fetch('*[slug.current == "zero-data-retention-enterprise-rag-vultr-vps"]{_id, title, date, publishedAt}');
  console.log('All matching docs:', posts);
}

run().catch(console.error);
