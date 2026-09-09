import { Zap, Globe, BarChart3, Search, Code2 } from 'lucide-react';

export const serviceData = {
    "n8n-automation": {
        title: "Stop Renting Your Time. Start Building Assets.",
        subtitle: "Replace manual data entry with autonomous agents. We build self-healing workflows that qualify leads and sync your CRM, saving your team 20+ hours weekly.",
        price: "$750",
        cta: "Automate Your Workflows",
        themeColor: "#10b981", // Green
        icon: Zap,
        features: [
            "Lead Enrichment Integrations",
            "Auto-Generated PDF Reports",
            "Two-Way CRM Sync"
        ],
        contactOption: "Custom Workflow Automation",
        detailedContent: [
            "Manual data entry and repetitive admin tasks are the silent killers of agency profitability. Every hour your team spends copying data between sheets or updating CRM fields is an hour stolen from strategy and sales.",
            "As a GTM & RevOps Architect and verified n8n creator, we build robust, custom AI-powered workflows that handle your revenue operations on autopilot. Unlike Zapier, which gets restrictive and costly at scale, we deploy specialized systems — explore our in-depth [ManyChat 2026 pricing teardown](/blog/manychat-pricing-2026/) and technical comparison of [Dify vs n8n AI workflow architecture](/blog/dify-ai-workflow-orchestration-vs-n8n-ai-agent-nodes/) to understand how autonomous systems integrate with your CRM.",
            "This isn't just about saving time; it's about accuracy and speed. Your leads get contacted faster, your reports are generated without errors, and your team can finally focus on what they were hired to do: grow the business."
        ]
    },
    "headless-architecture": {
        title: "Headless CMS Architecture",
        subtitle: "Decouple your frontend to achieve sub-second load times and perfect Core Web Vitals without sacrificing your marketing team's ability to edit content.",
        price: "$1,500",
        cta: "Build My Headless System",
        themeColor: "#3b82f6", // Electric Blue
        icon: Globe,
        features: [
            "Global Edge Caching",
            "Next.js Frontend (React)",
            "Bank-Grade Security (No Plugins)"
        ],
        contactOption: "Headless CMS Architecture",
        detailedContent: [
            "Standard WordPress sites are slow, insecure, and bloated with plugins. When you rely on a traditional monolithic setup, you're constantly fighting against database queries and server load, which kills your Core Web Vitals and SEO.",
            "We decouple your content from your code. You get a Ferrari engine (Next.js) with a comfortable dashboard (WordPress). This 'Headless' architecture allows your marketing team to keep using the CMS they love, while your users experience a site that loads instantly, anywhere in the world.",
            "This isn't just a website; it's a software-grade platform. As a GTM & RevOps Architect, by hosting the frontend on the Edge and optimizing data retrieval — as detailed in our [Pinecone vs Qdrant benchmark on Vultr](/blog/pinecone-vs-qdrant-vultr-benchmark/) — we deliver sub-second response times and zero downtime for modern businesses."
        ]
    },
    "growth-consulting": {
        title: "Clarity in a World of Noise.",
        subtitle: "Analyze operational bottlenecks and build an actionable technical roadmap to scale your agency. Stop revenue leaks and optimize your go-to-market systems.",
        price: "$200/hr",
        cta: "Get My Growth Roadmap",
        themeColor: "#a855f7", // Purple
        icon: BarChart3,
        features: [
            "Tech Stack Audit",
            "SOP Development",
            "Revenue Leak Analysis"
        ],
        contactOption: "General Consulting",
        detailedContent: [
            "Growth isn't just about pouring more leads into the top of the funnel; it's about fixing the leaks in the bucket. Many agencies scale into chaos because their systems (or lack thereof) can't handle the volume.",
            "We partner with you to dissect your current operations, from your tech stack to your team's SOPs. As your GTM & RevOps Architect, we help agency founders transition to the high-ticket [AI automation agency business model](/blog/ai-automation-agency-business-model/) — eliminating manual bottlenecks, streamlining client onboarding, and unlocking sustainable retainers.",
            "Whether it's choosing the right CRM, automating your lead pipelines, or simply simplifying your toolset to save costs, our consulting gives you the clarity and confidence to scale sustainably without breaking your operations."
        ]
    },
    "seo-organic-growth": {
        title: "SEO & Organic Growth",
        subtitle: "Stop publishing content that never ranks. We architect topical authority maps, programmatic entity clusters, and zero-touch search indexing engines.",
        price: "$1,500",
        cta: "Scale Your Organic Growth",
        themeColor: "#f97316", // Orange
        icon: Search,
        features: [
            "Topical Authority Mapping & Content Architecture",
            "Programmatic Entity & Local Clusters",
            "Code-Level Technical & Core Web Vitals Audits",
            "Zero-Touch Automated Search Indexing"
        ],
        contactOption: "SEO & Organic Growth",
        detailedContent: [
            "You can publish dozens of blog posts, but if they lack topical clustering, semantic entity depth, and instant search indexation, your content will sit in Google's crawl queue forever. Modern organic search demands engineering rigor — from schema markup and semantic entities to automated indexing pipelines.",
            "We architect full-scale programmatic entity clusters and topical authority maps that dominate search results. For VibeViso, our local entity clusters drove an explosive surge to 40,000+ organic impressions. For FlowerShop, our programmatic content architecture deployed and indexed 679 high-intent target pages that capture transactional search volume at scale.",
            "Every build is powered by our [Zero-Touch SEO Indexing Engine](/blog/case-study-whoisalfaz-seo-indexing-engine/) — directly connecting your CMS to Google Search Console and IndexNow APIs to index newly published pages within minutes. Combined with forensic code-level Core Web Vitals audits (inspect your site with our [free Screaming Frog alternative](/blog/screaming-frog-alternatives-free-seo-audit-tools/)), we turn organic search into an automated, high-converting revenue driver."
        ]
    },
    "custom-full-stack": {
        title: "Custom Full-Stack Applications",
        subtitle: "When off-the-shelf tools fall short, I build custom full-stack web apps engineered to streamline agency operations and scale your revenue workflows.",
        price: "$2,500",
        cta: "Build My Custom App",
        themeColor: "#f43f5e", // Rose
        icon: Code2,
        features: [
            "Bespoke Internal Portals",
            "Secure Client Dashboards",
            "Real-Time Data Processing"
        ],
        contactOption: "Custom App Development",
        detailedContent: [
            "Off-the-shelf software is great, until it isn't. You reach a point where you're fighting the tool instead of using it, or you're paying for five different subscriptions to do one simple job.",
            "As a GTM & RevOps Architect, I design and build custom web applications tailored exactly to your revenue workflow. Whether it's a client portal that auto-updates from your CRM, a bespoke project management dashboard, or a complex AI data pipeline built for the [AI automation agency business model](/blog/ai-automation-agency-business-model/), I engineer it from the ground up using Next.js and robust backend logic.",
            "Visual aesthetics meet engineering rigor. I don't just build 'functional' apps; I build beautiful, intuitive interfaces that your team and clients will actually enjoy using. Secure, scalable, and owned 100% by you."
        ]
    }
};

// Backwards compatibility alias
serviceData["technical-seo"] = serviceData["seo-organic-growth"];

