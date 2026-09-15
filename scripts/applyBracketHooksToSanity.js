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

const bracketHooksMap = {
  "case-study-client-portfolio-delivery": "[Case Study] Next.js Client Portfolio Architecture",
  "case-study-urban-cafe-foodtech-platform": "[Case Study] Zero-Hardware Kitchen POS Next.js PWA",
  "case-study-whoisalfaz-seo-indexing-engine": "[Case Study] Automated SEO Indexing Pipeline Engine",
  "case-study-veloryc-premium-ecommerce": "[Case Study] Veloryc E-Commerce Operations System",
  "accelerated-growth-studio-plg-playbook": "[2026 Blueprint] Accelerated Growth Studio n8n Funnel",
  "adcreative-ai-review-n8n-ad-refresh-loop": "[SOP Guide] AdCreative.ai & n8n Ad Refresh Loop in Meta",
  "aisdr-vs-human-sdr-performance-teardown": "[Benchmark] AiSDR vs Human SDR: B2B SaaS Outbound Sales",
  "aisdr-vs-human-sdr-unit-economics-benchmark": "[Benchmark] AiSDR vs Human SDR: Outbound Unit Economics",
  "apollo-brevo-n8n-outbound-pipeline": "[Step-by-Step] Apollo to Brevo CRM via n8n Pipeline",
  "apollo-to-brevo-n8n-pipeline-guide": "[SOP Guide] Apollo to Brevo Automated Outreach via n8n",
  "apollo-vs-lusha-vs-aisdr-comparison": "[Benchmark] Apollo vs Lusha vs AiSDR: B2B Sales Stack",
  "automated-pdf-document-chunking-vectorization-n8n": "[Step-by-Step] Automated PDF Document Chunking in n8n",
  "brevo-cold-email-ip-warming-guide": "[SOP Guide] Brevo Cold Email & IP Warming Deliverability",
  "building-an-enterprise-knowledge-graph-rag-n8n": "[2026 Blueprint] Enterprise Knowledge Graph RAG in n8n",
  "building-multi-tenant-vector-search-n8n-qdrant": "[2026 Blueprint] Multi-Tenant Vector Search with Qdrant",
  "closed-loop-lead-attribution-engine": "[SOP Guide] Closed-Loop Lead Attribution Engine in n8n",
  "cold-email-machine-apollo-aisdr-brevo": "[Step-by-Step] Build Cold Email Machine: Apollo & Brevo",
  "cometchat-dify-inapp-voice": "[SOP Guide] CometChat & Dify In-App Voice AI Integration",
  "corrective-rag-crag-blueprint-n8n-tavily-fallback": "[2026 Blueprint] Corrective RAG (CRAG) in n8n & Tavily",
  "corrective-rag-crag-n8n-blueprint": "[2026 Blueprint] Corrective RAG in n8n Vector DB Search",
  "databox-revops-dashboard-pipeline-velocity": "[SOP Guide] Databox RevOps Dashboard & Pipeline Velocity",
  "dify-vs-n8n-architecture": "[Benchmark] Dify.ai vs n8n: Docker & API Architecture",
  "elevenlabs-n8n-voice-ai-sales-agent": "[Step-by-Step] ElevenLabs n8n Voice AI Agent with Twilio",
  "emergent-ai-autonomous-gtm-guide": "[2026 Blueprint] Emergent AI Autonomous GTM in n8n SaaS",
  "headless-wordpress-seo-nextjs-guide": "[SOP Guide] Headless WordPress SEO in Next.js 15 App",
  "headless-wordpress-vs-monolithic": "[Benchmark] Headless WordPress vs Monolithic CMS for SEO",
  "high-throughput-batch-vector-ingestion-n8n-qdrant": "[SOP Guide] High-Throughput Batch Vector Ingestion in n8n",
  "how-to-audit-competitor-seo-no-verification": "[SOP Guide] Competitor Technical SEO Audit Without DNS",
  "hybrid-vector-keyword-search-qdrant-n8n-pipeline": "[Step-by-Step] Hybrid Vector & Keyword Search in Qdrant",
  "manychat-n8n-async-timeout-fix": "[SOP Guide] Fix ManyChat + n8n 10s Webhook Async Timeout",
  "manychat-n8n-whatsapp-voice-bot": "[Step-by-Step] ManyChat & n8n WhatsApp Voice AI Bot",
  "manychat-whatsapp-b2b-lead-capture-agency": "[2026 Blueprint] ManyChat WhatsApp B2B Lead Capture SOP",
  "monday-crm-advanced-lead-scoring": "[SOP Guide] monday.com CRM Advanced Lead Scoring in n8n",
  "n8n-ai-agent-memory-persistence-qdrant-vector-store": "[2026 Blueprint] n8n Context Compression in Qdrant DB",
  "n8n-multi-tenant-vector-schema": "[SOP Guide] n8n Multi-Tenant Vector Schema with Qdrant",
  "n8n-vector-store-memory-management-production-guide": "[SOP Guide] n8n AI Agent Memory Persistence with Qdrant",
  "omnichannel-ai-voice-note-handler": "[Step-by-Step] Omnichannel AI Voice Note Handler in n8n",
  "open-source-llm-embeddings-voyage-bge-mxbai-n8n-benchmark": "[Benchmark] Open-Source LLM Embeddings: BGE vs Voyage",
  "outstanding-ideas-for-b2b-lead-capture": "[SOP Guide] B2B Lead Capture: 10 High-Converting Tactics",
  "outstanding-ideas-for-b2b-lead-generation": "[2026 Blueprint] B2B Lead Generation Automated Pipeline",
  "outstanding-ideas-for-saas-mvps": "[2026 Blueprint] SaaS MVP Architecture: 10 Micro-SaaS",
  "outstanding-ideas-for-youtube-shorts": "[SOP Guide] Automated YouTube Shorts Pipeline in n8n",
  "apollo-n8n-outreach": "[Step-by-Step] Apollo.io & n8n AI Cold Outreach in 2026",
  "case-study-careerops-ai-resume-builder": "[Case Study] CareerOps AI Resume Builder Architecture",
  "case-study-cashops-financial-dashboard": "[Case Study] CashOps Financial Operations Architecture",
  "pinecone-n8n-rag-knowledge-base-blueprint": "[2026 Blueprint] Corrective RAG in n8n with Pinecone",
  "pinecone-namespaces-vs-qdrant-payload-filters-comparison": "[Benchmark] Pinecone Namespaces vs Qdrant Payload Filter",
  "pinecone-serverless-vs-qdrant-vultr-latency-benchmark": "[Benchmark] Pinecone vs Qdrant Vultr: RAG Latency Test",
  "manychat-alternatives-2026-top-tools-by-use-case": "[Benchmark] ManyChat Alternatives: Top Chatbots in 2026",
  "manychat-instagram-summit-2026-agenda-review-bonus": "[2026 Blueprint] ManyChat Instagram Summit & Bonus Pack",
  "securing-self-hosted-vector-databases-ssl-vultr-firewall": "[SOP Guide] Securing Self-Hosted Vector DBs on Vultr",
  "self-hosted-qdrant-cluster-vultr-docker-sop": "[SOP Guide] Self-Hosted Qdrant Cluster on Vultr Docker",
  "self-hosted-qdrant-docker-vultr": "[SOP Guide] Self-Hosted Qdrant Docker on Vultr VPS Setup",
  "semantic-search-api-n8n-qdrant-fastapi-bridge": "[Step-by-Step] Semantic Search API with n8n & Qdrant",
  "tapstitch-vs-printful-ecommerce-pipeline": "[Benchmark] Tapstitch vs Printful: n8n Shopify Pipeline",
  "the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n": "[2026 Blueprint] Self-Hosted AI Stack: Vultr, Qdrant, n8n",
  "trainual-alternatives-active-agency-sop-engine": "[Hidden Fees] Trainual Alternatives: Agency SOP Engines",
  "turbotic-automation-governance": "[SOP Guide] Turbotic Automation Governance in monday CRM",
  "vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide": "[Benchmark] Vultr Cloud GPU vs AWS EC2: AI Inference Cost",
  "whatconverts-vs-callrail-attribution": "[Benchmark] WhatConverts vs CallRail Attribution in n8n",
  "zero-data-retention-enterprise-rag-vultr-vps": "[SOP Guide] Zero-Data-Retention Enterprise RAG on Vultr"
};

