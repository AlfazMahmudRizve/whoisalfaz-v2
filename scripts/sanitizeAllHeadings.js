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

async function run() {
  console.log('Scanning all posts for <mark> tags in headings...');
  const posts = await client.fetch('*[_type == "post"] { _id, "slug": slug.current, body }');
  
  let patchedCount = 0;
  for (const post of posts) {
    if (typeof post.body === 'string' && (post.body.includes('<mark>') || post.body.includes('</mark>'))) {
      // Replace <mark> and </mark> inside heading lines (e.g. ## <mark>Title</mark>)
      const cleanedBody = post.body.replace(/(#{1,6}\s*)<mark>(.*?)<\/mark>/g, '$1$2')
                                   .replace(/<mark>(.*?)<\/mark>/g, '$1');
      
      if (cleanedBody !== post.body) {
        console.log(`Sanitizing headings in ${post.slug}...`);
        await client
          .patch(post._id)
          .set({ body: cleanedBody })
          .commit();
        patchedCount++;
      }
    }
  }

  console.log(`\nSanitization complete! Patched ${patchedCount} posts.`);
}

run().catch(console.error);
