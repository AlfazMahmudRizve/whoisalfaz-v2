const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function updatePublished() {
  const filePath = path.resolve(__dirname, '../draft-n8n-apollo.json');
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const postData = JSON.parse(fileContent);

    // Ensure _type is set and _id is the published ID (without drafts. prefix)
    postData._type = 'post';
    postData._id = 'n8n-apollo-lead-enrichment-pipeline';

    console.log(`Updating published post in Sanity: ${postData.title}...`);
    const result = await client.createOrReplace(postData);
    console.log('✅ Successfully updated live published post in Sanity:', result._id);
  } catch (error) {
    console.error('❌ Failed to update published post:', error.message);
    process.exit(1);
  }
}

updatePublished();
