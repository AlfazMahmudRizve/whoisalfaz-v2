const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function publishDay2() {
  const filePath = path.resolve(__dirname, '../draft-revops-stack.json');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log(`Publishing Day 2 post to Sanity: ${postData.title}...`);

    // Ensure _type is set and _id is correct
    postData._type = 'post';
    postData._id = 'revops-automation-stack-saas-2026';

    const result = await client.createOrReplace(postData);
    console.log('✅ Successfully published live Day 2 post in Sanity:', result._id);
  } catch (error) {
    console.error('❌ Failed to publish Day 2 post to Sanity:', error.message);
    process.exit(1);
  }
}

publishDay2();
