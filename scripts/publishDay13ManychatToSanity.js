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

async function run() {
  const filePath = path.resolve(__dirname, '../draft-manychat-whatsapp-b2b-lead-capture-agency.json');
  if (!fs.existsSync(filePath)) {
    console.error(`Error: Payload file not found: ${filePath}`);
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    console.log(`Ingesting post: ${postData.title} (${postData._id})...`);

    const result = await client.createOrReplace(postData);
    console.log('✅ Successfully published to Sanity DB:', result._id);
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    process.exit(1);
  }
}

run();
