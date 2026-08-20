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

const diamondPages = [
  {
    slug: 'screaming-frog-alternatives-free-seo-audit-tools',
    seoTitle: 'Free Screaming Frog Alternatives: 5 Best Crawlers [2026]',
    seoDescription: 'Looking for a free Screaming Frog alternative? Compare 5 top browser-based SEO audit tools with no 500-URL crawl limits, DNS verifications, or installs.',
    bluf: '> **Quick Answer (What are the best free Screaming Frog alternatives for SEO audits?):** The best free Screaming Frog alternatives are the WhoisAlfaz Website Audit Tool for zero-verification cloud audits, Ahrefs Webmaster Tools for 5,000 monthly verified credits, SEOptimer for single-page grading, and Spotibo for 500 free monthly URLs. Unlike Screaming Frog\'s $259/year desktop software capped at 500 URLs, browser tools require zero local RAM.',
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best free alternative to Screaming Frog without URL limits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The WhoisAlfaz Website Audit Tool provides unlimited browser-based single-page audits with zero domain verification, analyzing Core Web Vitals, TLS SSL certificates, and HTTP security headers (HSTS, CSP) in under 15 seconds without consuming local RAM or desktop CPU resources."
          }
        },
        {
          "@type": "Question",
          "name": "How much does a Screaming Frog license cost compared to online crawlers?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Screaming Frog charges a paid annual license fee of $259 per user to crawl beyond its 500-URL free limit. In contrast, cloud alternatives like WhoisAlfaz Audit are 100% free, while Ahrefs Webmaster Tools offers 5,000 free monthly crawl credits for verified domains."
          }
        },
        {
          "@type": "Question",
          "name": "Why do SEO specialists switch from desktop crawlers to cloud audit tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Desktop crawlers require local installation, consume upwards of 8GB of RAM when rendering JavaScript, and cannot audit competitor domains without manual CSV exports. Browser-based cloud tools execute scans on remote servers and generate instant shareable report URLs without domain ownership gates."
          }
        }
      ]
    }
  },
  {
    slug: 'manychat-pricing-2026',
    seoTitle: 'ManyChat Pricing [2026]: Hidden Fees & Real Cost Teardown',
    seoDescription: 'Is ManyChat free or worth it? Discover real ManyChat pricing, hidden contact-tier fees, broadcast costs, and how automation agencies avoid runaway bills.',
    bluf: '> **Quick Answer (How much does ManyChat cost in 2026?):** ManyChat pricing in 2026 follows a five-tier model: Free ($0 for 25 contacts), Essential (~$15/month for 250 contacts), Pro ($29–$39/month for 2,500 contacts), Business ($69–$99/month for 7,500 contacts), and Custom Enterprise. Additional costs include the $29/month ManyChat AI add-on, Meta WhatsApp fees ($0.02–$0.08/conversation), and contact overages at $0.018–$0.025 per subscriber.',
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is ManyChat still free to use in 2026?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ManyChat provides a restricted Free sandbox plan capped at 25 active contacts across Instagram and Messenger. It disables WhatsApp, SMS, email broadcasts, and advanced automations, meaning commercial businesses and agencies must subscribe to the Essential ($15/mo) or Pro ($29–$39/mo) tier for live campaigns."
          }
        },
        {
          "@type": "Question",
          "name": "What are the hidden costs of ManyChat Pro for marketing agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ManyChat Pro ($29–$39/mo for 2,500 contacts) incurs three major add-on expenses: the proprietary AI Step add-on ($29/month), Meta WhatsApp conversation pass-through fees ($0.02 to $0.08 per conversation), and contact overage penalties billed at $0.018 to $0.025 per contact above your plan threshold."
          }
        },
        {
          "@type": "Question",
          "name": "How can agencies reduce ManyChat subscriber costs using n8n?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Agencies reduce ManyChat tier escalation by using ManyChat solely as a social capture intake valve, immediately offloading qualified leads via webhook to self-hosted n8n. n8n scores leads and syncs contacts to Brevo CRM, allowing agencies to delete cold contacts from ManyChat and maintain the entry Pro tier."
          }
        }
      ]
    }
  },
  {
    slug: 'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes',
    seoTitle: 'Dify vs n8n [2026]: AI Workflow vs Agent Nodes Teardown',
    seoDescription: 'Choosing Dify vs n8n? Compare Dify AI workflow orchestration with n8n AI agent nodes for enterprise RAG, custom tool calling, latency, and hosting costs.',
    bluf: '> **Quick Answer (What is the difference between Dify.ai and n8n AI agent workflows?):** Dify.ai is an open-source LLM-native orchestration framework optimized for visual prompt engineering, multi-model RAG datasets, and ReAct agent loops. n8n is an event-driven Node.js workflow engine providing 400+ enterprise connectors and LangChain AI nodes. For high-throughput AI infrastructure, engineering teams deploy a hybrid architecture: n8n manages ETL webhooks while Dify executes prompt reasoning.',
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "When should an enterprise choose Dify.ai over n8n AI Agent nodes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Choose Dify.ai when building conversational AI chatbots, internal knowledge bases, or prompt-heavy RAG applications that require visual dataset management, built-in PDF chunking, prompt version control, and multi-tenant conversational memory persistence without custom database code."
          }
        },
        {
          "@type": "Question",
          "name": "When is n8n superior to Dify.ai for autonomous AI agent architectures?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "n8n is superior when AI agents require deep enterprise backend integration across 400+ SaaS platforms (Salesforce, HubSpot, Jira, Slack), complex multi-stage JSON payload transformations via JavaScript/Python code nodes, and high-velocity asynchronous webhook routing across cloud microservices."
          }
        },
        {
          "@type": "Question",
          "name": "How does the hybrid Dify.ai plus n8n architecture work in production?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In a production hybrid architecture, n8n acts as the API gateway and ETL data router that captures external webhooks, authenticates payloads, and invokes Dify's `/v1/chat-messages` REST endpoint. Dify executes the RAG retrieval and LLM reasoning, returning structured JSON for n8n to route to downstream CRMs."
          }
        }
      ]
    }
  },
  {
    slug: 'ai-automation-agency-business-model',
    seoTitle: 'AI Automation Agency Business Model: $10k Retainers [2026]',
    seoDescription: 'Master the AI automation agency business model: package productized n8n workflows into high-ticket $1.5k-$10k/mo retainers and sign enterprise clients.',
    bluf: '> **Quick Answer (What is the AI Automation Agency business model?):** An AI Automation Agency (AAA) packages n8n and LLM workflows into three high-ticket B2B service tiers: Content-as-a-Service ($1,500/month recurring retainer), AI Receptionist & Lead Qualifier ($2,500 setup + $500/month), and Executive Brain RAG Ops ($5,000–$10,000 setup). Agencies acquire clients using the Trojan Horse audit method, converting identified workflow bottlenecks into $10,000 monthly recurring revenue.',
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the three core service offers of a profitable AI Automation Agency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A profitable AI automation agency standardizes on three productized packages: Content-as-a-Service ($1,500/month recurring for automated multi-channel syndication), AI Receptionist ($2,500 setup + $500/month for 24/7 call and WhatsApp lead capture), and Executive Brain RAG ($5,000–$10,000 setup for internal document search engines)."
          }
        },
        {
          "@type": "Question",
          "name": "How does the Trojan Horse client acquisition method work for automation agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Trojan Horse method offers prospective B2B clients a free, zero-friction RevOps and workflow audit using automated n8n scrapers. By identifying manual data entry leaks and API bottlenecks with hard mathematical proof, the agency easily upsells a $2,500–$5,000 implementation package to fix the discovered issues."
          }
        },
        {
          "@type": "Question",
          "name": "Why do AI Automation Agencies choose self-hosted n8n over Zapier or Make?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Self-hosted n8n runs on a flat $20–$40/month VPS with unlimited workflow executions and zero per-task fees, compared to Zapier costs which exceed $500–$1,000/month at scale. n8n guarantees client data privacy, self-contained Docker multi-tenancy, and direct JavaScript/Python custom node execution."
          }
        }
      ]
    }
  },
  {
    slug: 'pinecone-vs-qdrant-vultr-benchmark',
    seoTitle: 'Pinecone vs Qdrant Benchmark [2026]: Latency, RAM & Cost',
    seoDescription: 'Pinecone vs Qdrant benchmark [2026]: Compare 1M vector query latency, RAM sizing, Vultr Docker setups, and cloud costs for production n8n RAG systems.',
    bluf: '> **Quick Answer (What are the benchmark results for Pinecone vs Qdrant on Vultr?):** On a Vultr 8-vCPU instance indexing 1,000,000 1536-dimensional vectors, self-hosted Qdrant Docker achieves a p95 query latency of 11.4ms versus 38.6ms for Pinecone Serverless. With 8-bit scalar quantization, Qdrant reduces RAM consumption by 75% to 1.54GB, slashing multi-tenant agency hosting costs from Pinecone’s $68/month down to a flat $40/month VPS.',
    faqSchema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why does self-hosted Qdrant outperform Pinecone Serverless in query latency?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qdrant is compiled in native Rust with SIMD hardware acceleration and memory-mapped HNSW indexing on NVMe disks, delivering p95 latency of 11.4ms at 300 QPS. Pinecone Serverless averages 38.6ms and exhibits idle partition cold-start latency spikes exceeding 140ms over cloud API gateways."
          }
        },
        {
          "@type": "Question",
          "name": "How much RAM is required to self-host 1 million OpenAI vectors in Qdrant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Storing 1,000,000 unquantized 1536-dimensional OpenAI embeddings with 1KB metadata requires ~10.71GB RAM. Enabling Qdrant 8-bit scalar quantization compresses vector memory by 75% down to 1.54GB RAM with under 0.8% recall degradation, fitting the entire index on a low-cost 4GB VPS."
          }
        },
        {
          "@type": "Question",
          "name": "How does Qdrant reduce multi-tenant RAG hosting costs for agencies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Qdrant isolates hundreds of client datasets inside a single collection using payload-based `tenant_id` pre-filters on a flat $40/month Vultr or DigitalOcean VPS. In contrast, Pinecone Standard imposes a mandatory $50/month base account fee plus usage charges, costing ~$68/month for identical workloads."
          }
        }
      ]
    }
  }
];

