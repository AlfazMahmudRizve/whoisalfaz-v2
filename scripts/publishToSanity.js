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

async function publishDraft() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node publishToSanity.js <path-to-draft.json>');
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const draftData = JSON.parse(fileContent);

    console.log(`Publishing draft: ${draftData.title}...`);

    // Ensure _type is set
    draftData._type = 'post';

    // Ensure _id is set for createOrReplace
    if (!draftData._id) {
      const slugStr = typeof draftData.slug === 'object' ? draftData.slug.current : draftData.slug;
      draftData._id = `post-${slugStr}`;
    }

    const result = await client.createOrReplace(draftData);
    console.log('✅ Successfully published to Sanity:', result._id);
  } catch (error) {
    console.error('❌ Failed to publish draft to Sanity:', error.message);
  }
}

publishDraft();
