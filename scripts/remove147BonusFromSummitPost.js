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
  const targetSlug = 'manychat-instagram-summit-2026-agenda-review-bonus';
  const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug: targetSlug });

  if (!post) {
    console.error(`Post not found for slug: ${targetSlug}`);
    process.exit(1);
  }

  console.log(`Cleaning post: [${post.slug.current}] - ${post.title}`);
  let body = post.body || '';

  // 1. Remove the arbitrary $49 / $147 valuation tags
  body = body.replaceAll('- **Value:** $49\n', '');
  body = body.replaceAll('- **Value:** $49', '');

  // 2. Remove "Bonus Pack" / "Claim Your Free Bonus" phrasing
  body = body.replaceAll(
    '## 📋 Step-by-Step: How to Register & Claim Your Free Bonus Pack',
    '## 📋 How to Download the Community Blueprint Pack'
  );
  body = body.replaceAll(
    'Step 3:** Head over to our [Bonus Claim Portal](/claim-manychat-bonus/)',
    'Step 3:** Access the [Community Blueprint Portal](/claim-manychat-bonus/)'
  );
  body = body.replaceAll(
    'Step 4:** Enter your name, email, and ManyChat reference ID.',
    'Step 4:** Enter your name and work email address.'
  );
  body = body.replaceAll(
    'Claim Your Free Summit Automation Pack',
    'Download the Community Blueprint Pack'
  );
  body = body.replaceAll(
    'Claim Your Free Automation Pack &rarr;',
    'Download Automation Blueprints &rarr;'
  );
  body = body.replaceAll(
    '👉 [**Claim Your Community n8n Blueprint Pack Here →**](/claim-manychat-bonus/)',
    '👉 [**Download Your Free n8n Blueprint Pack Here →**](/claim-manychat-bonus/)'
  );

  // 3. Clean table row if it mentions bonus
  body = body.replaceAll(
    'plus our **Free Community n8n Blueprint Pack**',
    'plus access to our community n8n blueprints'
  );

  // 4. Update the document in Sanity
  await client
    .patch(post._id)
    .set({ body })
    .commit();

  console.log('✅ Successfully removed $147 / $49 bonus valuations and cleaned up summit post in Sanity CMS!');
}

run().catch(err => {
  console.error('❌ Failed:', err);
  process.exit(1);
});
