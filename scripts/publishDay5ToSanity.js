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

async function publishDay5() {
  const filePath = path.resolve(__dirname, '../draft-aisdr-vs-human.json');
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(`Compiled JSON file not found: ${filePath}`);
    }
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log(`Publishing Day 5 post to Sanity: ${postData.title}...`);

    postData._type = 'post';
    postData._id = 'aisdr-vs-human-sdr-performance-teardown';

    const result = await client.createOrReplace(postData);
    console.log('✅ Successfully published live Day 5 post in Sanity:', result._id);
  } catch (error) {
    console.error('❌ Failed to publish Day 5 post to Sanity:', error.message);
    process.exit(1);
  }
}

publishDay5();
