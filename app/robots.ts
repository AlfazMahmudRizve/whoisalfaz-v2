import { MetadataRoute } from 'next'

const privateDisallows = [
    '/private/',
    '/go/',
    '/api/',
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Default rule for all web search engine crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 1. OPENAI (ChatGPT Live Browsing, SearchGPT, GPTBot)
            // =========================================================================
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 2. ANTHROPIC (Claude Search, Live Browsing & Citation Assistants)
            // =========================================================================
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Claude-SearchBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Claude-User',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 3. PERPLEXITY AI (Real-Time Search & Pro Citations)
            // =========================================================================
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Perplexity-User',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 4. GOOGLE (Gemini & AI Overviews)
            // =========================================================================
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Google-Agent',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 5. APPLE (Apple Intelligence & Siri Web Search)
            // =========================================================================
            {
                userAgent: 'Applebot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Applebot-Extended',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 6. AMAZON (Amazon Q Enterprise & Rufus Assistant)
            // =========================================================================
            {
                userAgent: 'Amazonbot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Amzn-SearchBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Amzn-User',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 7. DEVELOPER & SPECIALIZED AI SEARCH ENGINES
            // =========================================================================
            {
                userAgent: 'GitHubCopilotChat',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'DeepseekBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'xAI-Bot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'DuckAssistBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'MistralAI-User',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'YouBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'FacebookBot',
                allow: '/',
                disallow: privateDisallows,
            },
            {
                userAgent: 'Meta-ExternalAgent',
                allow: '/',
                disallow: privateDisallows,
            },

            // =========================================================================
            // 8. BLOCKED PARASITIC / NON-CITATION BULK DATA HARVESTERS
            // =========================================================================
            {
                userAgent: 'Bytespider',
                disallow: ['/'],
            },
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            {
                userAgent: 'Diffbot',
                disallow: ['/'],
            },
            {
                userAgent: 'Scrapy',
                disallow: ['/'],
            },
        ],
        sitemap: 'https://whoisalfaz.me/sitemap.xml',
        host: 'https://whoisalfaz.me',
    }
}
