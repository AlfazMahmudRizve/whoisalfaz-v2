import { Zap, Globe, BarChart3, Search, Video, MessageSquare } from 'lucide-react';

export const serviceData = {
    "n8n-automation": {
        title: "Stop Renting Your Time. Start Building Assets.",
        subtitle: "We replace manual tasks with intelligent n8n workflows.",
        price: "$300",
        cta: "Automate Your Workflows",
        themeColor: "#10b981", // Green
        icon: Zap,
        features: [
            "Lead Enrichment Integrations",
            "Auto-Generated PDF Reports",
            "Two-Way CRM Sync"
        ],
        contactOption: "n8n Automation Development",
        detailedContent: [
            "Manual data entry and repetitive admin tasks are the silent killers of agency profitability. Every hour your team spends copying data between sheets or updating CRM fields is an hour stolen from strategy and sales.",
            "We build robust, custom n8n workflows that handle your operations on autopilot. Unlike Zapier, which can get expensive and restrictive at scale, n8n offers enterprise-grade flexibility. We can engineer complex flows that scrape data, enrich leads via Clearbit/Apollo, qualify them with AI, and sync everything to your HubSpot or Pipedrive instantly.",
            "This isn't just about saving time; it's about accuracy and speed. Your leads get contacted faster, your reports are generated without errors, and your team can finally focus on what they were hired to do: grow the business."
        ]
    },
    "headless-architecture": {
        title: "Headless CMS Architecture",
        subtitle: "The best of both worlds: The easy editing of WordPress combined with the raw speed of Next.js.",
        price: "$1,500",
        cta: "Build My Headless System",
        themeColor: "#3b82f6", // Electric Blue
        icon: Globe,
        features: [

            "Global Edge Caching ",
            "Next.js Frontend (React)",
            "Bank-Grade Security (No Plugins)"
        ],
        contactOption: "Headless CMS Architecture",
        detailedContent: [
            "Standard WordPress sites are slow, insecure, and bloated with plugins. When you rely on a traditional monolithic setup, you're constantly fighting against database queries and server load, which kills your Core Web Vitals and SEO.",
            "We decouple your content from your code. You get a Ferrari engine (Next.js) with a comfortable dashboard (WordPress). This 'Headless' architecture allows your marketing team to keep using the CMS they love, while your users experience a site that loads instantly, anywhere in the world.",
            "This isn't just a website; it's a software-grade platform. By hosting the frontend on the Edge (Vercel) and locking down the backend, we virtually eliminate security vulnerabilities and downtime. It's the exact same architecture used by Fortune 500 companies, scaled for your business."
        ]
    },
    "growth-consulting": {
        title: "Clarity in a World of Noise.",
        subtitle: "We analyze bottlenecks and design a technical roadmap to scale.",
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
            "We partner with you to dissect your current operations, from your tech stack to your team's SOPs. We identify the 'revenue leaks'—where money is being lost due to inefficiency, missed follow-ups, or poor data visibility. Then, we design a custom technical roadmap to solve these issues.",
            "Whether it's choosing the right CRM, automating your onboarding process, or simply simplifying your toolset to save costs, our consulting gives you the clarity and confidence to scale sustainably without breaking your operations."
        ]
    },
    "technical-seo": {
        title: "Find the Invisible Anchors Dragging You Down.",
        subtitle: "Forensic analysis of your site's code and indexability.",
        price: "$350",
        cta: "Find My Ranking Errors",
        themeColor: "#f97316", // Orange
        icon: Search,
        features: [
            "50-Point Health Check",
            "JS Rendering Analysis",
            "Prioritized Action Plan"
        ],
        contactOption: "Technical SEO Audit",
        detailedContent: [
            "You can have the best content in the world, but if Google can't read or index your site properly, you simply won't rank. Modern websites, especially those using heavy JavaScript, often suffer from 'invisible' technical errors that traditional SEOs miss.",
            "We perform a forensic audit of your website's code, structure, and indexability. We look at Crawl Budget, JavaScript rendering, Canonical tags, Hreflang implementation, and internal linking structures. We don't just dump a generic tool report on you; we manually verify every issue.",
            "The result is a prioritized action plan. We tell you exactly what's broken, why it matters, and how to fix it (or we fix it for you). This creates a solid foundation for your content marketing efforts to actually succeed."
        ]
    },
    "ugc-video-ads": {
        title: "Stop Selling. Start Entertaining.",
        subtitle: "High-converting short-form video content for TikTok & Reels.",
        price: "$150",
        cta: "Order Viral UGC Ads",
        themeColor: "#ef4444", // Red
        icon: Video,
        features: [
            "Scriptwriting & Hooks",
            "Native Mobile Editing",
            "Direct Response Angles"
        ],
        contactOption: "UGC Video Ads",
        detailedContent: [
            "The era of polished, corporate video ads is dead. On platforms like TikTok, Instagram Reels, and YouTube Shorts, people ignore ads that look like ads. To convert, you need content that feels authentic, relatable, and native to the platform.",
            "We specialize in Direct Response UGC (User Generated Content). We handle the entire process: iterating on high-CTR hooks, writing scripts that hit customer pain points, and editing with the fast-paced, native style that keeps retention high.",
            "These aren't just 'brand awareness' videos; they are designed to stop the scroll and drive clicks. Whether you need assets for paid Facebook/TikTok ads or organic growth, we deliver creatives that actually move the needle."
        ]
    },
    "custom-prompts": {
        title: "Turn Chaos into Consistent Output.",
        subtitle: "Engineer complex prompt chains for reliable automation.",
        price: "$100",
        cta: "Supercharge My AI Prompts",
        themeColor: "#818cf8", // Indigo
        icon: MessageSquare,
        features: [
            "System Prompt Architecture",
            "Few-Shot Training Setup",
            "JSON Output Formatting"
        ],
        contactOption: "Custom AI Prompts",
        detailedContent: [
            "AI is only as powerful as the instructions you give it. Most businesses are using generic, 'one-shot' prompts that produce inconsistent, hallucinated, or off-brand results. To build reliable business automations, you need prompt engineering.",
            "We design complex prompt chains and system architectures for LLMs (ChatGPT, Claude, Gemini). We use techniques like Few-Shot Prompting, Chain-of-Thought reasoning, and strict output formatting (e.g., returning valid JSON) to ensure reliability.",
            "This allows you to automate complex cognitive tasks—like analyzing customer sentiment, extracting data from unstructured emails, or generating high-quality blog drafts—with a level of consistency that you can actually trust in a production workflow."
        ]
    }
};
