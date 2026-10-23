const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function inspectAndFix() {
  const post = await client.fetch(`*[_id == "pJmrsKLAWC800vFHegUGO5"][0]`);
  console.log('Post slug:', post.slug.current);
  
  // Find lines with technology
  const lines = post.body.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('technology')) {
      console.log(`Line ${idx}: ${line}`);
    }
  });

  // Replace category/technology with category/architecture-teardowns/
  const newBody = post.body.replace(/\/blog\/category\/technology\/?/g, '/blog/category/architecture-teardowns/');
  await client.patch(post._id).set({ body: newBody }).commit();
  console.log('✅ Successfully fixed 404 broken link in case-study-cashops-financial-dashboard!');
}

inspectAndFix().catch(console.error);
