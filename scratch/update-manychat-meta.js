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

async function updateMeta() {
  try {
    console.log('Fetching post "manychat-pricing-2026" from Sanity...');
    const post = await client.fetch('*[_type == "post" && slug.current == "manychat-pricing-2026"][0]');
    if (!post) {
      console.error('Post "manychat-pricing-2026" not found!');
      return;
    }
    
    console.log('Patching meta title and meta description in Sanity...');
    const result = await client
      .patch(post._id)
      .set({
        seoTitle: "ManyChat Pricing 2026: Hidden Fees & Best Plans Exposed",
        seoDescription: "Wondering how much ManyChat actually costs in 2026? Read this ultimate breakdown of plan limits, broadcast fees, and custom automation pricing."
      })
      .commit();
      
    console.log('✅ Successfully updated ManyChat Pricing 2026 meta in Sanity:', result._id);
    console.log('New SEO Title:', result.seoTitle);
    console.log('New SEO Description:', result.seoDescription);
  } catch (error) {
    console.error('❌ Failed to update ManyChat Pricing meta:', error);
  }
}

updateMeta();
