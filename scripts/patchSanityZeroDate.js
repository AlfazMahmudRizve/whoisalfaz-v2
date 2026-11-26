const { createClient } = require('@sanity/client');
require('dotenv').config({ path: 'E:/Ai Agents/whoisalfaz.me/Web Projects/antigravity/whoisalfaz-v2/.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false
});

async function run() {
  console.log('Patching zero-data-retention-enterprise-rag-vultr-vps date...');
  const res = await client
    .patch('zero-data-retention-enterprise-rag-vultr-vps')
    .set({ date: '2026-07-26T21:45:00.000Z' })
    .commit();
  console.log('Patch result:', res._id, res.date);

  // Also check if drafts document needs sync or delete
  try {
    const draftRes = await client
      .patch('drafts.zero-data-retention-enterprise-rag-vultr-vps')
      .set({ date: '2026-07-26T21:45:00.000Z', publishedAt: '2026-07-26T21:45:00.000Z' })
      .commit();
    console.log('Draft patch result:', draftRes._id, draftRes.date);
  } catch (e) {
    console.log('Draft note:', e.message);
  }
}

run().catch(console.error);
