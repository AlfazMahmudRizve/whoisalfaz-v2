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
  const slug = process.argv[2];
  if (!slug) {
    console.error('Usage: node fetch-post-by-slug.js <slug>');
    process.exit(1);
  }

  try {
    const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });
    if (!post) {
      console.error(`Post with slug "${slug}" not found!`);
      return;
    }
    const outputPath = path.resolve(__dirname, `${slug}-raw.json`);
    fs.writeFileSync(outputPath, JSON.stringify(post, null, 2), 'utf-8');
    console.log(`✅ Successfully fetched post and saved to: ${outputPath}`);
    console.log('Title:', post.title);
    console.log('SEO Title:', post.seoTitle);
    console.log('SEO Description:', post.seoDescription);
  } catch (error) {
    console.error('❌ Error fetching post:', error);
  }
}

fetchPost();
