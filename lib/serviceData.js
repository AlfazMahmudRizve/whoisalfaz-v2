import { Zap, Globe, BarChart3, Search, Code2 } from 'lucide-react';

export const serviceData = {
    "n8n-automation": {
        title: "Custom n8n Workflow Automation",
        metaTitle: "n8n Workflow Automation Services | whoisalfaz",
        metaDescription: "Eliminate manual data entry and save 20+ hours weekly. Custom n8n workflow automation, CRM sync, and lead qualification for modern agencies.",
        subtitle: "Replace manual data entry with autonomous agents. We build self-healing workflows that qualify leads and sync your CRM, saving your team 20+ hours weekly.",
        price: "$750",
        priceLabel: "Starting at",
        timeline: "2–3 days (Simple) / 2–4 weeks (Agency Systems)",
        paymentTerms: "50% upfront deposit, 50% upon testing and final handover",
        cta: "Automate Your Workflows",
        themeColor: "#10b981", // Emerald Green
        icon: Zap,
        contactOption: "Custom Workflow Automation",
        targetAudience: "Agencies and scaling businesses that spend staff time on manual data entry, copy-paste work between sheets, and repetitive CRM updates.",
        problemStatement: "Manual data entry and repetitive admin tasks drain team capacity from strategy and sales. Leads get contacted late, manual reports accumulate errors, and traditional automation tools become costly at scale.",
        features: [
            "Lead Enrichment Integrations",
            "Auto-Generated PDF Reports",
            "Two-Way CRM Synchronization",
            "Autonomous Error-Handling & Fallbacks"
        ],
        deliverables: [
            "Custom n8n workflows built for your specific operational bottlenecks",
            "Automated lead qualification and routing pipelines",
            "Two-way CRM sync (HubSpot, Airtable, Brevo) with zero manual copy-pasting",
            "Automated reporting systems generating and dispatching reports on schedule",
            "Production deployment with error-handling logic and full credentials handover",
            "30 days of complimentary post-launch monitoring and API maintenance"
        ],
        processSteps: [
            {
                number: "01",
                title: "Discovery & Audit",
                description: "Review current manual workflows, existing software tools, and identify operational bottlenecks."
            },
            {
                number: "02",
                title: "Draft Strategy",
                description: "Map the workflow logic, API connections, error fallbacks, and agree on measurable completion criteria."
            },
            {
                number: "03",
                title: "Solution Build",
                description: "Build and test the n8n workflows in staging environments against edge-case data payloads."
            },
            {
                number: "04",
                title: "Handover & Support",
                description: "Deploy to production, hand over environment credentials, and provide 30 days of active monitoring."
            }
        ],
        buyerRequirements: [
            "Detailed description of the manual process and data flow to be automated",
            "Inventory of tools in use (CRM, forms, spreadsheets, messaging channels)",
            "Staging API access or sandbox credentials for testing and deployment",
            "A designated technical point of contact for milestone reviews and testing"
        ],
        faqs: [
            {
                question: "Can you connect to my specific CRM or marketing stack?",
                answer: "Yes. If your platform provides a REST API, webhook, or SDK, we can connect it. We routinely integrate HubSpot, Airtable, Brevo, ManyChat, Slack, PostgreSQL, and Google Workspace."
            },
            {
                question: "Do I need to pay for n8n hosting?",
                answer: "You have two options: n8n Cloud (approx. $20/month) or self-hosted n8n on a dedicated VPS (approx. $5–$10/month). We configure and harden either environment for you."
            },
            {
                question: "What support is included after launch?",
                answer: "Every workflow build includes 30 days of complimentary monitoring. Optional monthly maintenance retainers are available thereafter for ongoing API updates and feature expansions."
            },
            {
                question: "What is the standard delivery timeline?",
                answer: "Standard delivery takes 2–3 business days for focused single-task workflows, and 2–4 weeks for multi-tool agency operational systems."
            }
        ],
        detailedContent: [
            "Manual data entry and repetitive admin tasks are the silent killers of agency profitability. Every hour your team spends copying data between sheets or updating CRM fields is an hour stolen from strategy and sales.",
            "As a GTM & RevOps Architect and verified n8n creator, we build custom AI-powered workflows that handle your revenue operations on autopilot. Unlike Zapier, which gets restrictive and costly at scale, we deploy specialized systems — explore our in-depth [ManyChat 2026 pricing teardown](/blog/manychat-pricing-2026/) and technical comparison of [Dify vs n8n AI workflow architecture](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/) to understand how autonomous systems integrate with your CRM.",
            "This isn't just about saving time; it's about accuracy and speed. Your leads get contacted faster, your reports are generated without errors, and your team can finally focus on what they were hired to do: grow the business."
        ]
    },
    "custom-full-stack": {
        title: "Custom Full-Stack Next.js Applications & Websites",
        metaTitle: "Custom Full-Stack Next.js Apps | whoisalfaz",
        metaDescription: "Custom Next.js web applications, internal agency portals, secure client dashboards, and high-performance websites engineered for scale.",
        subtitle: "When off-the-shelf software falls short, I build bespoke Next.js web applications, client portals, and marketing websites tailored to your revenue workflow.",
        price: "$2,500",
        priceLabel: "Starting at",
        timeline: "2–4 weeks depending on scope and data complexity",
        paymentTerms: "50% upfront deposit, 50% upon deployment and handover",
        cta: "Build My Custom App",
        themeColor: "#f43f5e", // Rose Red
        icon: Code2,
        contactOption: "Custom App Development",
        targetAudience: "Founders, agencies, and businesses that have outgrown rigid off-the-shelf SaaS, need custom software matching their exact operational workflow, or require a high-speed Next.js web platform.",
        problemStatement: "Generic SaaS platforms force teams into clunky workarounds, duplicate subscriptions, and fragmented data. Off-the-shelf website builders produce bloated code, sluggish performance, and mediocre Core Web Vitals.",
        features: [
            "Bespoke Internal Agency Portals",
            "Secure Client Dashboards & Auth",
            "Real-Time Data Processing Pipelines",
            "High-Performance Next.js Architecture"
        ],
        deliverables: [
            "Custom web applications and high-performance Next.js marketing websites",
            "Bespoke client portals syncing bidirectionally with your CRM and database",
            "Internal agency dashboards with role-based access control (RBAC)",
            "AI data processing pipelines designed for scalable operations",
            "Production deployment with TypeScript, Tailwind CSS, and Supabase / PostgreSQL",
            "100% full source code ownership with zero vendor lock-in"
        ],
        processSteps: [
            {
                number: "01",
                title: "Discovery & Audit",
                description: "Review your operational workflow, data requirements, user journeys, and technical prerequisites."
            },
            {
                number: "02",
                title: "Draft Strategy",
                description: "Architect the software data schema, component structure, API contracts, and user experience wireframes."
            },
            {
                number: "03",
                title: "Solution Build",
                description: "Develop the frontend in Next.js, React, and TypeScript with backend logic, database, and auth integrations."
            },
            {
                number: "04",
                title: "Final Handover & Support",
                description: "Perform end-to-end QA testing, deploy to production hosting, hand over the repository, and provide 30-day support."
            }
        ],
        buyerRequirements: [
            "Project brief detailing user workflows, required features, and integrations",
            "Brand assets, design guidelines, and copy (or content structure)",
            "Access to third-party APIs, auth providers, or database hosting environments",
            "A designated decision-maker for milestone reviews and design approvals"
        ],
        faqs: [
            {
                question: "What technologies do you use for full-stack builds?",
                answer: "We build with modern, production-grade stacks: Next.js (App Router), React, TypeScript, and Tailwind CSS on the frontend, with Node.js, PostgreSQL, or Supabase for data management."
            },
            {
                question: "Do I own the source code upon project completion?",
                answer: "Yes. You own 100% of the custom source code, repository, and design assets upon final handover with zero vendor lock-in or recurring software licensing fees to us."
            },
            {
                question: "Can you build both internal tools and client-facing web applications?",
                answer: "Yes. We engineer both high-conversion public websites (such as fasttools.me) and secure authenticated internal platforms, including client reporting portals and agency dashboards."
            },
            {
                question: "What is the standard delivery timeline and cost?",
                answer: "Projects start at $2,500 with standard delivery spanning 2–4 weeks depending on database schemas, third-party API integrations, and frontend complexity."
            }
        ],
        detailedContent: [
            "Off-the-shelf software is great, until it isn't. You reach a point where you're fighting the tool instead of using it, or you're paying for five different subscriptions to do one simple job.",
            "As a GTM & RevOps Architect, I design and build custom web applications and high-performance websites tailored exactly to your revenue workflow. Whether it's a client portal that auto-updates from your CRM, a bespoke project management dashboard, or a complex AI data pipeline built for the [AI automation agency business model](/blog/ai-automation-agency-business-model/), I engineer it from the ground up using Next.js and backend logic.",
            "Visual aesthetics meet engineering rigor. I don't just build 'functional' apps; I build intuitive interfaces that your team and clients will actually enjoy using. Secure, scalable, and owned 100% by you."
        ]
    },
    "headless-architecture": {
        title: "Headless CMS Architecture & Edge Infrastructure",
        metaTitle: "Headless CMS Infrastructure | whoisalfaz",
        metaDescription: "Sub-second load times and bank-grade security. Decouple your CMS with Next.js frontend architecture and global edge caching.",
        subtitle: "Decouple your frontend to achieve sub-second load times and perfect Core Web Vitals without sacrificing your marketing team's ability to edit content.",
        price: "$1,500",
        priceLabel: "Starting at",
        timeline: "1–3 weeks for complete decoupling and edge migration",
        paymentTerms: "50% upfront deposit, 50% upon deployment and verification",
        cta: "Build My Headless System",
        themeColor: "#3b82f6", // Electric Blue
        icon: Globe,
        contactOption: "Headless CMS Architecture",
        targetAudience: "Businesses with traditional CMS or WordPress sites that suffer from slow load times, security vulnerabilities, or poor Core Web Vitals, but whose marketing teams still require a visual CMS.",
        problemStatement: "Monolithic WordPress sites struggle with database queries, plugin bloat, and server overhead that degrade Core Web Vitals and search rankings. Every second of page latency leaks prospective customers.",
        features: [
            "Global Edge Caching & CDN",
            "Next.js Frontend Architecture",
            "Bank-Grade Security (No Public Database)",
            "On-Demand Cache Revalidation"
        ],
        deliverables: [
            "Decoupled Next.js frontend deployed to global edge networks",
            "Headless CMS integration (WordPress REST/GraphQL, Sanity, or Strapi)",
            "Automated on-demand cache revalidation for instant content updates",
            "Bank-grade security posture with zero direct visitor access to the database",
            "Full Core Web Vitals optimization targeting 95+ Lighthouse scores",
            "Complete 301 redirect mapping to preserve existing SEO authority"
        ],
        processSteps: [
            {
                number: "01",
                title: "Discovery & Audit",
                description: "Profile existing database bottlenecks, plugin dependencies, and baseline Core Web Vitals scores."
            },
            {
                number: "02",
                title: "Draft Strategy",
                description: "Design the decoupled content model, Next.js frontend architecture, and edge caching rules."
            },
            {
                number: "03",
                title: "Solution Build",
                description: "Code the Next.js frontend, connect headless CMS APIs, and configure edge revalidation webhooks."
            },
            {
                number: "04",
                title: "Final Handover & Support",
                description: "Execute zero-downtime DNS cutover, verify analytics tracking, and provide 30 days of active support."
            }
        ],
        buyerRequirements: [
            "Administrative access to your current CMS and hosting environment",
            "Inventory of custom post types, taxonomies, and critical URL structures",
            "DNS management access (Cloudflare, Vercel, or domain registrar)",
            "An editorial contact to review and verify the staging preview workflow"
        ],
        faqs: [
            {
                question: "What is a headless CMS architecture?",
                answer: "Headless decouples the presentation layer (the Next.js frontend) from content management (the CMS). Editors continue managing articles in WordPress or Sanity, while visitors browse a blazing-fast edge frontend."
            },
            {
                question: "Can my marketing team keep using WordPress?",
                answer: "Yes. Your marketing team keeps their familiar WordPress editor for drafting and publishing, but visitors never touch the WordPress server or its database directly."
            },
            {
                question: "Will existing SEO URLs and redirects be preserved?",
                answer: "Yes. We map your exact canonical URL hierarchy and configure 301 redirects to ensure 100% preservation of search equity and indexing history."
            },
            {
                question: "What is the delivery timeline and investment?",
                answer: "Pricing starts at $1,500 with standard turnaround completed within 1–3 weeks, depending on content volume and custom template migration requirements."
            }
        ],
        detailedContent: [
            "Standard WordPress sites are slow, insecure, and bloated with plugins. When you rely on a traditional monolithic setup, you're constantly fighting against database queries and server load, which kills your Core Web Vitals and SEO.",
            "We decouple your content from your code. You get a Ferrari engine (Next.js) with a comfortable dashboard (WordPress). This 'Headless' architecture allows your marketing team to keep using the CMS they love, while your users experience a site that loads instantly, anywhere in the world.",
            "This isn't just a website; it's a software-grade platform. As a GTM & RevOps Architect, by hosting the frontend on the Edge and optimizing data retrieval — as detailed in our [Pinecone vs Qdrant benchmark on Vultr](/blog/pinecone-vs-qdrant-vultr-benchmark/) — we deliver sub-second response times and zero downtime for modern businesses."
        ]
    },
    "growth-consulting": {
        title: "RevOps & Growth Strategy Consulting",
        metaTitle: "Strategy & Growth Consulting | whoisalfaz",
        metaDescription: "Diagnose operational bottlenecks, eliminate revenue leaks, and build an actionable technical roadmap to scale your agency operations.",
        subtitle: "Analyze operational bottlenecks and build an actionable technical roadmap to scale your agency. Stop revenue leaks and optimize your go-to-market systems.",
        price: "$200/hr",
        priceLabel: "Billed at",
        timeline: "3–5 business days from audit to final technical roadmap",
        paymentTerms: "Billed upfront per scheduled strategy sprint block",
        cta: "Get My Growth Roadmap",
        themeColor: "#a855f7", // Purple
        icon: BarChart3,
        contactOption: "General Consulting",
        targetAudience: "Agency founders and operators experiencing operational friction, whose delivery capacity or profit margins are constrained by manual bottlenecks, tool sprawl, or broken lead pipelines.",
        problemStatement: "Scaling an agency without streamlined systems creates operational chaos. Customer onboarding stalls, team handoffs fail, and founders spend their days firefighting admin rather than closing high-ticket deals.",
        features: [
            "Tech Stack & Tool Redundancy Audit",
            "SOP Development & Workflow Mapping",
            "Revenue Leak & Pipeline Analysis",
            "Actionable Technical Growth Roadmap"
        ],
        deliverables: [
            "Full-scope tech stack audit and tool redundancy analysis",
            "Forensic revenue leak diagnosis across lead qualification and client onboarding",
            "Standard Operating Procedure (SOP) frameworks and workflow optimization plans",
            "Actionable technical roadmap for transitioning to high-margin automation models",
            "Concrete priority matrix detailing immediate quick-wins versus strategic overhauls"
        ],
        processSteps: [
            {
                number: "01",
                title: "Discovery & Audit",
                description: "Deep-dive assessment of current tools, team workflows, and friction points."
            },
            {
                number: "02",
                title: "Draft Strategy",
                description: "Identification of revenue leaks, tool redundancy, and architectural gaps."
            },
            {
                number: "03",
                title: "Review & Prioritization",
                description: "Collaborative session to calibrate priorities, budgets, and sequencing."
            },
            {
                number: "04",
                title: "Final Roadmap",
                description: "Delivery of an exhaustive, step-by-step written engineering roadmap."
            }
        ],
        buyerRequirements: [
            "Clear overview of current sales pipelines, client onboarding steps, and delivery SOPs",
            "Inventory of active software subscriptions, CRMs, and monthly operational tool spend",
            "Summary of primary operational bottlenecks and team capacity constraints",
            "Attendance of key operational decision-makers in strategy review sessions"
        ],
        faqs: [
            {
                question: "How does consulting differ from an implementation build?",
                answer: "Consulting delivers high-level operational diagnosis, tech stack audits, and strategic technical roadmaps. Build execution (e.g. custom n8n workflows or app development) is scoped separately based on the roadmap."
            },
            {
                question: "What format are consulting sessions and deliverables?",
                answer: "Consulting includes dedicated video strategy sessions alongside a written, actionable technical audit and roadmap document with tool recommendations and SOP outlines."
            },
            {
                question: "What tools and operations do you specialize in?",
                answer: "We specialize in agency revenue operations: CRMs (HubSpot, Airtable), automation platforms (n8n), AI agent architectures, and custom Next.js operational portals."
            },
            {
                question: "What is the investment and booking procedure?",
                answer: "Consulting is billed at $200/hr in dedicated strategy sprint blocks. Sessions are scheduled directly upon reservation, with audits delivered within 3–5 business days."
            }
        ],
        detailedContent: [
            "Growth isn't just about pouring more leads into the top of the funnel; it's about fixing the leaks in the bucket. Many agencies scale into chaos because their systems (or lack thereof) can't handle the volume.",
            "We partner with you to dissect your current operations, from your tech stack to your team's SOPs. As your GTM & RevOps Architect, we help agency founders transition to the high-ticket [AI automation agency business model](/blog/ai-automation-agency-business-model/) — eliminating manual bottlenecks, streamlining client onboarding, and unlocking sustainable retainers.",
            "Whether it's choosing the right CRM, automating your lead pipelines, or simply simplifying your toolset to save costs, our consulting gives you the clarity and confidence to scale sustainably without breaking your operations."
        ]
    },
    "seo-organic-growth": {
        title: "SEO & Organic Growth Engineering",
        metaTitle: "SEO & Organic Growth Services | whoisalfaz",
        metaDescription: "Dominate organic search with topical authority maps, programmatic entity clusters, Core Web Vitals audits, and zero-touch Google indexing.",
        subtitle: "Stop publishing content that never ranks. We architect programmatic entity clusters, topical authority maps, and zero-touch search indexing engines.",
        price: "$1,500",
        priceLabel: "Starting at",
        timeline: "2–4 weeks for architecture, cluster mapping, and indexing deployment",
        paymentTerms: "50% upfront deposit, 50% upon deployment and delivery",
        cta: "Scale Your Organic Growth",
        themeColor: "#f97316", // Orange
        icon: Search,
        contactOption: "SEO & Organic Growth",
        targetAudience: "Brands and agencies publishing content that remains trapped in Google's crawl queue, or companies looking to scale organic search with programmatic architecture and automated indexation.",
        problemStatement: "Publishing disconnected blog posts without semantic entity depth or automated indexation yields stagnant organic traffic. Search engines prioritize semantic entity authority and technical code-level performance.",
        features: [
            "Topical Authority Mapping & Architecture",
            "Programmatic Entity & Local Clusters",
            "Code-Level Technical & Core Web Vitals Audits",
            "Zero-Touch Automated Search Indexing"
        ],
        deliverables: [
            "Topical authority maps and structured content hierarchy architecture",
            "Programmatic entity clusters targeting high-intent commercial queries",
            "Structured data implementation (Schema.org JSON-LD for rich snippets)",
            "Zero-touch automated search indexing engine (Google Indexing API & IndexNow)",
            "Code-level Core Web Vitals audit and page speed remediation",
            "30 days of indexation tracking and crawl monitoring"
        ],
        processSteps: [
            {
                number: "01",
                title: "Discovery & Audit",
                description: "Forensic technical audit of crawl health, entity gaps, and Core Web Vitals."
            },
            {
                number: "02",
                title: "Draft Strategy",
                description: "Blueprint topical authority clusters, entity schema, and target keyword hierarchies."
            },
            {
                number: "03",
                title: "Solution Build",
                description: "Deploy programmatic clusters, schema markup, and automated indexing webhooks."
            },
            {
                number: "04",
                title: "Final Handover & Support",
                description: "Detailed audit report, Indexing API verification, and 30-day tracking."
            }
        ],
        buyerRequirements: [
            "Google Search Console and Google Analytics 4 property access",
            "List of core transactional services, target geographic markets, and priorities",
            "CMS access or developer contact to review schema and template deployment",
            "Designated marketing contact for review and strategy alignment"
        ],
        faqs: [
            {
                question: "Did you build VibeViso or FlowerShop?",
                answer: "No. Work on VibeViso and FlowerShop was technical and programmatic SEO architecture, not website development. Local entity clusters and content hierarchies were engineered for those platforms."
            },
            {
                question: "What do the 40k+ impressions and 679 pages figures represent?",
                answer: "These are self-published case figures from past programmatic SEO deployments demonstrating the traffic acceleration and indexation scale achievable through structured entity clustering."
            },
            {
                question: "How does the zero-touch automated indexing engine work?",
                answer: "The engine connects your CMS directly to Google Search Console and IndexNow APIs via automated webhooks, requesting crawling within minutes of publication rather than waiting weeks for bot discovery."
            },
            {
                question: "Are ranking or traffic outcomes guaranteed?",
                answer: "No ethical SEO guarantees third-party Google rankings. We guarantee engineering excellence: technical health, deep semantic entity mapping, and automated indexation pipelines."
            }
        ],
        detailedContent: [
            "You can publish dozens of blog posts, but if they lack topical clustering, semantic entity depth, and instant search indexation, your content will sit in Google's crawl queue forever. Modern organic search demands engineering rigor — from schema markup and semantic entities to automated indexing pipelines.",
            "We architect full-scale programmatic entity clusters and topical authority maps that dominate search results. For VibeViso, our local entity clusters drove an explosive surge to 40,000+ organic impressions. For FlowerShop, our programmatic content architecture deployed and indexed 679 high-intent target pages that capture transactional search volume at scale.",
            "Every build is powered by our [Zero-Touch SEO Indexing Engine](/blog/case-study-whoisalfaz-seo-indexing-engine/) — directly connecting your CMS to Google Search Console and IndexNow APIs to index newly published pages within minutes. Combined with forensic code-level Core Web Vitals audits (inspect your site with our [free Screaming Frog alternative](/blog/screaming-frog-alternatives-free-seo-audit-tools/)), we turn organic search into an automated, high-converting revenue driver."
        ]
    }
};

// Backwards compatibility alias
serviceData["technical-seo"] = serviceData["seo-organic-growth"];
