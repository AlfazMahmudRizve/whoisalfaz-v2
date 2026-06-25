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

const linkInjections = [
  // --- 1. Case Studies ---
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'Yes—view our [portfolio of RevOps automation case studies](/portfolio/)',
    replacementText: 'Yes—view our [portfolio of RevOps automation case studies](/portfolio/) (like our [Client Portfolio Delivery case study](/blog/case-study-client-portfolio-delivery))'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'automation orchestrator (**n8n**).',
    replacementText: 'automation orchestrator (**n8n**), laying a structured data foundation similar to the Next.js and database architecture detailed in our [Client Portfolio Delivery case study](/blog/case-study-client-portfolio-delivery).'
  },
  {
    sourceSlug: 'manychat-n8n-async-timeout-fix',
    targetText: 'static database lookups, it fails',
    replacementText: 'static database lookups (like checking instant ticket queues or order status in our [Urban Cafe case study](/blog/case-study-urban-cafe-foodtech-platform/)), it fails'
  },
  {
    sourceSlug: 'elevenlabs-n8n-voice-ai-sales-agent',
    targetText: 'synthesizes the final Text-to-Speech (TTS) audio.',
    replacementText: 'synthesizes the final Text-to-Speech (TTS) audio (similar to the browser-native TTS queue designed for hands-free kitchen orders in our [Urban Cafe case study](/blog/case-study-urban-cafe-foodtech-platform/)).'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'crawler exclusion means missing that distribution entirely.',
    replacementText: 'crawler exclusion means missing that distribution entirely (to automate your indexation strategy, see our [SEO Indexing Engine case study](/blog/case-study-whoisalfaz-seo-indexing-engine/)).'
  },
  {
    sourceSlug: 'case-study-urban-cafe-foodtech-platform',
    targetText: 'indexing of these dynamic product and success pages instantly on every deployment, I integrated the same zero-touch [**SEO Indexing Pipeline**](https://whoisalfaz.me/blog/case-study-whoisalfaz-seo-indexing-engine/) used',
    replacementText: 'indexing of these dynamic product and success pages instantly on every deployment, I integrated the same zero-touch [SEO Indexing Engine case study](/blog/case-study-whoisalfaz-seo-indexing-engine/) used'
  },
  {
    sourceSlug: 'case-study-urban-cafe-foodtech-platform',
    targetText: 'capabilities I designed for the [**Veloryc E-Commerce Case Study**](https://whoisalfaz.me/blog/case-study-veloryc-premium-ecommerce/) to handle',
    replacementText: 'capabilities I designed for the [Veloryc Premium E-Commerce case study](/blog/case-study-veloryc-premium-ecommerce) to handle'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'Facebook Ads, and Stripe into a single',
    replacementText: 'Facebook Ads, and Stripe (which we integrated with a custom headless storefront in the [Veloryc Premium E-Commerce case study](/blog/case-study-veloryc-premium-ecommerce/)) into a single'
  },
  {
    sourceSlug: 'pinecone-n8n-rag-knowledge-base-blueprint',
    targetText: 'assistant, the traditional approach of retrieving',
    replacementText: 'assistant (like the document parsing and matching engine detailed in our [CareerOps AI Resume Builder case study](/blog/case-study-careerops-ai-resume-builder/)), the traditional approach of retrieving'
  },
  {
    sourceSlug: 'aisdr-vs-human-sdr-performance-teardown',
    targetText: 'retrieval models, GTM architects can implement',
    replacementText: 'retrieval models (as implemented for real-time document optimization in our [CareerOps AI Resume Builder case study](/blog/case-study-careerops-ai-resume-builder/)), GTM architects can implement'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'waste hours exporting CSV files from monday.com,',
    replacementText: 'waste hours exporting CSV files from monday.com (a bottleneck we solved for personal finance in our [CashOps Financial Dashboard case study](/blog/case-study-cashops-financial-dashboard/)),'
  },
  {
    sourceSlug: 'revops-automation-stack-saas-2026',
    targetText: 'financial sheets into one unified, live dashboard.',
    replacementText: 'financial sheets—similar to the database and chart aggregation patterns detailed in our [CashOps Financial Dashboard case study](/blog/case-study-cashops-financial-dashboard/)—into one unified, live dashboard.'
  },

  // --- 2. SEO & Analytics Guides ---
  {
    sourceSlug: 'screaming-frog-alternatives-free-seo-audit-tools',
    targetText: 'competitive technical SEO audits using',
    replacementText: 'competitive technical SEO audits using [how-to-audit-competitor-seo-no-verification](/blog/how-to-audit-competitor-seo-no-verification) with'
  },
  {
    sourceSlug: 'screaming-frog-alternatives-free-seo-audit-tools',
    targetText: 'rankings and site health automatically, you can',
    replacementText: '[monitor competitor rankings](/blog/build-an-automated-rank-tracker-tool-with-n8n) and site health automatically, you can'
  },
  {
    sourceSlug: 'how-to-audit-competitor-seo-no-verification',
    targetText: 'win the search rankings game, engineering-driven',
    replacementText: 'win the [search rankings game](/blog/build-an-automated-rank-tracker-tool-with-n8n), engineering-driven'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'HubSpot, monday.com, Google Analytics, Facebook',
    replacementText: 'HubSpot, monday.com, [Google Analytics](/blog/n8n-google-analytics-4-pipeline), Facebook'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'CRM database from your analytics platform entirely—enabling',
    replacementText: 'CRM database from your analytics platform entirely (which is crucial when building an [n8n Google Analytics 4 pipeline](/blog/n8n-google-analytics-4-pipeline))—enabling'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'delayed dashboard cards.',
    replacementText: 'delayed dashboard cards (which is why marketing operations teams [automate client reporting with n8n](/blog/automate-client-reporting-with-n8n) using event-driven webhooks).'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'Lightweight reporting until Databox is warranted',
    replacementText: 'Lightweight reporting (which you can build using our guide to [automate client reporting with n8n](/blog/automate-client-reporting-with-n8n))'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: 'Annual Recurring Revenue (ARR).',
    replacementText: 'Annual Recurring Revenue (ARR) (a gap solved by setting up [automated marketing reporting with n8n](/blog/automated-marketing-reporting-with-n8n-at-whoisalfaz)).'
  },
  {
    sourceSlug: 'monday-com-automation-recipes-revops-2026',
    targetText: 'other marketing platforms.',
    replacementText: 'other marketing platforms (to see how to consolidate this, review our setup for [automated marketing reporting with n8n](/blog/automated-marketing-reporting-with-n8n-at-whoisalfaz})).'
  },

  // --- 3. Core n8n Tutorials ---
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'orchestration power of **n8n** with',
    replacementText: 'orchestration power of [n8n](/blog/what-is-n8n-by-alfaz-mahmud-rizve) with'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'n8n as the workflow orchestration brain,',
    replacementText: '[n8n](/blog/what-is-n8n-by-alfaz-mahmud-rizve) as the workflow orchestration brain,'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'Deploy n8n self-hosted',
    replacementText: 'Deploy [n8n self-hosted](/blog/what-is-n8n-and-how-to-set-it-up)'
  },
  {
    sourceSlug: 'aisdr-vs-human-sdr-performance-teardown',
    targetText: 'bypass cloud-hosted SaaS automation brokers and choose to **self-host n8n** on',
    replacementText: 'bypass cloud-hosted SaaS automation brokers and choose to [self-host n8n](/blog/what-is-n8n-and-how-to-set-it-up) on'
  },
  {
    sourceSlug: 'aisdr-vs-human-sdr-performance-teardown',
    targetText: 'visual platforms make workflow design look',
    replacementText: 'visual platforms make [workflow design](/blog/n8n-workflow-design-best-practices) look'
  },
  {
    sourceSlug: 'pinecone-n8n-rag-knowledge-base-blueprint',
    targetText: 'Corrective RAG pipeline is built around a highly decoupled, modular workflow.',
    replacementText: 'Corrective RAG pipeline is built around a highly decoupled, [modular workflow](/blog/n8n-workflow-design-best-practices).'
  },
  {
    sourceSlug: 'manychat-n8n-async-timeout-fix',
    targetText: 'add a **Webhook Trigger Node**.',
    replacementText: 'add a **Webhook Trigger Node** (refer to our step-by-step tutorial on [how to build an API with n8n](/blog/how-to-build-an-api-with-n8n)).'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'HTTP listener node from the heavy',
    replacementText: 'HTTP listener node (a foundational concept covered in [how to build an API with n8n](/blog/how-to-build-an-api-with-n8n)) from the heavy'
  },
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'agency or SaaS startup, automating',
    replacementText: '[B2B agency or SaaS startup](/blog/automations-for-saas-and-agencies), automating'
  },
  {
    sourceSlug: 'pinecone-n8n-rag-knowledge-base-blueprint',
    targetText: 'B2B SaaS startup or high-velocity agency, automation is',
    replacementText: 'B2B SaaS startup or high-velocity agency, implementing custom [automations for SaaS and agencies](/blog/automations-for-saas-and-agencies) is'
  },
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'use an **n8n Router Node** or **If Node** to',
    replacementText: 'use an **n8n Router Node** or **If Node** (both are [essential n8n core nodes](/blog/essential-n8n-core-nodes-by-alfaz-mahmud-rizve) for conditional logic and routing) to'
  },
  {
    sourceSlug: 'apollo-brevo-n8n-outbound-pipeline',
    targetText: 'Split In Batches node (batch size: 1) so',
    replacementText: 'Split In Batches node (batch size: 1—one of the [essential n8n core nodes](/blog/essential-n8n-core-nodes-by-alfaz-mahmud-rizve) for looping data) so'
  },

  // --- 4. Advanced Outbound & Agency Stack ---
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'configure a dedicated **Error Workflow** inside',
    replacementText: 'configure a dedicated [Error Workflow](/blog/n8n-global-error-handling/) inside'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'Create a global Error Trigger workflow in n8n.',
    replacementText: 'Create a [global Error Trigger](/blog/n8n-global-error-handling/) workflow in n8n.'
  },
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'workflow orchestration visual, maintaining production-grade pipelines at scale',
    replacementText: 'workflow orchestration visual, maintaining [production-grade pipelines](/blog/n8n-production-workflows-by-alfaz-mahmud-rizve/) at scale'
  },
  {
    sourceSlug: 'revops-automation-stack-saas-2026',
    targetText: 'workflow orchestration visual, maintaining production-grade pipelines at scale',
    replacementText: 'workflow orchestration visual, maintaining [production-grade pipelines](/blog/n8n-production-workflows-by-alfaz-mahmud-rizve/) at scale'
  },
  {
    sourceSlug: 'manychat-whatsapp-b2b-lead-capture-agency',
    targetText: 'How do agencies deploy ManyChat WhatsApp',
    replacementText: 'How do [automation agencies](/blog/ai-automation-agency-business-model/) deploy ManyChat WhatsApp'
  },
  {
    sourceSlug: 'pinecone-vs-qdrant-n8n-rag-comparison',
    targetText: 'maximizing agency profit margins.',
    replacementText: 'maximizing [agency profit margins](/blog/ai-automation-agency-business-model/).'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'custom JavaScript execution in Code Nodes,',
    replacementText: 'custom JavaScript execution in Code Nodes (read our master list of [n8n Tips and Tricks](/blog/n8n-tips-and-tricks-by-alfaz-mahmud-rizve/) for advanced techniques),'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'validating the request signature in an n8n Code node using HMAC-SHA256.',
    replacementText: 'validating the request signature in an n8n Code node using HMAC-SHA256 (for more code snippets and optimization tips, check out our guide on [n8n Tips and Tricks](/blog/n8n-tips-and-tricks-by-alfaz-mahmud-rizve/)).'
  },
  {
    sourceSlug: 'automate-personal-branding-with-n8n',
    targetText: 'Repurposes YouTube videos into SEO-optimized blog posts using Whisper and GPT-4.',
    replacementText: 'Repurposes YouTube videos into SEO-optimized blog posts using Whisper and GPT-4 (for the reverse pipeline, check out our [Automated YouTube Shorts Generator](/blog/automated-youtube-shorts-generator/)).'
  },
  {
    sourceSlug: 'databox-revops-dashboard-pipeline-velocity',
    targetText: '[AiSDR](/blog/cold-email-machine-apollo-aisdr-brevo/) or [ElevenLabs/Vapi](/blog/elevenlabs-n8n-voice-ai-sales-agent/) track',
    replacementText: '[AiSDR](/blog/cold-email-machine-apollo-aisdr-brevo/), [ElevenLabs/Vapi](/blog/elevenlabs-n8n-voice-ai-sales-agent/), or our [Automated YouTube Shorts Generator](/blog/automated-youtube-shorts-generator/) track'
  },
  {
    sourceSlug: 'pinecone-n8n-rag-knowledge-base-blueprint',
    targetText: 'enterprise-grade AI assistant, the traditional approach of retrieving',
    replacementText: 'enterprise-grade AI assistant (or even a [personal AI assistant](/blog/build-personal-ai-assistant/)), the traditional approach of retrieving'
  },
  {
    sourceSlug: 'elevenlabs-n8n-voice-ai-sales-agent',
    targetText: 'Voice AI Sales Agent using **ElevenLabs Conversational AI** and **n8n**.',
    replacementText: 'Voice AI Sales Agent (similar to the agent orchestration in our [personal AI assistant](/blog/build-personal-ai-assistant/) setup) using **ElevenLabs Conversational AI** and **n8n**.'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'matching your brand guidelines.',
    replacementText: 'matching your brand guidelines. (For details on how to build and maintain a consistent digital brand footprint automatically, check out our guide on how to [automate personal branding with n8n](/blog/automate-personal-branding-with-n8n/)).'
  },
  {
    sourceSlug: 'how-to-audit-competitor-seo-no-verification',
    targetText: 'indexing gaps, and operational vulnerabilities.',
    replacementText: 'indexing gaps, and operational vulnerabilities (and then leverage those insights to [automate personal branding with n8n](/blog/automate-personal-branding-with-n8n/) to outpace them).'
  },
  {
    sourceSlug: 'manychat-n8n-async-timeout-fix',
    targetText: 'and WhatsApp Business have transformed',
    replacementText: 'and WhatsApp Business (read our playbook on [ManyChat WhatsApp B2B Lead Capture](/blog/manychat-whatsapp-b2b-lead-capture-agency/)) have transformed'
  },
  {
    sourceSlug: 'n8n-apollo-lead-enrichment-pipeline',
    targetText: 'multi-tool integrations (ManyChat,',
    replacementText: 'multi-tool integrations (such as [ManyChat WhatsApp B2B Lead Capture](/blog/manychat-whatsapp-b2b-lead-capture-agency/), '
  },
  {
    sourceSlug: 'revops-automation-stack-saas-2026',
    targetText: 'centralized process workspace (**monday.com**), and a real-time analytics hub (**Databox**),',
    replacementText: 'centralized process workspace (**monday.com**), and a real-time analytics hub (such as the [Databox RevOps Dashboard](/blog/databox-revops-dashboard-pipeline-velocity/)),'
  },
  {
    sourceSlug: 'monday-com-automation-recipes-revops-2026',
    targetText: 'from Databox, you can build',
    replacementText: 'from Databox (as explained in our [Databox RevOps Dashboard](/blog/databox-revops-dashboard-pipeline-velocity/) guide), you can build'
  },
  {
    sourceSlug: 'what-is-revops-technical-definition-saas',
    targetText: 'This is why the [Apollo→Brevo outbound pipeline](/blog/apollo-brevo-n8n-outbound-pipeline/) we built for a client',
    replacementText: 'This is why the [Apollo→Brevo outbound pipeline](/blog/apollo-brevo-n8n-outbound-pipeline/) we built for a client (which also leverages custom [Apollo n8n outreach](/blog/apollo-n8n-outreach/) setups)'
  },
  {
    sourceSlug: 'cold-email-machine-apollo-aisdr-brevo',
    targetText: 'to trigger immediate outreach',
    replacementText: 'to trigger immediate [outbound outreach](/blog/apollo-n8n-outreach/)'
  },
  {
    sourceSlug: 'pinecone-n8n-rag-knowledge-base-blueprint',
    targetText: 'standard n8n RAG pipeline](/blog/n8n-rag-tutorial/) before',
    replacementText: 'standard n8n RAG pipeline](/blog/n8n-rag-tutorial/) or our [Pinecone vs Qdrant n8n RAG comparison](/blog/pinecone-vs-qdrant-n8n-rag-comparison/) before'
  }
];

