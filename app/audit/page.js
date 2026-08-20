
import AuditTool from '../../components/AuditTool';
import AuditBadgeSection from '../../components/AuditBadgeSection';
import AuditContentFooter from '../../components/footers/AuditContentFooter';

export const metadata = {
    title: "Free Website Audit Tool – Check SEO, Speed & Security Score | whoisalfaz",
    description: "Run a free website audit in 30 seconds. Instantly check your PageSpeed score, SEO health, SSL certificate, security headers, and sitemap. No signup required.",
    alternates: {
        canonical: 'https://whoisalfaz.me/audit',
    },
    openGraph: {
        title: "Free Website Audit Tool – Check SEO, Speed & Security Score",
        description: "Run a free website audit in 30 seconds. Instantly check your PageSpeed score, SEO health, SSL certificate, security headers, and sitemap. No signup required.",
        url: 'https://whoisalfaz.me/audit',
        type: 'website',
        siteName: 'whoisalfaz',
        images: [
            {
                url: 'https://whoisalfaz.me/featured-image.png',
                width: 1200,
                height: 630,
                alt: 'Free Website Audit Tool – whoisalfaz',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Free Website Audit Tool – Check SEO, Speed & Security Score",
        description: "Run a free website audit in 30 seconds. Check PageSpeed, SSL, security headers, and more. No signup required.",
        images: ['https://whoisalfaz.me/featured-image.png'],
    }
};

const auditJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "name": "whoisalfaz Free Website Audit Tool",
            "url": "https://whoisalfaz.me/audit/",
            "image": "https://whoisalfaz.me/featured-image.png",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All",
            "browserRequirements": "Requires HTML5-compatible browser",
            "offers": {
                "@type": "Offer",
                "price": "0.00",
                "priceCurrency": "USD"
            },
            "featureList": [
                "Google PageSpeed Insights core vitality analysis",
                "SSL handshake security certificate check",
                "Technical SEO meta tags & Open Graph verification",
                "Crawlability robots.txt & sitemap.xml validation",
                "HTTP security header audits",
                "DNS latency & connectivity diagnostics"
            ]
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://whoisalfaz.me/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Free Website Audit Tool",
                    "item": "https://whoisalfaz.me/audit/"
                }
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Is this website audit tool free?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, completely free. You can run unlimited audits without creating an account or entering any payment information."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How accurate is this website audit?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We use the official Google PageSpeed Insights API for performance data and connect directly to your server for SSL, DNS, and security header checks."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What is a good website audit score?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A score of 80 or above is considered good. Scores of 90+ are excellent. Anything below 50 indicates critical issues that are likely hurting your search rankings."
                    }
                },
                {
                    "@type": "Question",
                    "name": "How often should I audit my website?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "We recommend running an audit after every major deployment, design change, or at least once a month."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What should I fix first if my score is low?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Start with critical security issues (missing SSL, no security headers), then fix SEO fundamentals (title tags, meta descriptions, sitemap), and finally optimize performance."
                    }
                }
            ]
        }
    ]
};

export default function AuditPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* JSON-LD SCHEMAS */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(auditJsonLd) }}
            />

            {/* BACKGROUND */}
            <div className="fixed inset-0 bg-slate-50 dark:bg-[#0a0a0a] -z-20 transition-colors duration-300" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-slate-50 to-slate-50 dark:from-blue-900/10 dark:via-[#0a0a0a] dark:to-[#0a0a0a] -z-10 transition-colors duration-300" />

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight transition-colors duration-300">
                        Free Website <span className="text-teal-600 dark:text-blue-500">Audit Tool</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed transition-colors duration-300">
                        Instantly check your website&apos;s performance score, SEO health, SSL status, and security headers. Results in 30 seconds. No account needed.
                    </p>
                    {/* Trust Signals */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            2,400+ audits completed
                        </span>
                        <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Powered by Google PageSpeed API
                        </span>
                        <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            100% Free · No Signup
                        </span>
                    </div>
                </div>

                {/* AUDIT TOOL SECTION */}
                <section className="mb-16">
                    <AuditTool />
                </section>

                {/* EMBEDDABLE AUDIT BADGE SECTION */}
                <AuditBadgeSection />

                {/* SEO CONTENT FOOTER */}
                <AuditContentFooter />

            </div>
        </main>
    );
}
