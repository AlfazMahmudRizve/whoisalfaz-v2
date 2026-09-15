const { createClient } = require('@sanity/client');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

// Definitions of contextual link injections for all 17 orphan posts
const postModifications = {
  'case-study-client-portfolio-delivery': [
    {
      target: 'I selected the **Next.js 14 App Router** for the frontend to ensure optimal SEO visibility via Server-Side Rendering (SSR) and edge caching.',
      replacement: 'I selected the **Next.js 14 App Router** for the frontend to ensure optimal SEO visibility via Server-Side Rendering (SSR) and edge caching (which we continuously audit using [Screaming Frog alternatives and free SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools)).'
    },
    {
      target: 'Because it is deeply integrated into the Next.js App router, publishing an article triggers an instant localized revalidation, pushing the new content to the edge network instantly around the world.',
      replacement: 'Because it is deeply integrated into the Next.js App router, publishing an article triggers an instant localized revalidation, pushing the new content to the edge network instantly around the world—a pattern we expanded in our [Zero-Hardware Kitchen OS case study](/blog/case-study-urban-cafe-foodtech-platform) and automated via [self-hosted n8n webhook pipelines](/blog/what-is-n8n-and-how-to-set-it-up).'
    }
  ],

  'automation-operating-system-for-saas': [
    {
      target: 'We use n8n. Period. It is the only automation engine that gives you the speed of a visual node builder with the raw power of a backend engineering environment.',
      replacement: 'We use n8n. Period. It is the only automation engine that gives you the speed of a visual node builder with the raw power of a backend engineering environment (see our complete [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up) for production deployment instructions). When orchestrating complex LLM pipelines alongside traditional API nodes, you can benchmark these capabilities against [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes) to decide where workflow orchestration lives.'
    },
    {
      target: 'To build a production-ready OS, you cannot rely on consumer-grade software. You need infrastructure that gives you raw access to HTTP requests, JSON manipulation, and serverless compute.',
      replacement: 'To build a production-ready OS, you cannot rely on consumer-grade software. You need infrastructure that gives you raw access to HTTP requests, JSON manipulation, and serverless compute—grounded in the principles of our [RevOps automation stack](/blog/revops-automation-stack-saas-2026) and [technical RevOps definition](/blog/what-is-revops-technical-definition-saas).'
    },
    {
      target: 'We route our finalized automation metrics into Databox to build real-time, high-ticket executive dashboards.',
      replacement: 'We route our finalized automation metrics into Databox to build real-time, high-ticket executive dashboards (walked through step-by-step in our [Databox RevOps dashboard architecture](/blog/databox-revops-dashboard-pipeline-velocity)).'
    },
    {
      target: 'In n8n, we build a Watchtower Protocol.',
      replacement: 'In n8n, we build a Watchtower Protocol (detailed further in our [n8n global error handling guide](/blog/n8n-global-error-handling)).'
    }
  ],

  'case-study-veloryc-premium-ecommerce': [
    {
      target: 'Furthermore, modern e-commerce templates often rely on heavily abstracted UI libraries and bloated state management frameworks that degrade Time-to-First-Byte (TTFB) and introduce rendering jank. \r\n\r\nFurthermore, off-the-shelf platforms like Shopify obscure backend logic, making true multi-tenant orchestration or real-time inventory management difficult without expensive middleware.',
      fallbackTarget: 'Furthermore, off-the-shelf platforms like Shopify obscure backend logic, making true multi-tenant orchestration or real-time inventory management difficult without expensive middleware.',
      replacement: 'Furthermore, off-the-shelf platforms like Shopify obscure backend logic, making true multi-tenant orchestration or real-time inventory management difficult without expensive middleware (which we solved in our [Tapstitch vs Printful e-commerce automation pipeline](/blog/tapstitch-vs-printful-ecommerce-pipeline) and [Zero-Hardware Kitchen OS case study](/blog/case-study-urban-cafe-foodtech-platform)).'
    },
    {
      target: 'To achieve total control over the DOM and data pipelines, Veloryc was built from scratch.',
      replacement: 'To achieve total control over the DOM, crawlability, and data pipelines, Veloryc was built from scratch. For luxury brands where organic search visibility is vital, we audit crawl performance and schema using [free browser-based SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools) to prevent indexing bloat.'
    },
    {
      target: 'Any product with `< 10` units remaining triggers an immediate push notification to the admin interface.',
      replacement: 'Any product with `< 10` units remaining triggers an immediate push notification to the admin interface, hooked directly into [self-hosted n8n webhook workflows](/blog/what-is-n8n-and-how-to-set-it-up) for multi-channel alerting.'
    }
  ],

  'apollo-brevo-n8n-outbound-pipeline': [
    {
      target: 'An **n8n orchestration layer** between Apollo and Brevo solves all four of these problems at once.',
      replacement: 'An **n8n orchestration layer** between Apollo and Brevo solves all four of these problems at once. If you haven\'t deployed your workflow instance yet, check out our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up) to configure webhooks with zero execution fees.'
    },
    {
      target: 'Both Apollo.io and Brevo offer native integrations, but they are built for simplicity — not production scale.',
      replacement: 'Both Apollo.io and Brevo offer native integrations, but they are built for simplicity — not production scale. For high-volume outbound architectures, compare this approach to our 20,000 lead/day outbound system in [The Cold Email Machine](/blog/cold-email-machine-apollo-aisdr-brevo) and our [n8n Apollo lead enrichment pipeline](/blog/n8n-apollo-lead-enrichment-pipeline).'
    },
    {
      target: 'Tier 1 (score ≥ 70) contacts receive a high-touch, personalized 5-step sequence. Tier 2 contacts receive a standard 3-step nurture.',
      replacement: 'Tier 1 (score ≥ 70) contacts receive a high-touch, personalized 5-step sequence. Tier 2 contacts receive a standard 3-step nurture. To extend this pipeline with autonomous agentic research and AI qualification before sequence enrollment, evaluate [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes).'
    }
  ],

  'building-multi-tenant-vector-search-n8n-qdrant': [
    {
      target: 'Instead of maintaining dedicated database clusters or separate collections for every single customer, open-source workflow automation platforms like [n8n](/go/n8n) route vector queries through centralized [Qdrant](/go/qdrant) collections tagged with strict tenant identification keys.',
      replacement: 'Instead of maintaining dedicated database clusters or separate collections for every single customer, open-source workflow automation platforms like [n8n](/go/n8n) (which you can deploy following our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)) route vector queries through centralized [Qdrant](/go/qdrant) collections tagged with strict tenant identification keys. When comparing agent orchestration models, explore our comparison between [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes) to understand how each framework isolates state.'
    },
    {
      target: 'For 99% of enterprise applications, payload-filtered vector search running on Qdrant provides the ideal trade-off between strict security boundaries and infrastructure resource utilization.',
      replacement: 'For 99% of enterprise applications, payload-filtered vector search running on Qdrant provides the ideal trade-off between strict security boundaries and infrastructure resource utilization. To set up the underlying vector cluster, review our production [self-hosted Qdrant cluster SOP on Vultr](/blog/self-hosted-qdrant-cluster-vultr-docker-sop), benchmark memory consumption in our [Pinecone vs Qdrant comparison](/blog/pinecone-vs-qdrant-n8n-rag-comparison), or see the end-to-end stack in our [2026 self-hosted AI stack guide](/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n).'
    }
  ],

  'dify-ai-vultr-gpu-docker-deployment-guide': [
    {
      target: 'Furthermore, orchestrating Dify.ai alongside self-hosted Qdrant vector search database and n8n workflow automation creates an unshakeable autonomous enterprise stack.',
      replacement: 'Furthermore, orchestrating Dify.ai alongside self-hosted Qdrant vector search database and n8n workflow automation creates an unshakeable autonomous enterprise stack (detailed in our [Dify vs n8n AI agent nodes architecture guide](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes) and our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)).'
    },
    {
      target: 'Running Dify.ai on dedicated Vultr Cloud GPU instances eliminates strict cloud vendor rate limits, protects sensitive proprietary corporate data within private virtual networks, and significantly reduces per-token API overhead costs.',
      replacement: 'Running Dify.ai on dedicated Vultr Cloud GPU instances eliminates strict cloud vendor rate limits, protects sensitive proprietary corporate data within private virtual networks, and significantly reduces per-token API overhead costs. To calculate inference cost models before deployment, review our [Vultr Cloud GPU vs AWS EC2 AI inference cost guide](/blog/vultr-cloud-gpu-vs-aws-ec2-ai-inference-cost-guide) and our complete [2026 self-hosted AI stack blueprint](/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n).'
    }
  ],

  'dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes': [
    {
      target: 'choose n8n for integrating AI reasoning into end-to-end enterprise business logic and RevOps pipelines.',
      replacement: 'choose n8n for integrating AI reasoning into end-to-end enterprise business logic and RevOps pipelines (see our [n8n cloud vs self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)). For self-hosting Dify on bare metal or GPU compute, check out our [Dify.ai Vultr GPU Docker deployment guide](/blog/dify-ai-vultr-gpu-docker-deployment-guide) and our complete [2026 self-hosted AI stack](/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n).'
    },
    {
      target: 'Choose Dify.ai when your primary objective is building conversational AI chatbots, internal knowledge retrieval assistants, or multi-turn RAG applications where document chunking, hybrid vector search, and prompt evaluation are required out of the box.',
      replacement: 'Choose Dify.ai when your primary objective is building conversational AI chatbots, internal knowledge retrieval assistants, or multi-turn RAG applications where document chunking, hybrid vector search, and prompt evaluation are required out of the box. If your agency is evaluating frontend chatbot surfaces like Instagram or WhatsApp, consider whether conversational platforms like ManyChat fit your budget in our [ManyChat pricing analysis](/blog/manychat-pricing-2026), or build full-fidelity RAG pipelines as demonstrated in our [Pinecone + n8n RAG knowledge base blueprint](/blog/pinecone-n8n-rag-knowledge-base-blueprint).'
    }
  ],

  'high-throughput-batch-vector-ingestion-n8n-qdrant': [
    {
      target: 'By grouping raw text chunks into dynamic batches of 64 to 256 items, [n8n](/go/n8n) workflows optimize payload delivery to OpenAI embedding endpoints and [Qdrant](/go/qdrant) vector stores simultaneously.',
      replacement: 'By grouping raw text chunks into dynamic batches of 64 to 256 items, [n8n](/go/n8n) workflows (configured via our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)) optimize payload delivery to OpenAI embedding endpoints and [Qdrant](/go/qdrant) vector stores simultaneously. For multi-modal or multi-agent architectures, compare this queuing model to [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes).'
    },
    {
      target: '- **Lower Infrastructure Costs**: Minimizes CPU container context switching and memory allocation spikes during bulk processing runs.',
      replacement: '- **Lower Infrastructure Costs**: Minimizes CPU container context switching and memory allocation spikes during bulk processing runs (when scaling beyond 10M vectors, review our blueprint for [scaling Qdrant vector database to 10 million embeddings](/blog/scaling-qdrant-vector-database-to-10-million-embeddings) and our SOP for [self-hosted Qdrant cluster on Vultr](/blog/self-hosted-qdrant-cluster-vultr-docker-sop)).'
    }
  ],

  'n8n-ai-agent-memory-persistence-qdrant-vector-store': [
    {
      target: 'By implementing context compression inside [n8n](/go/n8n) workflows, developers extract core intent, key entities, and actionable facts from conversation history prior to vectorization.',
      replacement: 'By implementing context compression inside [n8n](/go/n8n) workflows (configured following our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)), developers extract core intent, key entities, and actionable facts from conversation history prior to vectorization. When selecting an agent development platform, compare this approach against [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes) to evaluate how conversational memory is persisted.'
    },
    {
      target: '- **Enhanced Entity Recall**: Forces the LLM summarizer to standardize core entity attributes into canonical JSON keys before vector indexing.',
      replacement: '- **Enhanced Entity Recall**: Forces the LLM summarizer to standardize core entity attributes into canonical JSON keys before vector indexing. For production memory retention, coordinate this compression pipeline with our guide on [n8n AI agent memory persistence and garbage collection](/blog/n8n-vector-store-memory-management-production-guide), build out your database using our [self-hosted Qdrant cluster SOP on Vultr](/blog/self-hosted-qdrant-cluster-vultr-docker-sop), and explore hybrid search in our [hybrid vector and keyword search pipeline](/blog/hybrid-vector-keyword-search-qdrant-n8n-pipeline).'
    }
  ],

  'n8n-vector-store-memory-management-production-guide': [
    {
      target: 'In this architecture, [n8n](/go/n8n) acts as the central orchestration controller, automatically capturing conversation turns, embedding key interaction facts, and storing them as vector payloads.',
      replacement: 'In this architecture, [n8n](/go/n8n) (deployed according to our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)) acts as the central orchestration controller, automatically capturing conversation turns, embedding key interaction facts, and storing them as vector payloads. If you are comparing orchestration engines for conversational memory and RAG, read our breakdown of [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes).'
    },
    {
      target: '- **Cost Reduction**: Eliminates the need to resend massive chat transcripts on every LLM query turn, cutting prompt token costs by up to 65%.',
      replacement: '- **Cost Reduction**: Eliminates the need to resend massive chat transcripts on every LLM query turn, cutting prompt token costs by up to 65%. To optimize token density before vectorization, pair this system with our guide on [n8n context compression for Qdrant memory stores](/blog/n8n-ai-agent-memory-persistence-qdrant-vector-store), set up your vector infrastructure via our [self-hosted Qdrant cluster SOP on Vultr](/blog/self-hosted-qdrant-cluster-vultr-docker-sop), and benchmark performance against cloud databases in our [Pinecone vs Qdrant comparison](/blog/pinecone-vs-qdrant-n8n-rag-comparison).'
    }
  ],

  'n8n-workflow-design-best-practices': [
    {
      target: '**That is not engineering. That is hoping.**',
      replacement: '**That is not engineering. That is hoping.**\r\n\r\nIf you have not spun up your server yet, complete our comprehensive [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up) to configure an isolated Docker environment with automated volume backups. When designing workflows that incorporate autonomous LLM agents or complex RAG chains, evaluate our architectural comparison of [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes) to decide where prompt logic should be decoupled from deterministic business logic.'
    },
    {
      target: 'We route this data directly into Databox to populate real-time dashboards for the executive team.',
      replacement: 'We route this data directly into Databox to populate real-time dashboards for the executive team (as broken down in our [Databox RevOps dashboard architecture](/blog/databox-revops-dashboard-pipeline-velocity)).'
    },
    {
      target: 'If you do not design an explicit Error Path, your workflow will silently fail, and you will not know until a VP of Sales yells at you because leads haven\'t synced for three days.',
      replacement: 'If you do not design an explicit Error Path, your workflow will silently fail, and you will not know until a VP of Sales yells at you because leads haven\'t synced for three days. For concrete examples of fail-safe node configurations and dead-letter routing, read our in-depth guides on [n8n debugging & error handling basics](/blog/n8n-debugging-error-handling-basics) and [n8n global error handling](/blog/n8n-global-error-handling).'
    }
  ],

  'case-study-careerops-ai-resume-builder': [
    {
      target: 'Instead, the application utilizes **n8n as a stateless processing orchestration layer**.',
      replacement: 'Instead, the application utilizes **n8n as a stateless processing orchestration layer** (which you can deploy locally or on cloud VPS using our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)). For teams comparing agent frameworks, we contrast this pipeline pattern with LLM-specific graphs in our [Dify vs n8n AI agent nodes architecture teardown](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes).'
    },
    {
      target: 'CareerOps proves that you do not need to hoard user data to provide elite, AI-driven personalization.',
      replacement: 'Similar to the dynamic content delivery architecture in our [Abu Zubayer Client Portfolio case study](/blog/case-study-client-portfolio-delivery), this interface renders responsive client-side state without latency. To ensure high-converting landing pages and client-side applications remain indexable and free of crawl barriers, we perform technical audits using [free browser-based SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools).\r\n\r\nCareerOps proves that you do not need to hoard user data to provide elite, AI-driven personalization.'
    }
  ],

  'case-study-cashops-financial-dashboard': [
    {
      target: 'Managing operational cash flow requires precision, speed, and deep analytical insight.',
      replacement: 'Managing operational cash flow requires precision, speed, and deep analytical insight—principles we apply across enterprise revenue operations in our [RevOps automation stack](/blog/revops-automation-stack-saas-2026) and [technical RevOps definition](/blog/what-is-revops-technical-definition-saas).'
    },
    {
      target: 'The charts dynamically calculate the running 30-day average, rendering a stark visual representation of daily capital output (in Red) against daily revenue (in Green).',
      replacement: 'The charts dynamically calculate the running 30-day average, rendering a stark visual representation of daily capital output (in Red) against daily revenue (in Green). This operational financial modeling parallels the executive visibility we engineer for B2B SaaS in our [Databox RevOps dashboard architecture](/blog/databox-revops-dashboard-pipeline-velocity), where automated webhook pipelines are orchestrated via [self-hosted n8n workflows](/blog/what-is-n8n-and-how-to-set-it-up).'
    },
    {
      target: 'CashOps successfully proves that independent developer-focused software can be built with the speed of local desktop applications while providing enterprise-grade analytical capabilities.',
      replacement: 'To ensure client web apps and financial tools maintain optimal Core Web Vitals, clean DOM structures, and zero crawl bloat, we benchmark frontend health using [free browser-based SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools).\r\n\r\nCashOps successfully proves that independent developer-focused software can be built with the speed of local desktop applications while providing enterprise-grade analytical capabilities.'
    }
  ],

  'manychat-instagram-summit-2026-agenda-review-bonus': [
    {
      target: 'Engineering omni-channel handshakes between Instagram, WhatsApp Flows, and enterprise CRMs.',
      replacement: 'Engineering omni-channel handshakes between Instagram, WhatsApp Flows, and enterprise CRMs (as modeled in our [ManyChat WhatsApp B2B lead capture blueprint](/blog/manychat-whatsapp-b2b-lead-capture-agency)).'
    },
    {
      target: 'The 2026 speaker lineup bridges the gap between top-tier creative distribution and high-converting backend automation:',
      replacement: 'Before scaling up your contact lists on Meta channels, read our comprehensive [ManyChat pricing and plan teardown for agencies](/blog/manychat-pricing-2026) to calculate contact tiers and prevent unexpected invoice spikes.\r\n\r\nThe 2026 speaker lineup bridges the gap between top-tier creative distribution and high-converting backend automation:'
    },
    {
      target: 'n8n uses an immediate response webhook handshake. It acknowledges ManyChat in under 150 milliseconds so the chat never freezes, while heavy AI enrichment runs asynchronously in the background.',
      replacement: 'n8n uses an immediate response webhook handshake. It acknowledges ManyChat in under 150 milliseconds so the chat never freezes, while heavy AI enrichment runs asynchronously in the background (see our complete guide to [fix ManyChat\'s 10-second response timeout with n8n](/blog/manychat-n8n-async-timeout-fix) and our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)).'
    }
  ],

  'semantic-search-api-n8n-qdrant-fastapi-bridge': [
    {
      target: 'Concurrently, n8n acts as the external workflow automation engine, capturing incoming webhooks, parsing unstructured file data, feeding documents to FastAPI, and broadcasting structured search outputs to downstream CRM systems.',
      replacement: 'Concurrently, n8n acts as the external workflow automation engine, capturing incoming webhooks, parsing unstructured file data, feeding documents to FastAPI, and broadcasting structured search outputs to downstream CRM systems (see our complete [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)). For teams comparing visual RAG orchestration tools against microservice APIs, read our breakdown of [Dify vs n8n AI agent nodes](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes).'
    },
    {
      target: 'By hosting this decoupled microservice stack on self-hosted Vultr Cloud GPU infrastructure, organizations maintain full data sovereignty while bypassing third-party SaaS vector store fees.',
      replacement: 'By hosting this decoupled microservice stack on self-hosted Vultr Cloud GPU infrastructure, organizations maintain full data sovereignty while bypassing third-party SaaS vector store fees. To configure the underlying vector storage, review our guide on building a [self-hosted Qdrant cluster on Vultr](/blog/self-hosted-qdrant-cluster-vultr-docker-sop), explore our [hybrid vector and keyword search pipeline](/blog/hybrid-vector-keyword-search-qdrant-n8n-pipeline), or inspect our [2026 self-hosted AI stack architecture](/blog/the-ultimate-2026-self-hosted-ai-stack-vultr-qdrant-dify-n8n).'
    }
  ],

  'tapstitch-vs-printful-ecommerce-pipeline': [
    {
      target: 'By defining custom fulfillment locations for both Tapstitch and Printful, Shopify automatically splits order fulfillment requests based on assigned product SKUs.',
      replacement: 'By defining custom fulfillment locations for both Tapstitch and Printful, Shopify automatically splits order fulfillment requests based on assigned product SKUs, connected directly to a [self-hosted n8n instance](/blog/what-is-n8n-and-how-to-set-it-up) to eliminate monthly per-action automation fees.'
    },
    {
      target: 'This decoupled API pattern prevents fulfillment collisions, eliminates manual order entry errors, and maintains transparent shipping tracking updates for end customers.',
      replacement: 'This decoupled API pattern prevents fulfillment collisions, eliminates manual order entry errors, and maintains transparent shipping tracking updates for end customers. This decoupled multi-vendor architecture mirrors the high-performance headless architecture we deployed in our [Veloryc E-Commerce case study](/blog/case-study-veloryc-premium-ecommerce) and our [Zero-Hardware Kitchen POS system](/blog/case-study-urban-cafe-foodtech-platform). For stores handling high organic traffic, auditing product catalog indexation and structured schema using [free browser-based SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools) prevents search visibility leaks.'
    },
    {
      target: 'To maximize profit margins while meeting customer delivery expectations, configure an n8n workflow that dynamically routes orders to either Tapstitch or Printful based on order destination, item margins, and urgency:',
      replacement: 'If you pair this e-commerce pipeline with automated social chat commerce on Instagram or TikTok, evaluate your DM automation platform costs using our [ManyChat pricing teardown for 2026](/blog/manychat-pricing-2026).\r\n\r\nTo maximize profit margins while meeting customer delivery expectations, configure an n8n workflow that dynamically routes orders to either Tapstitch or Printful based on order destination, item margins, and urgency:'
    }
  ],

  'whatconverts-vs-callrail-attribution': [
    {
      target: 'Selecting the optimal platform depends on whether your organization requires dedicated HIPAA compliance controls or demands deeply customizable API webhooks to feed downstream n8n revenue attribution engines.',
      replacement: 'Selecting the optimal platform depends on whether your organization requires dedicated HIPAA compliance controls or demands deeply customizable API webhooks to feed downstream n8n revenue attribution engines (as detailed in our [closed-loop lead attribution engine guide](/blog/closed-loop-lead-attribution-engine) and our [n8n self-hosted setup guide](/blog/what-is-n8n-and-how-to-set-it-up)).'
    },
    {
      target: 'To assist revenue operations leaders in selecting the appropriate call tracking infrastructure, the following matrix compares the core technical capabilities, API payload depth, and CRM integration features of WhatConverts and CallRail.',
      replacement: 'Before provisioning dynamic number pools, marketing teams should audit destination landing pages, form scripts, and tracking tags using [free browser-based SEO audit tools](/blog/screaming-frog-alternatives-free-seo-audit-tools) to guarantee tracking scripts do not degrade page performance or Core Web Vitals.\r\n\r\nTo assist revenue operations leaders in selecting the appropriate call tracking infrastructure, the following matrix compares the core technical capabilities, API payload depth, and CRM integration features of WhatConverts and CallRail.'
    },
    {
      target: 'Passing these reconciled revenue metrics to Databox executive dashboards gives marketing managers clear visibility into cost-per-qualified-call and revenue-per-call-campaign across all ad channels.',
      replacement: 'Passing these reconciled revenue metrics to Databox executive dashboards (built via our [Databox RevOps dashboard architecture](/blog/databox-revops-dashboard-pipeline-velocity)) gives marketing managers clear visibility into cost-per-qualified-call and revenue-per-call-campaign across all ad channels, aligned with the lead qualification models in our [monday.com CRM advanced lead scoring guide](/blog/monday-crm-advanced-lead-scoring).'
    }
  ]
};

