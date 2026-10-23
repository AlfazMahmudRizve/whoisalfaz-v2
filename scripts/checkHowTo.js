const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  useCdn: false,
});

async function main() {
  const p = await client.fetch('*[slug.current == $slug][0]{ _id, schemaMarkup, body }', {
    slug: 'manychat-to-n8n-integration-lead-scoring'
  });
  console.log('Post ID:', p?._id);
  console.log('schemaMarkup:', p?.schemaMarkup ? p.schemaMarkup.slice(0, 300) : 'None');
  if (p?.body && /HowTo/i.test(p.body)) {
    console.log('Matches in body:', p.body.match(/.{0,50}HowTo.{0,50}/gi));
  } else {
    console.log('No HowTo in body');
  }
}

main().catch(console.error);
