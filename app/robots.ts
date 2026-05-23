import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
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
            }
        ],
        sitemap: 'https://whoisalfaz.me/sitemap.xml',
    }
}
