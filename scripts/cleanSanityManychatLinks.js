const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-05-13',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function cleanPost(post) {
  let body = post.body || '';
  const originalLength = body.length;

  // 1. Remove the Summit Callout banner from any post
  const calloutRegex = /> 🎟️ \*\*Industry Event \[2026\]:\*\*[\s\S]*?> 💡 \*Community Resource:[^\n]*\n?/g;
  body = body.replace(calloutRegex, '');

  // 2. Remove dead partnerlinks or /go/manychat
  body = body.replaceAll('https://manychat.partnerlinks.io/jugrrxxzawym', 'https://manychat.com');
  
  // 3. For manychat-to-n8n-integration-lead-scoring:
  // Convert spammy [ManyChat](/go/manychat) to clean **ManyChat**, leaving first occurrence as official link
  if (post.slug === 'manychat-to-n8n-integration-lead-scoring') {
    body = body.replace(/href="\/go\/manychat"/g, 'href="https://manychat.com" target="_blank" rel="noopener noreferrer"');
    
    // First occurrence
    let first = true;
    body = body.replace(/\[ManyChat\]\(\/go\/manychat\)/g, () => {
      if (first) {
        first = false;
        return '[ManyChat](https://manychat.com)';
      }
      return '**ManyChat**';
    });
  }

  // 4. For manychat-pricing-2026:
  if (post.slug === 'manychat-pricing-2026') {
    body = body.replace(/\[ManyChat\]\(\/go\/manychat\)/g, '**ManyChat**');
    body = body.replace(/\[\*\*Get started with ManyChat →\*\*\]\(\/go\/manychat\)/g, '[**Visit ManyChat Official Site →**](https://manychat.com)');
  }

  // 5. For any remaining /go/manychat links in other posts
  body = body.replaceAll('/go/manychat', 'https://manychat.com');

  // 6. For manychat-instagram-summit-2026-agenda-review-bonus:
  if (post.slug === 'manychat-instagram-summit-2026-agenda-review-bonus') {
    body = body.replaceAll('/claim-manychat-bonus/', '#blueprints');
    body = body.replaceAll('When you register for your virtual pass through our [Summit registration link](https://igsummit.manychat.com/virtual), you receive 3 production-ready, battle-tested n8n workflow blueprints:', 'Below are 3 production-ready, battle-tested n8n workflow blueprints for ManyChat operators:');
    body = body.replaceAll('1. **Step 1:** Purchase your Virtual Pass ($20) using our [ManyChat Summit Registration](https://igsummit.manychat.com/virtual).', '1. **Step 1:** Review the sessions and speakers on the [ManyChat Summit Agenda](https://igsummit.manychat.com/virtual).');
    body = body.replaceAll('3. **Step 3:** Head over to our [Bonus Claim Portal](/claim-manychat-bonus/).', '3. **Step 3:** Deploy the open-source n8n blueprint templates below.');
    body = body.replaceAll('👉 [**Claim Your Community n8n Blueprint Pack Here →**](/claim-manychat-bonus/)', '👉 [**Explore n8n Community Blueprints on GitHub →**](https://github.com/AlfazMahmudRizve)');
  }

  // 7. Clean affiliates array: remove 'manychat'
  let affiliates = post.affiliates || [];
  if (Array.isArray(affiliates)) {
    affiliates = affiliates.filter(a => a !== 'manychat');
  }

  return { body, affiliates, changed: (body !== post.body || JSON.stringify(affiliates) !== JSON.stringify(post.affiliates)) };
}

async function main() {
  console.log('🔍 Fetching all posts from Sanity to scrub ManyChat affiliate / 404 links...\n');

  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    "slug": slug.current,
    body,
    affiliates
  }`);

  const modifiedPosts = [];

  for (const post of posts) {
    const { body, affiliates, changed } = await cleanPost(post);
    if (changed) {
      console.log(`Patching [${post.slug}] (ID: ${post._id})...`);
      await client.patch(post._id).set({
        body,
        affiliates
      }).commit();
      console.log(`✅ Cleaned ManyChat links in ${post.slug}`);
      modifiedPosts.push(post.slug);
    }
  }

  console.log(`\n🎉 Successfully scrubbed ManyChat 404/affiliate links across ${modifiedPosts.length} posts in Sanity CMS!`);
  fs.writeFileSync('scratch/cleaned_manychat_posts.json', JSON.stringify(modifiedPosts, null, 2));
}

main().catch(err => {
  console.error('❌ Error scrubbing ManyChat links:', err);
  process.exit(1);
});
