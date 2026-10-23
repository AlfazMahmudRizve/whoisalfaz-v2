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

async function run() {
  const post = await client.fetch('*[_type == "post" && slug.current == "manychat-instagram-summit-2026-agenda-review-bonus"][0]');
  console.log('Title:', post.title);
  console.log('SEO Title:', post.seoTitle);
  console.log('SEO Desc:', post.seoDescription);
  
  const lines = post.body.split('\n');
  lines.forEach((line, i) => {
    if (/bonus|\$49|value|claim/i.test(line)) {
      console.log(`L${i + 1}: ${line}`);
    }
  });
}
run();
