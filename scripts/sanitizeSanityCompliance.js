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

const cleanCallout = `> 🎟️ **Industry Event [2026]:** Looking to scale Instagram DM automation, AI chat agents, and high-converting message funnels? ManyChat is hosting their virtual **[Instagram Summit](https://igsummit.manychat.com/virtual)** featuring live masterclasses from top agency leaders.
>
> 💡 *Community Resource: Download our free [Community n8n Blueprint Pack](/claim-manychat-bonus/) to decouple high-volume webhooks and enrich lead data in real time.*`;

async function sanitize() {
  console.log('🧹 Starting Sanity CMS compliance sanitization...\n');

  const posts = await client.fetch('*[_type == "post" && (body match "*manychat*" || body match "*5e9c7e02098b*" || body match "*147*")]{ _id, title, seoTitle, "slug": slug.current, body }');

  console.log(`Fetched ${posts.length} posts to inspect.\n`);

  for (const post of posts) {
    if (!post.body || typeof post.body !== 'string') continue;

    let body = post.body;
    let title = post.title;
    let seoTitle = post.seoTitle;
    let changed = false;

    if (post.slug === 'manychat-instagram-summit-2026-agenda-review-bonus') {
      title = 'ManyChat Instagram Summit 2026: Agenda, Keynotes & Blueprint Pack';
      seoTitle = '[2026 Blueprint] ManyChat Instagram Summit & Agenda Review';
      changed = true;

      // Clean body of pillar post
      body = body.replaceAll('https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack', 'https://igsummit.manychat.com/virtual');
      body = body.replaceAll('official partner link', 'Summit registration link');
      body = body.replaceAll('Official ManyChat Summit Partner Link', 'ManyChat Summit Registration');
      body = body.replaceAll('Official partner link', 'Summit registration link');
      body = body.replaceAll('our partner link', 'the Summit registration link');
      body = body.replaceAll('$147 n8n Automation Companion Pack', 'Free Community n8n Blueprint Pack');
      body = body.replaceAll('$147 n8n Companion Blueprint Pack', 'Free Community n8n Blueprint Pack');
      body = body.replaceAll('$147 n8n Bonus Pack', 'Free Community n8n Blueprint Pack');
      body = body.replaceAll('$147 Automation Companion Pack', 'Community n8n Blueprint Pack');
      body = body.replaceAll('Exclusive $147 Automation Companion Bonus Pack (Free With Your Pass)', 'Free Community n8n Automation Blueprint Pack');
      body = body.replaceAll('## 🎁 Exclusive $147 Automation Companion Bonus Pack (Free With Your Pass)', '## 🎁 Free Community n8n Automation Blueprint Pack');
      body = body.replaceAll('To eliminate the technical bottlenecks taught at the event, we are bundling our complete **$147 n8n Automation Companion Pack** 100% free when you register through our [official partner link](https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack).', 'To eliminate the technical bottlenecks taught at the event, we provide our complete **Community n8n Automation Blueprint Pack** 100% free for builders and agencies.');
      body = body.replaceAll('When you register for your virtual pass through our [official partner link](https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack), you receive 3 production-ready', 'To support builders deploying these workflows, we provide 3 production-ready');
      body = body.replaceAll('1. **Step 1:** Purchase your Virtual Pass ($20) using our [Official ManyChat Summit Partner Link](https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack).', '1. **Step 1:** Review the summit schedule at [ManyChat Virtual Summit](https://igsummit.manychat.com/virtual).');
      body = body.replaceAll('2. **Step 2:** Note your ManyChat order confirmation or ticket ID.', '2. **Step 2:** Visit the free blueprint download portal at [whoisalfaz.me/claim-manychat-bonus/](/claim-manychat-bonus/).');
      body = body.replaceAll('3. **Step 3:** Visit [whoisalfaz.me/claim-manychat-bonus/](/claim-manychat-bonus/) and submit your details.', '3. **Step 3:** Enter your name and email to immediately receive direct download access.');
      body = body.replaceAll('4. **Step 4:** Your production JSON workflows and architecture guide will be delivered instantly to your inbox via Brevo.', '4. **Step 4:** Your production JSON workflows and architecture documentation are delivered instantly.');
      body = body.replaceAll('Claim Your $147 Automation Companion Pack Here →', 'Download Free Automation Blueprint Pack Here →');
      body = body.replaceAll('What is included in the $147 n8n Automation Companion Pack?', 'What is included in the Community n8n Automation Blueprint Pack?');
      body = body.replaceAll('$147', 'free community');
    } else {
      if (body.includes('igsummit.manychat.com') || body.includes('5e9c7e02098b') || body.includes('Featured Partner Event')) {
        changed = true;
        body = body.replace(/> 🎟️ \*\*[\s\S]*?\n\n/g, cleanCallout + '\n\n');
        body = body.replaceAll('https://igsummit.manychat.com/virtual?utm_source=5e9c7e02098b&utm_campaign=partnerstack', 'https://igsummit.manychat.com/virtual');
        body = body.replaceAll('?utm_source=5e9c7e02098b&utm_campaign=partnerstack', '');
      }
    }

    if (changed) {
      console.log(`Updating post: [${post.slug}]...`);
      const patch = client.patch(post._id).set({ body });
      if (title !== post.title) patch.set({ title });
      if (seoTitle !== post.seoTitle) patch.set({ seoTitle });
      await patch.commit();
      console.log(`✅ Post [${post.slug}] sanitized successfully!\n`);
    }
  }

  console.log('✨ All Sanity CMS posts verified and sanitized.');
}

sanitize().catch(console.error);
