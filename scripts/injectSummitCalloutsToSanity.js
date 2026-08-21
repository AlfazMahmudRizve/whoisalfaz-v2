const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '1y4vj0w2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_SECRET_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01'
});

const referralUrl = "https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack";

const calloutMarkdown = `

> 🎟️ **Live Virtual Event Recommendation [2026]:** Looking to scale Instagram DM automation, AI chat agents, and high-converting message funnels for your agency or e-commerce store? ManyChat is hosting their official **[Instagram Summit (Virtual Edition)](${referralUrl})** featuring live masterclasses from the top 1% of agency leaders and automation architects. **[Claim your virtual summit pass here →](${referralUrl})**

`;

async function injectCallouts() {
  console.log('🚀 Updating ManyChat blog posts with official Instagram Summit recommendation...\n');

  const posts = await client.fetch(`*[_type == "post" && slug.current match "*manychat*"]{
    _id,
    title,
    "slug": slug.current,
    body
  }`);

  for (const post of posts) {
    if (typeof post.body === 'string') {
      if (post.body.includes('igsummit.manychat.com')) {
        console.log(`   ⏭️ [${post.slug}] already contains Summit link.`);
        continue;
      }

      // Inject callout after the first H2 or at the end
      let updatedBody = post.body;
      const firstH2Index = updatedBody.indexOf('## ');
      if (firstH2Index !== -1) {
        const nextParagraphEnd = updatedBody.indexOf('\n\n', firstH2Index + 4);
        if (nextParagraphEnd !== -1) {
          updatedBody = updatedBody.slice(0, nextParagraphEnd) + '\n' + calloutMarkdown + '\n' + updatedBody.slice(nextParagraphEnd);
        } else {
          updatedBody += '\n\n' + calloutMarkdown;
        }
      } else {
        updatedBody += '\n\n' + calloutMarkdown;
      }

      await client.patch(post._id).set({ body: updatedBody }).commit();
      console.log(`   ✅ Injected Summit Callout into [${post.slug}]!`);
    }
  }

  console.log('\n✨ All ManyChat articles in Sanity CMS updated successfully!');
}

injectCallouts().catch(console.error);