async function run() {
  console.log('🚀 Starting Integration of 17 Orphan Posts in Sanity CMS...');

  const orphanSlugs = Object.keys(postModifications);
  console.log(`Targeting ${orphanSlugs.length} orphan posts.`);

  // 1. Fetch live posts from Sanity
  const livePosts = await client.fetch(
    `*[_type == "post" && slug.current in $orphanSlugs] {
      _id,
      title,
      "slug": slug.current,
      body
    }`,
    { orphanSlugs }
  );

  console.log(`Successfully fetched ${livePosts.length} posts from Sanity.`);

  let updatedCount = 0;
  let errorsCount = 0;

  for (const post of livePosts) {
    const slug = post.slug;
    const mods = postModifications[slug];
    if (!mods) {
      console.warn(`⚠️ No modifications found for slug: ${slug}`);
      continue;
    }

    let updatedBody = post.body;
    let postHadMatch = true;

    for (const m of mods) {
      let target = m.target;
      if (!updatedBody.includes(target) && m.fallbackTarget && updatedBody.includes(m.fallbackTarget)) {
        target = m.fallbackTarget;
      }

      if (!updatedBody.includes(target)) {
        console.error(`❌ [${slug}] Target string not found: "${target.slice(0, 50)}..."`);
        postHadMatch = false;
      } else {
        updatedBody = updatedBody.replace(target, m.replacement);
      }
    }

    if (!postHadMatch) {
      console.error(`❌ [${slug}] Skipping commit due to unmatched target text.`);
      errorsCount++;
      continue;
    }

    // Verify in-body link presence
    const hasInternalLink = updatedBody.includes('/blog/') || updatedBody.includes('whoisalfaz.me');
    if (!hasInternalLink) {
      console.error(`❌ [${slug}] In-body internal link missing after replacement!`);
      errorsCount++;
      continue;
    }

    // Commit update to Sanity
    try {
      console.log(`📡 Committing update to Sanity for [${slug}] (${post._id})...`);
      await client
        .patch(post._id)
        .set({ body: updatedBody })
        .commit();

      console.log(`✅ [${slug}] Successfully updated and committed to Sanity.`);
      updatedCount++;
    } catch (err) {
      console.error(`❌ [${slug}] Sanity commit failed:`, err.message);
      errorsCount++;
    }
  }

  console.log('\n======================================================');
  console.log(`🎉 Execution Complete: ${updatedCount} posts updated, ${errorsCount} errors.`);
  console.log('======================================================\n');
}

run().catch(console.error);
