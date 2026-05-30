const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function fetchPost() {
  try {
    const post = await client.fetch('*[_type == "post" && slug.current == "manychat-pricing-2026"][0]');
    if (!post) {
      console.error('Post not found!');
      return;
    }
    fs.writeFileSync(path.resolve(__dirname, 'manychat-pricing-raw.json'), JSON.stringify(post, null, 2), 'utf-8');
    console.log('✅ Successfully fetched post and saved to scratch/manychat-pricing-raw.json');
    console.log('Title:', post.title);
    console.log('SEO Title:', post.seoTitle);
    console.log('SEO Description:', post.seoDescription);
  } catch (error) {
    console.error('❌ Error fetching post:', error);
  }
}

fetchPost();
