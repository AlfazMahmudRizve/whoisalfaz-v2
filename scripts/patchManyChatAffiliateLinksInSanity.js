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
  console.log('🔍 Scanning Sanity posts for direct https://manychat.com links to monetize...');
  const posts = await client.fetch('*[_type == "post"]{ _id, "slug": slug.current, title, body }');

  let patchedCount = 0;

  for (const post of posts) {
    if (!post.body) continue;

    // Check if post links to https://manychat.com (without being an internal article or deep summit link unless intended)
    // Specifically targeting markdown links: ](https://manychat.com) or ](https://manychat.com/)
    const hasRawLink = post.body.includes('](https://manychat.com)') || post.body.includes('](https://manychat.com/)');

    if (hasRawLink) {
      console.log(`\n🎯 Found direct ManyChat link in: [${post.slug}] (${post.title})`);
      const updatedBody = post.body
        .replace(/\]\(https:\/\/manychat\.com\/?\)/g, '](https://whoisalfaz.me/go/manychat/)');

      try {
        await client
          .patch(post._id)
          .set({ body: updatedBody })
          .commit();

        patchedCount++;
        console.log(`   ✅ Patched [${post.slug}] with https://whoisalfaz.me/go/manychat/`);
      } catch (err) {
        console.error(`   ❌ Failed to patch [${post.slug}]:`, err.message);
      }
    }
  }

  console.log(`\n🎉 Successfully patched ${patchedCount} posts in Sanity CMS!`);
}

run();
