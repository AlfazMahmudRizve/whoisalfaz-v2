import { MetadataRoute } from 'next'

const privateDisallows = [
    '/private/',
    '/go/',
    '/wp-admin/',
    '/rest/',
    '*/feed/',
    '*feed*',
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Default rule for all search engine crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: privateDisallows,
            },

            // Explicitly allowlisted AI Search, Citation & Real-time Discovery crawlers
            // OpenAI SearchGPT indexer
            {
                userAgent: 'OAI-SearchBot',
                allow: '/',
                disallow: privateDisallows,
            },
            // OpenAI ChatGPT live search & browsing
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: privateDisallows,
            },
            // Perplexity AI search crawler
            {
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: privateDisallows,
            },
            // Anthropic Claude web search & citation crawler
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: privateDisallows,
            },
            // Google Gemini / AI Overviews discovery crawler
            {
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: privateDisallows,
            },
            // Apple Intelligence & Siri search crawler
            {
                userAgent: 'Applebot-Extended',
                allow: '/',
                disallow: privateDisallows,
            },

            // Blocked AI Model Training-Only & Bulk Scrapers
            // ByteDance / TikTok crawler
            {
                userAgent: 'Bytespider',
                disallow: ['/'],
            },
            // Common Crawl bulk data scraper
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            // Diffbot commercial scraper
            {
                userAgent: 'Diffbot',
                disallow: ['/'],
            },
            // OpenAI model training scraper (blocks scraping for training while allowing OAI-SearchBot)
            {
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            // Anthropic model training crawler
            {
                userAgent: 'anthropic-ai',
                disallow: ['/'],
            },
            {
                userAgent: 'Claude-Web',
                disallow: ['/'],
            },
            // Amazon Alexa / automated scraper
            {
                userAgent: 'Amazonbot',
                disallow: ['/'],
            },
            // Meta / Facebook crawler
            {
                userAgent: 'FacebookBot',
                disallow: ['/'],
            },
        ],
        sitemap: 'https://whoisalfaz.me/sitemap.xml',
        host: 'https://whoisalfaz.me',
    }
}

