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

async function fix308RedirectsInSanity() {
  console.log('Fetching all posts from Sanity to fix internal 308 redirect links...');
  const posts = await client.fetch(`*[_type == "post"]{ _id, title, body }`);

  let updatedCount = 0;

  for (const post of posts) {
    if (!post.body) continue;

    let newBody = post.body;

    // 1. Replace old /about/alfaz-mahmud-rizve/ links with /portfolio/
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/about\/alfaz-mahmud-rizve\/?/g, 'https://whoisalfaz.me/portfolio/');
    newBody = newBody.replace(/\/about\/alfaz-mahmud-rizve\/?/g, '/portfolio/');

    // 2. Replace old /blog/outstanding-ideas-for-saas-mvps/ with /blog/build-personal-ai-assistant/
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/blog\/outstanding-ideas-for-saas-mvps\/?/g, 'https://whoisalfaz.me/blog/build-personal-ai-assistant/');
    newBody = newBody.replace(/\/blog\/outstanding-ideas-for-saas-mvps\/?/g, '/blog/build-personal-ai-assistant/');

    // 3. Replace old /blog/outstanding-ideas-for-b2b-lead-generation/ with /blog/
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/blog\/outstanding-ideas-for-b2b-lead-generation\/?/g, 'https://whoisalfaz.me/blog/');
    newBody = newBody.replace(/\/blog\/outstanding-ideas-for-b2b-lead-generation\/?/g, '/blog/');

    // 4. Replace old /blog/outstanding-ideas-for-b2b-lead-capture/ with /blog/
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/blog\/outstanding-ideas-for-b2b-lead-capture\/?/g, 'https://whoisalfaz.me/blog/');
    newBody = newBody.replace(/\/blog\/outstanding-ideas-for-b2b-lead-capture\/?/g, '/blog/');

    // 5. Replace old /blog/outstanding-ideas-for-youtube-shorts/ with /blog/automated-youtube-shorts-generator/
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/blog\/outstanding-ideas-for-youtube-shorts\/?/g, 'https://whoisalfaz.me/blog/automated-youtube-shorts-generator/');
    newBody = newBody.replace(/\/blog\/outstanding-ideas-for-youtube-shorts\/?/g, '/blog/automated-youtube-shorts-generator/');

    // 6. Ensure trailing slashes on internal links
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/contact(?!\/)/g, 'https://whoisalfaz.me/contact/');
    newBody = newBody.replace(/https:\/\/whoisalfaz\.me\/blog\/case-study-veloryc-premium-ecommerce(?!\/)/g, 'https://whoisalfaz.me/blog/case-study-veloryc-premium-ecommerce/');

    if (newBody !== post.body) {
      console.log(`Fixing 308 redirect links in post: "${post.title}" (${post._id})`);
      await client.patch(post._id).set({ body: newBody }).commit();
      updatedCount++;
    }
  }

  console.log(`✅ Finished fixing 308 redirect links! Updated ${updatedCount} posts in Sanity.`);
}

fix308RedirectsInSanity().catch(err => {
  console.error('❌ Error fixing 308 redirect links:', err);
});
