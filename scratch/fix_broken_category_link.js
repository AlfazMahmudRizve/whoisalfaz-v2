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

const targetSlugs = [
  'zero-data-retention-enterprise-rag-vultr-vps',
  'manychat-alternatives-2026-top-tools-by-use-case'
];

async function inspectAndFix404() {
  for (const slug of targetSlugs) {
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
    if (!post) {
      console.log('Post not found:', slug);
      continue;
    }

    if (post.body && post.body.includes('/blog/category/technology')) {
      console.log(`Found broken link in ${slug}! Replacing with /blog/category/automation-tools/ ...`);
      const updatedBody = post.body.replace(/\/blog\/category\/technology\/?/g, '/blog/category/automation-tools/');
      await client.patch(post._id).set({ body: updatedBody }).commit();
      console.log(`✅ Fixed broken link in ${slug}!`);
    } else {
      console.log(`No broken link in ${slug}`);
    }
  }
}

inspectAndFix404().catch(console.error);
