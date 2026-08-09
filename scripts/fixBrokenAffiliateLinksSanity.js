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

async function fixSanityAuditIssues() {
  console.log('Fetching all posts from Sanity to audit links & H1 structure...');
  const posts = await client.fetch(`*[_type == "post"]{ _id, title, body }`);

  let updatedCount = 0;

  for (const post of posts) {
    if (!post.body) continue;

    let newBody = post.body;

    // 1. Fix 403 Forbidden Vultr Raw Links by converting to cloaked route
    newBody = newBody.replace(/https:\/\/www\.vultr\.com\/\?ref=[a-zA-Z0-9-]+/g, 'https://whoisalfaz.me/go/vultr-promo/');

    // 2. Fix Dead Affiliate Links (n8n, Brevo)
    newBody = newBody.replace(/https:\/\/n8n\.partnerlinks\.io\/[a-zA-Z0-9]+/g, 'https://whoisalfaz.me/go/n8n/');
    newBody = newBody.replace(/https:\/\/get\.brevo\.com\/[a-zA-Z0-9]+/g, 'https://whoisalfaz.me/go/brevo/');

    // 3. Fix Duplicate H1 Tags: Convert leading "# Heading" in body to "## Heading"
    // (Since the page template renders the main title as the <h1>)
    newBody = newBody.replace(/^#\s+(.+)$/gm, '## $1');

    // 4. Fix Empty Anchor Text Links: Ensure links have descriptive anchor text
    newBody = newBody.replace(/\[\s*\]\((https:\/\/whoisalfaz\.me\/services\/?[^)]*)\)/g, '[Explore Automation Services]($1)');
    newBody = newBody.replace(/\[\s*\]\((https:\/\/whoisalfaz\.me\/go\/vultr-promo\/?[^)]*)\)/g, '[Claim Vultr Cloud Credits]($1)');
    newBody = newBody.replace(/\[\s*\]\((https:\/\/urbancafe\.whoisalfaz\.me\/?)\)/g, '[Urban Cafe Demo Platform]($1)');

    if (newBody !== post.body) {
      console.log(`Fixing audit issues in post: "${post.title}" (${post._id})`);
      await client.patch(post._id).set({ body: newBody }).commit();
      updatedCount++;
    }
  }

  console.log(`✅ Finished fixing Sanity audit issues! Updated ${updatedCount} posts in Sanity.`);
}

fixSanityAuditIssues().catch(err => {
  console.error('❌ Error fixing Sanity audit issues:', err);
});
