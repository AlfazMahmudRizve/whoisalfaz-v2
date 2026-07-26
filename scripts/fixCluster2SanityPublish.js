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

async function publishCleanCluster2() {
  console.log('🔍 Fetching author reference from Sanity CMS...');
  
  let authorRef = null;
  try {
    const authors = await client.fetch(`*[_type == "author"]{ _id }`);
    if (authors && authors.length > 0) {
      authorRef = authors[0]._id;
      console.log(`✅ Found Author Document ID: ${authorRef}`);
    }
  } catch (err) {
    console.warn(`⚠️ Could not fetch author: ${err.message}`);
  }

  const rootDir = path.resolve(__dirname, '..');
  const files = fs.readdirSync(rootDir).filter(f => f.startsWith('draft-cluster2-') && f.endsWith('.json') && !f.includes('-self-hosted-') && !f.includes('-vultr-') && !f.includes('-securing-') && !f.includes('-the-ultimate-') && !f.includes('-pinecone-') && !f.includes('-hybrid-') && !f.includes('-scaling-') && !f.includes('-corrective-') && !f.includes('-automated-') && !f.includes('-building-') && !f.includes('-open-source-') && !f.includes('-dify-') && !f.includes('-semantic-') && !f.includes('-zero-') && !f.includes('-high-') && !f.includes('-n8n-'));

  console.log(`🚀 Ingesting all 20 Cluster #2 posts cleanly into Sanity CMS...\n`);

  let successCount = 0;
  for (let i = 1; i <= 20; i++) {
    const numStr = i < 10 ? `0${i}` : `${i}`;
    const file = `draft-cluster2-${numStr}.json`;
    const filePath = path.join(rootDir, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${file}`);
      continue;
    }

    const draftData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Strip un-uploaded image field
    delete draftData.image;

    // Attach valid author ref or delete if none
    if (authorRef) {
      draftData.author = {
        _type: 'reference',
        _ref: authorRef
      };
    } else {
      delete draftData.author;
    }

    try {
      console.log(`[${i}/20] Publishing ${draftData.slug.current || draftData._id}...`);
      await client.createOrReplace(draftData);
      console.log(`  ✅ Successfully published to Sanity CMS!\n`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error publishing ${draftData.slug?.current}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Sanity Ingestion Complete: ${successCount}/20 Posts Published Successfully!`);
}

publishCleanCluster2();
