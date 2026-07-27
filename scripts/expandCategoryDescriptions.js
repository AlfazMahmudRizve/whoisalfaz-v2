const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_SECRET_TOKEN,
  apiVersion: '2026-05-13',
});

const categoryData = [
  {
    slug: 'ai-content-systems',
    name: 'AI Content Systems',
    description: `The AI Content Systems category focuses on building scalable, automated, and production-grade content engineering pipelines powered by modern Large Language Models (LLMs), headless CMS architectures, and custom API orchestration layers. Modern digital marketing and technical publishing demand far more than basic generative text snippets; they require robust algorithmic content generation, structured schema markup injection, multi-modal asset synthesis, and strict automated quality gates.

In this dedicated hub, we explore comprehensive architectural blueprints for leveraging frameworks like n8n, LangChain, Next.js, and Sanity CMS to construct self-healing automated publishing engines. We cover end-to-end technical workflows including automated research aggregation from scientific literature and web crawlers, AI-driven technical outline creation, automated SEO metadata generation, programmatic internal linking algorithms, and multi-channel syndication to platforms such as Dev.to, Medium, Hashnode, and social media ecosystems.

Furthermore, we dive deep into advanced engineering topics such as LLM context window optimization, prompt caching strategies, programmatic rate-limiting, retry logic with exponential backoff, error fallback routines, automated image generation via AI multimodal models, and real-time content verification using semantic embeddings and vector databases like Pinecone or Qdrant. Each tutorial breaks down how to balance programmatic efficiency with human-in-the-loop review mechanisms, preventing content hallucinations and maintaining strict search engine optimization compliance.

Additionally, our technical guides examine continuous integration and continuous publishing (CI/CD) pipelines for content assets. We demonstrate how to automate schema validation, inject JSON-LD microdata, enforce canonical URL integrity, and synchronize real-time XML sitemaps whenever new AI-generated articles are deployed. Whether you are an enterprise technical team looking to scale publishing velocity without sacrificing editorial integrity, or a full-stack engineer building programmatic SEO platforms, these technical guides provide battle-tested code snippets, downloadable workflow files, architectural design patterns, and enterprise reference implementations to help you build and master enterprise-grade automated AI content systems.`
  },
  {
    slug: 'learn-automation-in-30-days',
    name: 'Learn Automation in 30 Days',
    description: `Welcome to the Learn Automation in 30 Days series—an intensive, hands-on technical curriculum designed to take developers, RevOps specialists, and digital engineers from automation novices to advanced workflow architects. Throughout this comprehensive 30-day roadmap, each daily lesson focuses on solving a real-world business automation challenge using modern open-source tools like n8n, Webhooks, REST APIs, PostgreSQL databases, and AI integration layers.

Rather than relying on basic high-level summaries or trivial examples, this series delivers production-ready blueprints that tackle foundational and complex integration patterns. You will master webhooks routing, payload transformation using custom JavaScript and JSONata, secure API authentication using OAuth2 and API keys, error handling and dead-letter queues, rate-limiting resilience, and background queue workers. As the series progresses, we integrate advanced AI capabilities into daily workflows—such as automated lead scoring with OpenAI APIs, dynamic email parsing, autonomous customer support agent routing, CRM synchronizations with Hubspot and Monday.com, and automated reporting dashboards with Databox and Google Sheets.

Each article includes fully documented code snippets, downloadable n8n workflow JSON templates, architectural diagrams, and step-by-step implementation notes. By following along day by day, you will build a robust portfolio of operational automations, eliminate repetitive manual workflows in your organization, and gain deep technical mastery over modern event-driven workflow automation architectures.

To ensure long-term operational stability, this curriculum also covers comprehensive testing methodologies and security best practices for automated systems. You will learn how to mock API endpoints for offline testing, manage environment variables securely across staging and production environments, implement least-privilege API access controls, and set up automated health-check alerts. Whether you are looking to streamline revenue operations, automate lead generation pipelines, build internal microtools, or scale cloud workflows, this 30-day series provides the exact tactical knowledge, executable scripts, and architectural foundations required to achieve production engineering excellence.`
  },
  {
    slug: 'n8n-automation',
    name: 'n8n Automation',
    description: `The n8n Automation category is your definitive technical resource for building self-hosted, scalable, and enterprise-ready workflow automations using n8n. As an open-source node-based workflow automation engine, n8n offers unmatched flexibility, data privacy, and extensibility compared to traditional proprietary SaaS platforms. Here, we delve into the core architecture of n8n, detailing best practices for self-hosting on Docker, Railway, and Kubernetes, configuring Redis-backed scaling queues, and optimizing PostgreSQL execution storage.

Our articles cover a broad spectrum of real-world integration engineering: from creating custom n8n community nodes and writing complex JavaScript transform nodes to handling multi-branch conditional logic, webhook listeners, dynamic payload mapping, and custom API authorization header injections. We place strong emphasis on integrating AI and Machine Learning capabilities directly into n8n nodes, demonstrating how to build autonomous AI agents, multi-modal vision processors, vector database retrievers (RAG), and conversational interfaces using LangChain and OpenAI endpoints.

Additionally, we tackle enterprise operational requirements including centralized logging, monitoring execution metrics, managing API rate limits, handling third-party service outages with exponential retries, and setting up automated alert notifications via Slack, Discord, and Telegram.

Beyond foundational integrations, our advanced tutorials cover custom node development using TypeScript, modular sub-workflow execution architectures, and state persistence strategies for long-running workflows across distributed worker instances. You will discover how to optimize memory management, inspect raw JSON executions for deep debugging, and enforce strict security protocols for webhook endpoints. Whether you are building complex B2B lead enrichment pipelines, automated RevOps dashboards, or multi-platform content syndication engines, our comprehensive guides, downloadable workflow JSONs, and deep-dive technical tutorials equip you to harness the full power of n8n automation for high-volume enterprise operations and robust cloud automation architectures.`
  },
  {
    slug: 'revops-architecture',
    name: 'RevOps Architecture',
    description: `The RevOps Architecture category focuses on the strategic design, data pipeline integration, and technical infrastructure required to build seamless Revenue Operations (RevOps) systems. In modern growth enterprises, revenue alignment across Marketing, Sales, and Customer Success depends heavily on unified data architectures, robust CRM configurations, real-time lead routing, and automated analytics pipelines.

In this section, we break down the engineering methodologies behind connecting disjointed tech stacks into cohesive, automated revenue machines. We explore custom integrations between platforms like HubSpot, Salesforce, Monday.com, Stripe, Brevo, Databox, and Clearbit or Apollo lead intelligence databases. Learn how to architect real-time webhook listeners, model bidirectional customer data synchronizations, implement idempotent pipeline updates, enforce schema validation, and construct single-source-of-truth data warehouses in PostgreSQL or BigQuery.

Our deep-dive articles also examine crucial RevOps metrics and visualization techniques—such as tracking pipeline velocity, Customer Acquisition Cost (CAC), Lifetime Value (LTV), lead-to-opportunity conversion rates, and churn predictability. We demonstrate how to automate complex attribution models and feed live revenue data into interactive real-time dashboards for executive visibility.

Furthermore, we explore essential data hygiene practices, schema enforcement strategies, and automated audit mechanisms required for scalable revenue operations. Learn how to implement automated lead deduplication algorithms, verify cryptographic webhook signatures to prevent data tampering, resolve race conditions across parallel webhooks, and construct immutable audit logs for tracking customer lifecycle state transitions. Combining system architecture principles with practical automation scripts, these guides empower RevOps engineers, solutions architects, revenue operations managers, and technical leaders to eliminate data silos, reduce operational friction, optimize sales pipeline performance, and drive predictable enterprise revenue growth through scalable modern software engineering and automation principles.`
  },
  {
    slug: 'tool-comparisons',
    name: 'Tool Comparisons',
    description: `Navigating the rapidly expanding landscape of software engineering tools, cloud services, automation platforms, and AI frameworks can be overwhelming. The Tool Comparisons category delivers objective, benchmark-driven, and architecture-focused evaluations of competing technology solutions to help software engineers, DevOps specialists, data architects, and tech leaders make informed stack decisions.

Unlike superficial marketing feature lists or biased affiliate rundowns, our comparisons provide deep-dive technical breakdowns based on hands-on empirical testing, performance benchmarks, API flexibilities, pricing structures, data privacy guarantees, and developer experience. We compare major automation platforms like n8n vs Zapier vs Make, vector databases like Pinecone vs Qdrant vs Weaviate, SDR platforms like AI SDRs vs Human SDR teams, and SEO auditing tools like Screaming Frog vs automated headless web scrapers.

Each guide details specific technical criteria such as self-hosting capabilities, throughput latency under heavy loads, rate-limiting resilience, schema flexibility, integration ecosystem size, and total cost of ownership (TCO) at enterprise scale. We also provide clear decision matrices, architectural trade-off charts, and situational recommendations, helping you select the right tool based on your team size, security compliance requirements, budget constraints, and long-term engineering roadmap.

Our comparative methodologies rely on transparent testing frameworks. We publish stress-test scripts, payload latency distribution charts, API rate limit recovery curves, and financial ROI models for each evaluated tool pair. Additionally, we analyze cloud vendor lock-in risks, community support vitality, and migration pathways to ensure your technology stack remains adaptable as your engineering demands grow. Whether you are re-architecting your company's data stack, evaluating AI infrastructure, or choosing between open-source and proprietary SaaS tools, our comprehensive comparison guides give you the empirical data and expert analysis required to make confident engineering choices.`
  },
  {
    slug: 'ai-lead-generation',
    name: 'AI Lead Generation',
    description: `The AI Lead Generation category explores the intersection of artificial intelligence, outbound sales engineering, and automated prospecting systems. Traditional cold outreach and manual lead sourcing are no longer sufficient to sustain rapid enterprise growth. Modern outbound engines leverage machine learning algorithms, natural language processing, and automated web scrapers to identify, enrich, qualify, and engage ideal customer profiles (ICPs) at unprecedented scale and precision.

Here, we present end-to-end technical blueprints for building autonomous B2B lead generation infrastructure. You will discover how to combine platforms like Apollo.io, LinkedIn Sales Navigator, Google Maps scrapers, Brevo, ManyChat, and custom OpenAI/Anthropic API agents inside workflow engines like n8n. We cover crucial topics such as programmatic lead list scraping, automated email verification and domain warm-up strategies, hyper-personalized cold email generation using multi-source intelligence, dynamic lead scoring algorithms based on firmographic data, and behavioral intent signal tracking.

Furthermore, we explore multi-channel acquisition tactics—including WhatsApp and Instagram automated funnel capture, AI voice SDR agents powered by ElevenLabs, and real-time CRM lead routing. Each technical guide includes downloadable automation workflows, prompt engineering templates, script configurations, and compliance strategies for international privacy regulations like GDPR and CAN-SPAM.

To safeguard sender reputation and optimize inbox placement, we also cover advanced email deliverability engineering. Learn how to configure SPF, DKIM, DMARC, and custom tracking domains, manage IP warm-up schedules, and implement real-time sentiment analysis on incoming prospect replies to route warm leads immediately to account executives. Whether you are an agency owner, growth engineer, sales operations lead, or outbound specialist, these articles will teach you how to build scalable, high-converting AI lead generation systems that consistently deliver qualified sales opportunities.`
  },
  {
    slug: 'architecture-teardowns',
    name: 'Architecture Teardowns',
    description: `The Architecture Teardowns category provides comprehensive structural dissections and technical post-mortems of modern software applications, enterprise SaaS platforms, and automated system integrations. Understanding how successful, high-throughput systems are engineered in production is one of the most effective ways to master software design patterns, cloud infrastructure, and data pipeline efficiency.

In this series of deep dives, we dismantle complex software architectures layer by layer. We inspect backend API designs, database schemas, message queuing systems, microservice communications, caching mechanisms, and frontend state management strategies across real-world case studies and tech stacks. From foodtech ordering platforms and cold email execution engines to voice AI sales agents and RAG-powered vector search engines, our teardowns highlight both technical triumphs and subtle design flaws.

Each teardown features detailed system architecture diagrams, data flow representations, API endpoint analysis, database schema definitions, and code-level breakdowns. We evaluate system performance under heavy load, security posture, failure modes, cost efficiency, infrastructure overhead, and scalability bottlenecks.

In addition to analyzing production successes, our teardowns investigate common architectural anti-patterns and performance bottlenecks. We demonstrate how to diagnose latency spikes, resolve database lock contention, fix memory leaks in node processes, and refactor monolithic codebases into decoupled microservices. We also examine resiliency patterns, circuit breakers, load balancing policies, and automated failover recovery procedures. By examining real-world production setups and understanding why specific technical trade-offs were made, software engineers, DevOps specialists, system architects, and technical founders can glean actionable insights to apply when designing, scaling, refactoring, or optimizing their own enterprise software architectures.`
  },
  {
    slug: '30-days-of-n8n-automation',
    name: '30 Days of n8n Automation',
    description: `The 30 Days of n8n Automation category houses the complete index of technical guides, practical workflows, and step-by-step tutorials from our flagship 30-day intensive n8n engineering challenge. n8n is the industry-standard node-based workflow automation platform, offering granular node-level control, self-hosted data ownership, and deep API integration capabilities for modern developers and engineering teams.

Over the course of 30 structured days, this curriculum systematically walks you through constructing 30 distinct, production-grade automations from scratch. Starting from initial n8n installation, node configuration, environment variable security, and webhook protection, the series progresses into advanced enterprise integration engineering. You will learn to build automated lead enrichment pipelines, custom web scrapers, multi-agent AI assistants, automated SEO auditing tools, cold email dispatch machines, dynamic video/audio synthesis workflows, and real-time RevOps analytics dashboards.

Each day's entry comes equipped with a downloadable, ready-to-import n8n workflow JSON file, full code walkthroughs for custom JavaScript Code nodes, and exhaustive explanations of API payload structures. Designed specifically for developers, systems integrators, solutions architects, and technical entrepreneurs, this 30-day collection serves as a practical library of reusable automation components that you can immediately adapt and deploy to streamline business processes, eliminate repetitive operational overhead, and elevate your workflow engineering capabilities to an enterprise standard.

Furthermore, this series emphasizes modular workflow design principles and robust production deployment strategies. Learn how to implement automated backup routines for your n8n workflow database, set up continuous integration pipelines for custom node deployments, enforce environment isolation between staging and production, and manage execution logs efficiently to prevent database bloat over time.`
  }
];

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

async function main() {
  console.log(`🚀 Starting Category Descriptions Patch... Total categories: ${categoryData.length}`);

  for (const item of categoryData) {
    const wordCount = countWords(item.description);
    console.log(`\n📌 Processing '${item.name}' (${item.slug}) - Word count: ${wordCount}`);

    try {
      const existing = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]`,
        { slug: item.slug }
      );

      if (existing) {
        console.log(` Found existing category document (ID: ${existing._id}). Patching description...`);
        const result = await client
          .patch(existing._id)
          .set({ description: item.description, name: item.name })
          .commit();
        console.log(`✅ Successfully updated '${item.name}' (ID: ${result._id}) [Words: ${wordCount}]`);
      } else {
        console.log(` Category not found in Sanity. Creating new category document...`);
        const doc = {
          _type: 'category',
          name: item.name,
          slug: {
            _type: 'slug',
            current: item.slug,
          },
          description: item.description,
        };
        const created = await client.create(doc);
        console.log(`🎉 Created new category '${item.name}' (ID: ${created._id}) [Words: ${wordCount}]`);
      }
    } catch (err) {
      console.error(`❌ Failed to process category '${item.slug}':`, err.message);
    }
  }

  console.log('\n✨ Category Descriptions Patch complete!');
}

main();
