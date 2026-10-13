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

const MANYCHAT_GO_URL = 'https://whoisalfaz.me/go/manychat/';
const CLAIM_BONUS_URL = '/claim-manychat-bonus/';

async function repairPost(post) {
  let body = post.body || '';
  let affiliates = Array.isArray(post.affiliates) ? [...post.affiliates] : [];
  let modified = false;

  // 1. Ensure 'manychat' is included in affiliates array for core ManyChat posts
  const isCoreManyChatPost = [
    'manychat-to-n8n-integration-lead-scoring',
    'manychat-pricing-2026',
    'manychat-n8n-async-timeout-fix',
    'manychat-whatsapp-b2b-lead-capture-agency',
    'manychat-n8n-whatsapp-voice-bot',
    'manychat-alternatives-2026-top-tools-by-use-case',
    'manychat-instagram-summit-2026-agenda-review-bonus'
  ].includes(post.slug);

  if (isCoreManyChatPost && !affiliates.includes('manychat')) {
    affiliates.unshift('manychat');
    modified = true;
    console.log(`   ➕ Added 'manychat' to affiliates array`);
  }

  // 2. Post-specific link and content repairs

  // A. manychat-instagram-summit-2026-agenda-review-bonus
  if (post.slug === 'manychat-instagram-summit-2026-agenda-review-bonus') {
    // Repair broken #blueprints hashtag links back to the live bonus claim page
    if (body.includes('#blueprints')) {
      body = body.replaceAll('(#blueprints)', `(${CLAIM_BONUS_URL})`);
      modified = true;
      console.log(`   🔄 Repaired #blueprints links -> ${CLAIM_BONUS_URL}`);
    }

    // Repair Step 1 and Step 3 instructions to be clear and high-converting
    if (body.includes('Step 3:** Head over to our [Bonus Claim Portal](#blueprints)')) {
      body = body.replace(
        'Step 3:** Head over to our [Bonus Claim Portal](#blueprints)',
        `Step 3:** Head over to our [Bonus Claim Portal](${CLAIM_BONUS_URL})`
      );
      modified = true;
    }

    // Ensure official summit registration and partner links are active
    if (!body.includes(MANYCHAT_GO_URL)) {
      body = body.replace(
        'When you register for your virtual pass through our [Summit registration link](https://igsummit.manychat.com/virtual)',
        `When you register for your virtual pass or set up your [ManyChat Account](${MANYCHAT_GO_URL})`
      );
      modified = true;
    }
  }

  // B. manychat-pricing-2026
  if (post.slug === 'manychat-pricing-2026') {
    // Re-link plain bold ManyChat instances in key high-intent places
    if (!body.includes(`[ManyChat Pro](${MANYCHAT_GO_URL})`)) {
      body = body.replace(
        'If you run an agency or e-commerce brand, ManyChat Pro is practically mandatory',
        `If you run an agency or e-commerce brand, [ManyChat Pro](${MANYCHAT_GO_URL}) is practically mandatory`
      );
      modified = true;
    }
    if (!body.includes(`[Test ManyChat Pro Free Trial](${MANYCHAT_GO_URL})`)) {
      body = body.replace(
        '### 2. Pro Plan (Scale-Based Tiering)',
        `### 2. Pro Plan (Scale-Based Tiering)\n\n> 🚀 **Partner Offer:** [Test ManyChat Pro Free Trial](${MANYCHAT_GO_URL}) to unlock unlimited automations, team seats, and native Meta AI agent nodes.`
      );
      modified = true;
    }
    // Ensure final CTA uses the tracked affiliate URL
    if (body.includes('](https://manychat.com)')) {
      body = body.replaceAll('](https://manychat.com)', `](${MANYCHAT_GO_URL})`);
      modified = true;
    }
  }

  // C. manychat-to-n8n-integration-lead-scoring
  if (post.slug === 'manychat-to-n8n-integration-lead-scoring') {
    // Re-link first occurrence of ManyChat in requirements
    if (!body.includes(`[ManyChat Account](${MANYCHAT_GO_URL})`)) {
      body = body.replace(
        '1. **ManyChat Pro Account**',
        `1. **[ManyChat Pro Account](${MANYCHAT_GO_URL})**`
      );
      modified = true;
    }
    // Re-link external request node section
    if (!body.includes(`[ManyChat Automation Dashboard](${MANYCHAT_GO_URL})`)) {
      body = body.replace(
        '### Step 1: Configure the ManyChat Trigger',
        `### Step 1: Configure the ManyChat Trigger\n\nInside your [ManyChat Automation Dashboard](${MANYCHAT_GO_URL}), create a new automation flow triggered by user comment or direct message.`
      );
      modified = true;
    }
    // Replace any raw https://manychat.com
    if (body.includes('](https://manychat.com)')) {
      body = body.replaceAll('](https://manychat.com)', `](${MANYCHAT_GO_URL})`);
      modified = true;
    }
  }

  // D. manychat-n8n-async-timeout-fix
  if (post.slug === 'manychat-n8n-async-timeout-fix') {
    if (!body.includes(MANYCHAT_GO_URL)) {
      body = body.replace(
        'ManyChat is the undisputed industry standard for Instagram DM',
        `[ManyChat](${MANYCHAT_GO_URL}) is the undisputed industry standard for Instagram DM`
      );
      body = body.replace(
        '## Conclusion',
        `## Conclusion\n\nIf you haven't deployed your Instagram DM infrastructure yet, create your [ManyChat Account](${MANYCHAT_GO_URL}) and implement this asynchronous queue architecture before scaling ad spend.\n`
      );
      modified = true;
    }
  }

  // E. manychat-whatsapp-b2b-lead-capture-agency
  if (post.slug === 'manychat-whatsapp-b2b-lead-capture-agency') {
    if (!body.includes(MANYCHAT_GO_URL)) {
      body = body.replace(
        'WhatsApp marketing has emerged as the highest-converting B2B channel',
        `Pairing [ManyChat WhatsApp Automation](${MANYCHAT_GO_URL}) with n8n has emerged as the highest-converting B2B channel`
      );
      body = body.replace(
        '## Why WhatsApp + n8n Beats Monolithic CRMs',
        `## Why WhatsApp + n8n Beats Monolithic CRMs\n\nWith a [ManyChat WhatsApp Account](${MANYCHAT_GO_URL}), you bypass bloated enterprise licensing while gaining sub-second conversational engagement.\n`
      );
      modified = true;
    }
  }

  // F. manychat-n8n-whatsapp-voice-bot
  if (post.slug === 'manychat-n8n-whatsapp-voice-bot') {
    if (!body.includes(MANYCHAT_GO_URL)) {
      body = body.replace(
        'By combining ManyChat, n8n, and ElevenLabs',
        `By combining [ManyChat](${MANYCHAT_GO_URL}), n8n, and ElevenLabs`
      );
      modified = true;
    }
  }

  // G. manychat-alternatives-2026-top-tools-by-use-case
  if (post.slug === 'manychat-alternatives-2026-top-tools-by-use-case') {
    if (!body.includes(MANYCHAT_GO_URL)) {
      body = body.replace(
        '### 1. ManyChat (The Benchmark for Instagram & Messenger)',
        `### 1. [ManyChat](${MANYCHAT_GO_URL}) (The Benchmark for Instagram & Messenger)`
      );
      modified = true;
    }
  }

  return { body, affiliates, modified };
}

async function main() {
  console.log('🚀 INITIATING SURGICAL REPAIR OF ALL MANYCHAT CONTENT, AFFILIATES & LINKS...\n');

  const posts = await client.fetch(`*[_type == "post"] {
    _id,
    title,
    "slug": slug.current,
    body,
    affiliates
  }`);

  const repairedPosts = [];

  for (const post of posts) {
    const { body, affiliates, modified } = await repairPost(post);

    if (modified) {
      console.log(`🛠️ Repairing [${post.slug}] (ID: ${post._id})...`);
      await client.patch(post._id).set({
        body,
        affiliates
      }).commit();
      console.log(`   ✅ Successfully repaired and updated [${post.slug}] in Sanity!`);
      repairedPosts.push(post.slug);
    }
  }

  console.log(`\n🎉 Completed ManyChat Content & Link Repairs across ${repairedPosts.length} posts!`);
  console.log('Repaired slugs:', JSON.stringify(repairedPosts, null, 2));
}

main().catch(err => {
  console.error('❌ Error repairing ManyChat links:', err);
  process.exit(1);
});
