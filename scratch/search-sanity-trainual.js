const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function main() {
  const query = `*[_type == "post" && (title match "Trainual" || body match "Trainual")] { _id, title, slug, body }`;
  const posts = await client.fetch(query);
  console.log('Found posts:', posts.length);
  posts.forEach(p => {
    console.log(`- ${p.title} -> ${p.slug?.current}`);
    console.log(`Body snippet:\n`, p.body ? p.body.substring(0, 1000) : 'No body');
  });
}

main().catch(console.error);
