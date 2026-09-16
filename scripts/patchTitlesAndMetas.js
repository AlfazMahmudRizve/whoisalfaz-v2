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

const TITLE_UPDATES = {
  'databox-revops-dashboard-pipeline-velocity': 'Databox RevOps Dashboards: Pipeline Velocity & n8n SOP',
  'dify-ai-vultr-gpu-docker-deployment-guide': 'Dify.ai Vultr GPU Docker Guide: AI Stack Blueprint [2026]',
  'manychat-instagram-summit-2026-agenda-review-bonus': 'ManyChat Instagram Summit 2026: Agenda & Bonus Guide [2026]',
  'scaling-qdrant-vector-database-to-10-million-embeddings': 'Scale Qdrant Vector DB to 10M Embeddings: Vultr SOP [2026]',
  'waterfall-data-enrichment-pipeline-n8n-guide': 'Waterfall Data Enrichment: n8n, Apollo & Lusha Guide [2026]'
};

const META_UPDATES = {
  'case-study-whoisalfaz-seo-indexing-engine': 'Architecture teardown of a zero-touch Next.js SEO indexing pipeline supporting Bing, Google Ping, and IndexNow — eliminating manual submissions forever.',
  'aisdr-vs-human-sdr-performance-teardown': 'Compare AiSDR vs Human SDR costs, reply rates, and pipeline ROI. Build a production hybrid outbound engine using n8n, Apollo.io, and Brevo automation.',
  'apollo-brevo-n8n-outbound-pipeline': 'Build a production Apollo.io to n8n to Brevo outbound pipeline with lead deduplication, ICP scoring, sequence triggering, and circular sync protection.',
  'manychat-n8n-async-timeout-fix': "Fix ManyChat's 10-second webhook timeout using n8n async queues. Production tutorial on decoupled webhooks, Redis queues, and async REST handoffs.",
  'manychat-whatsapp-b2b-lead-capture-agency': 'Build a WhatsApp B2B lead capture engine with ManyChat and n8n. Solve the 10-second timeout, Meta 24h window, and automate agency client lead scoring.',
  'n8n-apollo-lead-enrichment-pipeline': 'Build a production B2B lead enrichment pipeline with n8n and Apollo.io. Step-by-step guide covering AI lead scoring, async webhooks, and CRM data sync.',
  'outstanding-ideas-for-b2b-lead-capture': 'Transform low-converting B2B forms into automated lead capture engines. 10 proven capture tactics, form enrichment stacks, and n8n webhook workflows.',
  'outstanding-ideas-for-saas-mvps': 'Discover 10 high-margin SaaS MVP ideas for 2026. Build production micro-SaaS products in days using n8n, Next.js, Supabase, and autonomous AI agents.',
  'outstanding-ideas-for-youtube-shorts': 'Stop editing videos manually. Build an automated YouTube Shorts generator using n8n, OpenAI, ElevenLabs, and Creatomate. Complete technical creator SOP.',
  'case-study-cashops-financial-dashboard': 'Architecture teardown of CashOps.app: zero-latency data visualization, local-first React Context state management, and high-velocity automated workflows.',
  'manychat-alternatives-2026-top-tools-by-use-case': 'Top ManyChat alternatives in 2026 for Instagram DM automation, WhatsApp API, e-commerce, and AI support. Compare pricing, features, and migration steps.',
  'revops-automation-stack-saas-2026': 'Eliminate B2B manual bottlenecks. Explore our 3-tier SaaS RevOps blueprint, weighted Round-Robin routing algorithms, and circular sync resolution rules.',
  'trainual-alternatives-active-agency-sop-engine': 'Explore top Trainual alternatives. Build an active agency SOP engine using n8n and JavaScript to automate team onboarding, tasks, and documentation.',
  'what-is-revops-technical-definition-saas': 'RevOps is not just a team rename. Here is the technical definition — data unification, pipeline governance, and automation architecture built for SaaS.'
};

async function main() {
  console.log('=== Patching Titles Exceeding 60 Characters ===');
  for (const [slug, newTitle] of Object.entries(TITLE_UPDATES)) {
    console.log(`Checking title for slug: ${slug}...`);
    const doc = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });
    if (doc) {
      console.log(`Updating ${slug} title (len: ${newTitle.length}): "${newTitle}"`);
      await client
        .patch(doc._id)
        .set({ seoTitle: newTitle })
        .commit();
      console.log(`✓ Updated seoTitle on ${doc._id}`);
    } else {
      console.warn(`Doc not found for ${slug}`);
    }
  }

  console.log('\n=== Patching Meta Descriptions Exceeding 158 Characters ===');
  for (const [slug, newDesc] of Object.entries(META_UPDATES)) {
    console.log(`Checking meta for slug: ${slug}...`);
    const doc = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug });
    if (doc) {
      console.log(`Updating ${slug} meta (len: ${newDesc.length}): "${newDesc}"`);
      await client
        .patch(doc._id)
        .set({
          seoDescription: newDesc,
          excerpt: newDesc
        })
        .commit();
      console.log(`✓ Updated seoDescription & excerpt on ${doc._id}`);
    } else {
      console.warn(`Doc not found for ${slug}`);
    }
  }

  console.log('\nAll title and meta patches applied successfully!');
}

main().catch(console.error);