async function run() {
  console.log('🚀 Executing Phase 1 Sanity CMS Ingestion for 5 Diamond Posts...\n');

  for (const page of diamondPages) {
    console.log(`📌 Processing [${page.slug}]...`);
    console.log(`   SEO Title: "${page.seoTitle}" (${page.seoTitle.length} chars)`);
    console.log(`   SEO Description: "${page.seoDescription}" (${page.seoDescription.length} chars)`);

    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: page.slug });
    if (!post) {
      console.warn(`   ⚠️ Post not found in Sanity with slug: ${page.slug}`);
      continue;
    }

    const patchData = {
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      schemaMarkup: JSON.stringify(page.faqSchema),
    };

    if (typeof post.body === 'string') {
      let body = post.body;
      if (!body.includes('Quick Answer')) {
        const firstHeadingMatch = body.match(/^(#+\s+[^\n]+\n+)/m);
        if (firstHeadingMatch) {
          body = body.replace(firstHeadingMatch[0], `${firstHeadingMatch[0]}\n${page.bluf}\n\n`);
        } else {
          body = `${page.bluf}\n\n${body}`;
        }
        patchData.body = body;
      }
    }

    try {
      await client.patch(post._id).set(patchData).commit();
      console.log(`   ✅ Successfully patched published doc: ${post._id}`);

      const altId = post._id.startsWith('drafts.') ? post._id.replace('drafts.', '') : `drafts.${post._id}`;
      try {
        await client.patch(altId).set(patchData).commit();
      } catch (_) {}
    } catch (err) {
      console.error(`   ❌ Failed to patch doc ${post._id}:`, err.message);
    }
  }

  console.log('\n✨ Phase 1 Sanity CMS Update Complete!');
}

run().catch(console.error);
