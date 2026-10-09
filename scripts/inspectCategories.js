const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function main() {
  const cats = await client.fetch('*[_type == "category"]{ _id, name, "slug": slug.current, "count": count(*[_type == "post" && references(^._id)]) } | order(count desc)');
  console.log('Sanity Categories:');
  console.log(JSON.stringify(cats, null, 2));
}

main().catch(console.error);