const slugToDraftBodyPath = {
  'n8n-apollo-lead-enrichment-pipeline': 'draft-n8n-apollo-body.md',
  'revops-automation-stack-saas-2026': 'draft-revops-stack-body.md',
  'pinecone-n8n-rag-knowledge-base-blueprint': 'draft-pinecone-n8n-rag-body.md',
  'manychat-n8n-async-timeout-fix': 'draft-manychat-n8n-body.md',
  'aisdr-vs-human-sdr-performance-teardown': 'draft-aisdr-vs-human-sdr-body.md',
  'apollo-brevo-n8n-outbound-pipeline': 'draft-apollo-brevo-n8n-body.md',
  'what-is-revops-technical-definition-saas': 'draft-revops-definition-body.md',
  'elevenlabs-n8n-voice-ai-sales-agent': 'draft-elevenlabs-n8n-voice-ai-sales-agent-body.md',
  'monday-com-automation-recipes-revops-2026': 'draft-monday-recipes-body.md',
  'pinecone-vs-qdrant-n8n-rag-comparison': 'draft-pinecone-vs-qdrant-body.md',
  'how-to-audit-competitor-seo-no-verification': 'draft-competitor-seo-audit-body.md',
  'cold-email-machine-apollo-aisdr-brevo': 'draft-cold-email-machine-body.md',
  'screaming-frog-alternatives-free-seo-audit-tools': 'draft-screaming-frog-alternatives-body.md',
  'databox-revops-dashboard-pipeline-velocity': 'draft-databox-revops-dashboard-pipeline-velocity-body.md',
  'manychat-whatsapp-b2b-lead-capture-agency': 'draft-manychat-whatsapp-b2b-lead-capture-agency-body.md',
  'case-study-urban-cafe-foodtech-platform': 'draft-urban-cafe-foodtech-platform-body.md'
};

