const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function main() {
  const query = `*[_type == "post" || _id in path("drafts.**")] { _id, title, slug }`;
  const posts = await client.fetch(query);
  console.log(JSON.stringify(posts, null, 2));
}

main().catch(console.error);
