const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13'
});

client.fetch(`*[_type == "category"]{ _id, name, "slug": slug.current, description }`).then(res => {
  console.log(JSON.stringify(res, null, 2));
});