const slugToBuildCommand = {
  'n8n-apollo-lead-enrichment-pipeline': 'buildDay1Json.js',
  'revops-automation-stack-saas-2026': 'buildDay2Json.js',
  'pinecone-n8n-rag-knowledge-base-blueprint': 'buildDay3Json.js',
  'manychat-n8n-async-timeout-fix': 'buildDay4Json.js',
  'aisdr-vs-human-sdr-performance-teardown': 'buildDay5Json.js',
  'apollo-brevo-n8n-outbound-pipeline': 'buildDay6Json.js',
  'what-is-revops-technical-definition-saas': 'buildDay7Json.js',
  'elevenlabs-n8n-voice-ai-sales-agent': 'buildDay8Json.js',
  'monday-com-automation-recipes-revops-2026': 'buildDay9Json.js',
  'pinecone-vs-qdrant-n8n-rag-comparison': 'buildDay10Json.js',
  'how-to-audit-competitor-seo-no-verification': 'buildDay11SeoJson.js',
  'cold-email-machine-apollo-aisdr-brevo': 'buildColdEmailMachineJson.js',
  'screaming-frog-alternatives-free-seo-audit-tools': 'buildDay12Json.js',
  'databox-revops-dashboard-pipeline-velocity': 'buildDay12DataboxJson.js',
  'manychat-whatsapp-b2b-lead-capture-agency': 'buildDay13ManychatWhatsappJson.js',
  'case-study-urban-cafe-foodtech-platform': 'buildUrbanCafeJson.js'
};

