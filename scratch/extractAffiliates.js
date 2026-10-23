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
  const posts = await client.fetch('*[_type == "post"]{ title, body }');
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const affiliateKeywords = ['partner', 'affiliate', 'referral', 'ref=', '/go/', 'grsm.io', 'try.', 'join.', 'get.'];
  const found = new Map();

  for (const post of posts) {
    if (!post.body) continue;
    let match;
    while ((match = linkRegex.exec(post.body)) !== null) {
      const anchor = match[1];
      const url = match[2];
      if (affiliateKeywords.some(k => url.includes(k))) {
        found.set(url, anchor);
      }
    }
  }

  for (const [url, anchor] of found.entries()) {
    console.log(`${anchor} -> ${url}`);
  }
}
run();
