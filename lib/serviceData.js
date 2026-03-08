import { Zap, Globe, BarChart3, Search, Video, MessageSquare, Code2 } from 'lucide-react';

export const serviceData = {
    "n8n-automation": {
        title: "Stop Renting Your Time. Start Building Assets.",
        subtitle: "Replace your manual data entry with autonomous agents. We build self-healing workflows that instantly qualify leads and sync your CRM, saving your team 20+ hours a week.",
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
            "We build robust, custom AI-powered workflows that handle your operations on autopilot. Unlike Zapier, which can get expensive and restrictive at scale, we utilize n8n to offer enterprise-grade flexibility. We can engineer complex flows that scrape data, enrich leads via Apollo, qualify them with AI, and sync everything to your CRM instantly.",
            "This isn't just about saving time; it's about accuracy and speed. Your leads get contacted faster, your reports are generated without errors, and your team can finally focus on what they were hired to do: grow the business."
        ]
    },
    "headless-architecture": {
        title: "Headless CMS Architecture",
        subtitle: "Enterprise-grade performance. We decouple your frontend to achieve sub-second load times and perfect Core Web Vitals, without sacrificing your marketing team's ability to edit content.",
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
            "This isn't just a website; it's a software-grade platform. By hosting the frontend on the Edge and locking down the backend, we virtually eliminate security vulnerabilities and downtime. It's the exact same architecture used by Fortune 500 companies, scaled for your business."
        ]
    },
    "growth-consulting": {
        title: "Clarity in a World of Noise.",
        subtitle: "We analyze operational bottlenecks and design a clear, actionable technical roadmap to scale your agency. Stop the revenue leaks and optimize your go-to-market systems today.",
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
        subtitle: "Stop guessing why your traffic dropped. Get a deep forensic technical SEO analysis of your site's code, crawlability, and JavaScript rendering performance to fix invisible ranking errors.",
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
    "custom-full-stack": {
        title: "Custom Full-Stack Applications",
        subtitle: "When off-the-shelf software falls short, I architect and build the exact custom full-stack web application tailored precisely to streamline your workflow and scale your agency operations.",
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
            "As a Full-Stack Architect, I design and build custom web applications tailored exactly to your workflow. Whether it's a client portal that auto-updates from your CRM, a bespoke project management dashboard, or a complex data visualization tool, I build it from the ground up using Next.js and robust backend logic.",
            "Visual aesthetics meet engineering rigor. I don't just build 'functional' apps; I build beautiful, intuitive interfaces that your team and clients will actually enjoy using. Secure, scalable, and owned 100% by you."
        ]
    }
};