async function executeInjections() {
  console.log(`Executing ${linkInjections.length} internal link wheel injections...`);
  
  for (const injection of linkInjections) {
    const { sourceSlug, targetText, replacementText } = injection;
    console.log(`\n----------------------------------------`);
    console.log(`Processing injection for: ${sourceSlug}`);
    
    // 1. Fetch document from Sanity
    try {
      const results = await client.fetch(`*[_type == "post" && slug.current == $slug]`, { slug: sourceSlug });
      if (!results || results.length === 0) {
        console.warn(`⚠️ Post not found in Sanity by slug: ${sourceSlug}. Skipping database update.`);
      } else {
        const post = results[0];
        const body = post.body;
        
        if (!body) {
          console.warn(`⚠️ Post ${sourceSlug} in Sanity has no body.`);
        } else if (!body.includes(targetText)) {
          console.warn(`⚠️ Target text NOT found in Sanity database body for: ${sourceSlug}`);
          // Let's print out a snippet of the database body to see if it was already updated or has minor variations
          console.log(`   DB body preview: ${body.slice(0, 300)}...`);
        } else {
          console.log(`   Target text found in Sanity. Replacing...`);
          const newBody = body.replace(targetText, replacementText);
          const patchResult = await client.patch(post._id).set({ body: newBody }).commit();
          console.log(`   ✅ Database updated. Transaction ID: ${patchResult._id}`);
        }
      }
    } catch (e) {
      console.error(`   ❌ Sanity database patch error:`, e.message);
    }
    
    // 2. Update local markdown file if it exists
    const draftFileName = slugToDraftBodyPath[sourceSlug];
    if (draftFileName) {
      const localFilePath = path.resolve(__dirname, `./${draftFileName}`);
      if (fs.existsSync(localFilePath)) {
        try {
          let localBody = fs.readFileSync(localFilePath, 'utf-8');
          if (localBody.includes(targetText)) {
            console.log(`   Target text found in local markdown draft. Replacing...`);
            const newLocalBody = localBody.replace(targetText, replacementText);
            fs.writeFileSync(localFilePath, newLocalBody, 'utf-8');
            console.log(`   ✅ Local markdown draft file updated: ${draftFileName}`);
          } else {
            console.log(`   ℹ️ Target text NOT found in local draft file (might be already modified).`);
          }
        } catch (localErr) {
          console.error(`   ❌ Local file update error:`, localErr.message);
        }
      }
    }
  }

  // 3. Compile updated local drafts to JSON
  console.log(`\n========================================`);
  console.log(`Rebuilding JSON draft schemas for updated files...`);
  const slugsToRebuild = new Set(linkInjections.map(i => i.sourceSlug));
  
  for (const slug of slugsToRebuild) {
    const buildScript = slugToBuildCommand[slug];
    if (buildScript) {
      const scriptPath = path.resolve(__dirname, `./${buildScript}`);
      if (fs.existsSync(scriptPath)) {
        try {
          console.log(`Running build script: node scripts/${buildScript}`);
          // Require and execute the build script dynamically
          const originalConsoleLog = console.log;
          // Temporarily suppress output to avoid cluttering logs
          console.log = function() {};
          require(scriptPath);
          console.log = originalConsoleLog;
          console.log(`✅ Rebuilt draft JSON for: ${slug}`);
        } catch (buildErr) {
          console.error(`❌ Build script failed for: ${buildScript} - ${buildErr.message}`);
        }
      }
    }
  }
  
  console.log(`\n========================================`);
  console.log(`🎉 Cleanup Execution Complete!`);
}

executeInjections().catch(console.error);
