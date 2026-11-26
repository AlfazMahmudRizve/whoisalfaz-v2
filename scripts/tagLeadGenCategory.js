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
  const catId = 'cConWBU9nRl6jEInqsZxhG'; // AI Lead Generation
  const slugs = [
    'cold-email-machine-apollo-aisdr-brevo',
    'manychat-whatsapp-b2b-lead-capture-agency'
  ];

  for (const slug of slugs) {
    const docs = await client.fetch('*[slug.current == $slug && !(_id in path("drafts.**"))]{_id, title, categories}', { slug });
    for (const doc of docs) {
      console.log(`Checking doc: ${doc._id} (${doc.title})`);
      const existingCats = doc.categories || [];
      const hasCat = existingCats.some(c => c._ref === catId);
      if (!hasCat) {
        console.log(`  Adding AI Lead Generation to ${doc._id}...`);
        await client.patch(doc._id).setIfMissing({ categories: [] }).append('categories', [{ _type: 'reference', _ref: catId, _key: 'cat_' + Date.now() }]).commit();
        console.log(`  Added successfully!`);
      } else {
        console.log(`  Already tagged!`);
      }
    }
  }

  // Also check sitemap output
  const catCount = await client.fetch('count(*[_type == "post" && references($id)])', { id: catId });
  console.log(`AI Lead Generation post count is now: ${catCount}`);
}

run().catch(console.error);
