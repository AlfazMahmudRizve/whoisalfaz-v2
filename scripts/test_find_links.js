const { createClient } = require('@sanity/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

async function findAnyLinks() {
  const posts = await client.fetch(`*[_type == "post"]`);

  posts.forEach(post => {
    if (typeof post.body === 'string') {
      const links = post.body.match(/\/blog\/[a-zA-Z0-9-_\/]+/g) || [];
      links.forEach(link => {
        if (link.includes('lead') || link.includes('facebook') || link.includes('n8n') || link.includes('elementor')) {
          console.log(`[LINK] Slug: ${post.slug?.current} -> ${link}`);
        }
      });
    }
  });
}

findAnyLinks().catch(console.error);
