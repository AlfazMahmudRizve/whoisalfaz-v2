const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function main() {
  const post = await client.fetch('*[slug.current == $slug][0]{ _id, body, schemaMarkup }', {
    slug: 'manychat-to-n8n-integration-lead-scoring'
  });

  if (!post) {
    console.error('Post not found');
    return;
  }

  console.log('Post ID:', post._id);
  let body = post.body;

  // Check if HowTo is inside a script tag in the body
  const howToRegex = /<script type=["']application\/ld\+json["']>[\s\S]*?"@type":\s*"HowTo"[\s\S]*?<\/script>/gi;
  if (howToRegex.test(body)) {
    console.log('Found HowTo script tag in body! Removing...');
    body = body.replace(howToRegex, '').trim();
    
    // Also remove empty trailing lines or leftover formatting
    body = body.replace(/\n{3,}/g, '\n\n');

    await client.patch(post._id).set({ body }).commit();
    console.log('✅ Successfully removed deprecated HowTo schema from body and committed to Sanity!');
  } else {
    console.log('No HowTo script tag matched by regex in body. Checking schemaMarkup...');
  }

  // Also check schemaMarkup field if any HowTo exists there
  if (post.schemaMarkup && post.schemaMarkup.includes('"HowTo"')) {
    console.log('Found HowTo in schemaMarkup field. Removing...');
    // If schemaMarkup is purely HowTo, unset or remove
    try {
      const parsed = JSON.parse(post.schemaMarkup);
      if (parsed['@type'] === 'HowTo') {
        await client.patch(post._id).unset(['schemaMarkup']).commit();
        console.log('✅ Unset HowTo schemaMarkup field in Sanity!');
      }
    } catch (e) {
      console.log('schemaMarkup not JSON, checking regex');
    }
  }
}

main().catch(console.error);
