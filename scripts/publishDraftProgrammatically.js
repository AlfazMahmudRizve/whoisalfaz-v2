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

async function publishDraft(slug) {
  const draftId = `drafts.${slug}`;
  const publishedId = slug;

  try {
    console.log(`Fetching draft document from Sanity CDN: ${draftId}...`);
    const draftDoc = await client.getDocument(draftId);
    
    if (!draftDoc) {
      throw new Error(`Draft document not found in Sanity: ${draftId}`);
    }

    console.log(`Draft found! Moving to published document: ${publishedId}...`);
    
    // Create copy, strip system revision fields that might conflict
    const publishedDoc = {
      ...draftDoc,
      _id: publishedId,
    };
    delete publishedDoc._createdAt;
    delete publishedDoc._updatedAt;
    delete publishedDoc._rev;

    // Atomically create/replace the published document and delete the draft
    console.log('Executing atomic publication transaction...');
    await client
      .transaction()
      .createOrReplace(publishedDoc)
      .delete(draftId)
      .commit();

    console.log(`✅ Successfully published post: ${slug}`);
  } catch (error) {
    console.error(`❌ programmatic publication failed:`, error.message);
    process.exit(1);
  }
}

const slug = process.argv[2] || 'n8n-apollo-lead-enrichment-pipeline';
publishDraft(slug);
