const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve('.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function check() {
  const post = await client.fetch('*[_type == "post" && slug.current == "screaming-frog-alternatives-free-seo-audit-tools"][0]{_id, title, body}');
  console.log('ID:', post._id);
  console.log('Title:', post.title);
  console.log('Body length:', post.body.length);
  console.log('Has Quick Answer:', post.body.includes('Quick Answer'));
  console.log('Has <table>:', post.body.includes('<table'));
}

check().catch(console.error);
