const { createClient } = require('@sanity/client');
const fs = require('fs');
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

async function publishDay7() {
  const filePath = path.resolve(__dirname, '../draft-revops-definition.json');
  try {
    if (!fs.existsSync(filePath)) throw new Error(`JSON not found: ${filePath}`);
    const postData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    console.log(`Publishing Day 7: ${postData.title}...`);
    postData._type = 'post';
    postData._id = 'what-is-revops-technical-definition-saas';
    const result = await client.createOrReplace(postData);
    console.log('✅ Published Day 7 to Sanity:', result._id);
  } catch (error) {
    console.error('❌ Publish failed:', error.message);
    process.exit(1);
  }
}

publishDay7();
