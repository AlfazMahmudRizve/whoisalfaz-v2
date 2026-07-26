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

async function publishCluster2() {
  const rootDir = path.resolve(__dirname, '..');
  const files = fs.readdirSync(rootDir).filter(f => f.startsWith('draft-cluster2-') && f.endsWith('.json'));

  console.log(`🚀 Ingesting ${files.length} Mass Content Cluster #2 posts into Sanity CMS...\n`);

  let successCount = 0;
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(rootDir, filename);
    const draftData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    try {
      console.log(`Ingesting [${i+1}/${files.length}] ${draftData.slug.current}...`);
      await client.createOrReplace(draftData);
      console.log(`  ✅ Successfully published to Sanity CMS!\n`);
      successCount++;
    } catch (err) {
      console.error(`❌ Error publishing ${draftData.slug.current}: ${err.message}`);
    }
  }

  console.log(`\n🎉 Cluster #2 Ingestion Complete! Successfully published ${successCount}/${files.length} posts to Sanity CMS.`);
}

publishCluster2();
