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

async function inspectDoc() {
  const slug = 'dify-ai-vultr-gpu-docker-deployment-guide';
  const posts = await client.fetch(`*[_type == "post" && slug.current == $slug]`, { slug });
  
  if (posts.length === 0) {
    console.log(`No post found for ${slug}`);
    return;
  }

  const post = posts[0];
  console.log(`Title: ${post.title}`);
  console.log(`Body Type: ${typeof post.body} (IsArray: ${Array.isArray(post.body)})`);
  console.log('Sample Body Content:');
  console.log(JSON.stringify(post.body, null, 2).slice(0, 1000));
}

inspectDoc();
