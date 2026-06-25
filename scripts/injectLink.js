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

async function main() {
  const [postId, targetText, replacementText] = process.argv.slice(2);

  if (!postId || !targetText || !replacementText) {
    console.error('Usage: node injectLink.js <postId> <targetText> <replacementText>');
    process.exit(1);
  }

  try {
    console.log(`Fetching post: ${postId}...`);
    const post = await client.getDocument(postId);

    if (!post) {
      // Try fetching by slug
      console.log(`Document not found by ID. Querying by slug: ${postId}...`);
      const results = await client.fetch(`*[_type == "post" && slug.current == $slug]`, { slug: postId });
      if (results && results.length > 0) {
        console.log(`Found post by slug. Document ID: ${results[0]._id}`);
        await injectIntoDocument(results[0]._id, results[0].body, targetText, replacementText);
      } else {
        console.error(`❌ Post not found for ID/slug: ${postId}`);
        process.exit(1);
      }
    } else {
      await injectIntoDocument(post._id, post.body, targetText, replacementText);
    }
  } catch (error) {
    console.error('❌ Failed to fetch/update post:', error.message);
    process.exit(1);
  }
}

async function injectIntoDocument(docId, body, targetText, replacementText) {
  if (!body) {
    console.error('❌ Document has no body content.');
    process.exit(1);
  }

  if (!body.includes(targetText)) {
    console.error(`❌ Target text not found in body:\n"${targetText}"`);
    process.exit(1);
  }

  console.log(`Target text found. Replacing...`);
  const newBody = body.replace(targetText, replacementText);

  console.log(`Patching Sanity document: ${docId}...`);
  const result = await client.patch(docId).set({ body: newBody }).commit();
  console.log(`✅ Success! Updated post body. Transaction ID: ${result._id}`);
}

main().catch(console.error);
