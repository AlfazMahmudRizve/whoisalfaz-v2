const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13'
});

async function checkPosts() {
  const titles = [
    'CometChat',
    'Dify.ai vs n8n',
    'ManyChat Pricing',
    'Cold Outreach Machine'
  ];

  for (const t of titles) {
    const posts = await client.fetch(`*[_type == "post" && title match $t]{ _id, title, "slug": slug.current, "imageUrl": image.asset->url }`, { t: `*${t}*` });
    console.log(`\nResults for search '${t}':`);
    console.log(JSON.stringify(posts, null, 2));
  }
}

checkPosts().catch(console.error);
