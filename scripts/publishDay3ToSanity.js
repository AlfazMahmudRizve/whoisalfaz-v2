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

async function publishDay3() {
  const filePath = path.resolve(__dirname, '../draft-pinecone-n8n-rag.json');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log(`Publishing Day 3 post to Sanity: ${postData.title}...`);

    // Ensure _type is set and _id is correct
    postData._type = 'post';
    postData._id = 'pinecone-n8n-rag-knowledge-base-blueprint';

    const result = await client.createOrReplace(postData);
    console.log('✅ Successfully published live Day 3 post in Sanity:', result._id);
  } catch (error) {
    console.error('❌ Failed to publish Day 3 post to Sanity:', error.message);
    process.exit(1);
  }
}

publishDay3();
