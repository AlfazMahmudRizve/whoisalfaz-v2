const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const updates = [
  {
    slug: 'apollo-vs-lusha-vs-aisdr-comparison',
    seoTitle: 'Apollo vs Lusha vs AiSDR [2026]: B2B Sales Prospecting', // 54 chars
    seoDescription: 'Apollo vs Lusha vs AiSDR comparison: Evaluate mobile direct-dial phone accuracy, B2B email enrichment, cost per meeting, and n8n waterfall prospecting.', // 154 chars
    faqsToAdd: `
### How do Apollo and Lusha compare on direct dial phone number accuracy?
Lusha generally delivers higher direct-dial accuracy (75%–85% verification rates) for enterprise and mid-market decision-makers due to its community-verified telephone intelligence. Apollo offers a substantially larger database and cheaper per-record credit costs, making it ideal for high-volume SMB prospecting. Leading RevOps teams run an n8n waterfall: querying Apollo first for low-cost discovery and cascading to Lusha for verified phone dials.

### How do mid-market RevOps teams evaluate Apollo versus Lusha?
Mid-market RevOps teams evaluate Apollo vs Lusha across four vectors: data coverage vs accuracy, outbound sequencing capabilities, CRM integration depth, and fully loaded annual seat pricing. Teams seeking an all-in-one dialer and email sequence platform choose Apollo, while teams with existing sales engagement tools (Salesloft/Outreach) often choose Lusha strictly as a pristine phone enrichment layer.
`
  },
  {
    slug: 'automate-personal-branding-with-n8n',
    seoTitle: 'Automate Personal Branding with n8n [2026 Blueprint]', // 52 chars
    seoDescription: 'Automate personal branding with n8n: Build an autonomous content refinery, social listening radar, and technical SEO watchdog for founders in 2026.', // 151 chars
    faqsToAdd: `
## Frequently Asked Questions

### Can you fully automate personal branding without sounding generic?
Yes, provided your automation architecture relies on a **Content Refinery model** rather than zero-shot AI generation. By taking your own long-form voice notes, podcast clips, or technical changelogs and routing them through an n8n agent chain with custom few-shot voice guidelines, the resulting social posts retain your genuine insights while eliminating manual drafting overhead.

### How does n8n handle human-in-the-loop approval before publishing?
In n8n, you configure a Slack or Telegram interactive notification node. When the AI generates a post draft, n8n sends a message with 'Approve', 'Edit', and 'Reject' buttons. The workflow pauses execution using the Wait node until you click 'Approve', ensuring no automated post goes live without human editorial sign-off.
`
  },
  {
    slug: 'manychat-whatsapp-b2b-lead-capture-agency',
    seoTitle: '[2026 Blueprint] ManyChat WhatsApp B2B Lead Capture SOP', // 55 chars
    seoDescription: 'Capture and qualify B2B leads on WhatsApp using ManyChat, n8n, and Brevo CRM. Agency blueprint for immediate webhook handshakes and automated lead scoring.', // 154 chars
    faqsToAdd: null
  },
  {
    slug: 'self-hosted-qdrant-docker-vultr',
    seoTitle: 'Self-Hosted Qdrant on Vultr: Docker & n8n RAG Setup [2026]', // 58 chars
    seoDescription: 'Deploy self-hosted Qdrant vector database on Vultr using Docker Compose and Caddy SSL. Complete SOP for kernel tuning, scalar quantization, and n8n RAG.', // 153 chars
    faqsToAdd: null
  },
  {
    slug: 'apollo-brevo-n8n-outbound-pipeline',
    seoTitle: '[Step-by-Step] Apollo to Brevo CRM via n8n Pipeline', // 51 chars
    seoDescription: 'Sync Apollo.io enriched B2B leads to Brevo CRM with n8n. Complete outbound pipeline with email deduplication, automated list hygiene, and sequence triggers.', // 154 chars
    faqsToAdd: null
  },
  {
    slug: 'n8n-debugging-error-handling-basics',
    seoTitle: 'n8n Debugging & Error Handling Basics [2026 Blueprint]', // 54 chars
    seoDescription: 'Master n8n debugging and error handling in production. Learn retry strategies, try-catch nodes, Error Trigger workflows, and automated Slack alert routing.', // 154 chars
    faqsToAdd: null
  },
  {
    slug: 'manychat-to-n8n-integration-lead-scoring',
    seoTitle: 'ManyChat to n8n Integration Guide [2026 Blueprint]', // 50 chars
    seoDescription: 'Connect ManyChat to n8n for automated AI lead scoring and CRM sync. Step-by-step webhook integration guide, JSON workflow blueprint, and Brevo routing.', // 151 chars
    faqsToAdd: null
  },
  {
    slug: 'automated-youtube-shorts-generator',
    seoTitle: 'Automated YouTube Shorts Generator: n8n [2026 Blueprint]', // 56 chars
    seoDescription: 'Build an automated YouTube Shorts generator with n8n, GPT-4o, and Creatomate. Complete blueprint to script, voice, render, and upload viral video Shorts.', // 154 chars
    faqsToAdd: null
  },
  {
    slug: 'case-study-cashops-financial-dashboard',
    seoTitle: '[Case Study] CashOps Financial Operations Architecture', // 54 chars
    seoDescription: 'Case study: How CashOps achieved zero-latency financial operations with Next.js optimistic UI, Web Worker CSV parsing, and local-first indexedDB analytics.', // 154 chars
    faqsToAdd: null
  }
];

async function run() {
  console.log(`🚀 Starting Batch 4 updates for ${updates.length} posts...`);

  for (const item of updates) {
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: item.slug });
    if (!post) {
      console.error(`❌ Post not found: ${item.slug}`);
      continue;
    }

    let body = post.body;
    if (item.faqsToAdd) {
      const faqHeader = '## Frequently Asked Questions';
      if (body.includes(faqHeader)) {
        body = body.replace(faqHeader, faqHeader + '\n' + item.faqsToAdd.replace('## Frequently Asked Questions\n', ''));
      } else {
        body = body + '\n\n' + item.faqsToAdd;
      }
    }

    const patchData = {
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      description: item.seoDescription,
      metaDescription: item.seoDescription
    };
    if (item.faqsToAdd) {
      patchData.body = body;
    }

    await client.patch(post._id).set(patchData).commit();
    console.log(`✅ Successfully updated: ${item.slug}`);
  }

  console.log('🎉 All Batch 4 posts updated in Sanity!');
}

run().catch(console.error);
