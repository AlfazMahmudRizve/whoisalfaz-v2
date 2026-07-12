const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function main() {
  const query = `*[_type == "post" && slug.current == "n8n-workflow-design-best-practices"][0] { title, body }`;
  const post = await client.fetch(query);
  console.log('Title:', post.title);
  console.log('Body:\n', post.body);
}

main().catch(console.error);
