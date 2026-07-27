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

async function checkAllDocs() {
  const allDocs = await client.fetch(`*`);
  console.log(`Total documents in Sanity dataset: ${allDocs.length}`);
  
  const targetSlugs = [
    'outstanding-ideas-for-b2b-lead-capture',
    'outstanding-ideas-for-b2b-lead-generation',
    'outstanding-ideas-for-saas-mvps',
    'outstanding-ideas-for-youtube-shorts'
  ];

  targetSlugs.forEach(ts => {
    const found = allDocs.find(d => d.slug?.current === ts || d._id?.includes(ts));
    if (found) {
      console.log(`Found doc for ${ts}: ID ${found._id}, _type: ${found._type}`);
    } else {
      console.log(`Not found for ${ts}`);
    }
  });
}

checkAllDocs().catch(console.error);