async function run() {
  console.log('=== APPLYING BRACKET CTR HOOKS TO SANITY CMS ===\n');

  // Pre-validate all titles before making changes
  const validHooks = [
    '[2026 Blueprint]',
    '[Benchmark]',
    '[Case Study]',
    '[SOP Guide]',
    '[Step-by-Step]',
    '[Hidden Fees]'
  ];

  const entries = Object.entries(bracketHooksMap);
  console.log(`Total posts to update: ${entries.length}`);

  for (const [slug, title] of entries) {
    const hasValidHook = validHooks.some(h => title.startsWith(h));
    if (!hasValidHook) {
      throw new Error(`Invalid bracket hook for ${slug}: "${title}"`);
    }
    if (title.length < 45 || title.length > 58) {
      throw new Error(`Length out of range 45-58 (${title.length}) for ${slug}: "${title}"`);
    }
  }

  // Fetch target posts from Sanity
  console.log('Fetching existing posts from Sanity...');
  const posts = await client.fetch('*[_type == "post"] { _id, title, seoTitle, "slug": slug.current }');
  const postMap = new Map(posts.map(p => [p.slug, p]));

  let updatedCount = 0;

  for (const [slug, newSeoTitle] of entries) {
    const post = postMap.get(slug);
    if (!post) {
      console.warn(`[WARNING] Post not found in Sanity for slug: ${slug}`);
      continue;
    }

    const oldSeoTitle = post.seoTitle || post.title;
    console.log(`Updating [${slug}]:`);
    console.log(`   Old: "${oldSeoTitle}" (${(oldSeoTitle || '').length} chars)`);
    console.log(`   New: "${newSeoTitle}" (${newSeoTitle.length} chars)`);

    await client
      .patch(post._id)
      .set({ seoTitle: newSeoTitle })
      .commit();

    updatedCount++;
  }

  console.log(`\nSuccessfully updated ${updatedCount} posts in Sanity CMS!`);

  // Verification
  console.log('\n=== RUNNING POST-UPDATE VERIFICATION ===');
  const allPosts = await client.fetch('*[_type == "post"] { _id, title, seoTitle, "slug": slug.current }');
  console.log(`Total posts in Sanity: ${allPosts.length}`);

  let missingBracketsCount = 0;
  let over60Count = 0;
  let under45Count = 0;

  for (const p of allPosts) {
    const title = p.seoTitle || p.title || '';
    const hasBracket = /[\[\(].*?[\]\)]/.test(title);
    if (!hasBracket) {
      console.error(`Post missing bracket: "${title}" (${p.slug})`);
      missingBracketsCount++;
    }
    if (title.length > 60) {
      console.error(`Post exceeds 60 chars (${title.length}): "${title}" (${p.slug})`);
      over60Count++;
    }
  }

  console.log(`\nVerification Results:`);
  console.log(`- Total Posts: ${allPosts.length}`);
  console.log(`- Posts with Bracket Hooks: ${allPosts.length - missingBracketsCount} / ${allPosts.length} (${(((allPosts.length - missingBracketsCount) / allPosts.length) * 100).toFixed(1)}%)`);
  console.log(`- Posts Missing Brackets: ${missingBracketsCount}`);
  console.log(`- Posts Exceeding 60 Characters: ${over60Count}`);

  if (missingBracketsCount === 0 && over60Count === 0) {
    console.log('\nSUCCESS: 100% of posts have bracket hooks and 0 posts exceed 60 characters!');
  } else {
    console.error('\nFAILURE: Some posts failed verification requirements.');
    process.exit(1);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
