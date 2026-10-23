const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function run() {
  const query = `*[_type == "post" && defined(metaDescription)]{
    _id,
    "slug": slug.current,
    metaDescription,
    seoDescription
  }`;
  
  const posts = await client.fetch(query);
  console.log(`Found ${posts.length} posts with metaDescription defined.`);

  for (const p of posts) {
    if (p.metaDescription && p.metaDescription !== p.seoDescription) {
      console.log(`Syncing seoDescription for ${p.slug}...`);
      await client.patch(p._id).set({
        seoDescription: p.metaDescription,
        description: p.metaDescription
      }).commit();
    }
  }
  console.log('✅ Synchronized all 15 posts!');
}

run().catch(console.error);
