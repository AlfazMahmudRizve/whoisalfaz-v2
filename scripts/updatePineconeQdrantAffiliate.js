const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function updatePost() {
  const slug = 'pinecone-vs-qdrant-n8n-rag-comparison';
  const updatedBodyPath = path.resolve(__dirname, '../scratch/pinecone-vs-qdrant-updated.md');
  
  if (!fs.existsSync(updatedBodyPath)) {
    console.error(`❌ Error: ${updatedBodyPath} not found`);
    process.exit(1);
  }

  const updatedBody = fs.readFileSync(updatedBodyPath, 'utf8');

  console.log(`📡 Fetching post for slug: ${slug}...`);
  const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });

  if (!post) {
    console.error(`❌ Post not found in Sanity: ${slug}`);
    process.exit(1);
  }

  console.log(`✅ Found post "${post.title}" (ID: ${post._id})`);
  console.log(`📝 Updating body (${post.body.length} -> ${updatedBody.length} characters)...`);

  const res = await client
    .patch(post._id)
    .set({
      body: updatedBody,
      modified: new Date().toISOString(),
    })
    .commit();

  console.log(`🎉 Post updated successfully in Sanity CMS! (Rev: ${res._rev})`);
}

updatePost().catch((err) => {
  console.error('❌ Update failed:', err);
  process.exit(1);
});
