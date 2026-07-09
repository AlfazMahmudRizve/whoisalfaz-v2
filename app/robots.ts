import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // Default rule for all crawlers
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/private/',
                    '/go/',
                    '/_next/static/',
                    '/wp-admin/',
                    '/rest/',
                    '*/feed/',
                    '*feed*',
                ],
            },
            // AI crawlers — allow beneficial indexers, disallow scrapers
            // OpenAI training crawler — disallow (scraper)
            {
                userAgent: 'GPTBot',
                disallow: ['/'],
            },
            // OpenAI browsing crawler — disallow (scraper)
            {
                userAgent: 'ChatGPT-User',
                disallow: ['/'],
            },
            // Anthropic Claude — allow (beneficial AI indexer)
            {
                userAgent: 'ClaudeBot',
                allow: ['/'],
            },
            // Perplexity AI — allow (beneficial AI search engine)
            {
                userAgent: 'PerplexityBot',
                allow: ['/'],
            },
            // Google AI (Bard/Gemini) — allow (Google ecosystem)
            {
                userAgent: 'Google-Extended',
                allow: ['/'],
            },
            // Apple AI (Siri/Apple Intelligence) — allow (beneficial)
            {
                userAgent: 'Applebot-Extended',
                allow: ['/'],
            },
            // ByteDance/TikTok — disallow (scraper)
            {
                userAgent: 'Bytespider',
                disallow: ['/'],
            },
            // Common Crawl — disallow (bulk scraper, low signal)
            {
                userAgent: 'CCBot',
                disallow: ['/'],
            },
            // Amazon Alexa/product research — disallow (scraper)
            {
                userAgent: 'Amazonbot',
                disallow: ['/'],
            },
            // Meta/Facebook — disallow (scraper)
            {
                userAgent: 'FacebookBot',
                disallow: ['/'],
            },
            // Diffbot — disallow (commercial scraper)
            {
                userAgent: 'Diffbot',
                disallow: ['/'],
            },
        ],
        sitemap: 'https://whoisalfaz.me/sitemap.xml',
    }
}
