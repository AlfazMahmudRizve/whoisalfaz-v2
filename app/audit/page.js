
import AuditTool from '../../components/AuditTool';
import AuditContentFooter from '../../components/footers/AuditContentFooter';

export const metadata = {
    title: "Free Website Audit Tool – Check SEO, Speed & Security Score | whoisalfaz",
    description: "Run a free website audit in 30 seconds. Instantly check your PageSpeed score, SEO health, SSL certificate, security headers, and sitemap. No signup required.",
    alternates: {
        canonical: '/audit/',
    },
    openGraph: {
        title: "Free Website Audit Tool – Check SEO, Speed & Security Score",
        description: "Run a free website audit in 30 seconds. Instantly check your PageSpeed score, SEO health, SSL certificate, security headers, and sitemap. No signup required.",
        url: 'https://whoisalfaz.me/audit/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Free Website Audit Tool – Check SEO, Speed & Security Score",
        description: "Run a free website audit in 30 seconds. Check PageSpeed, SSL, security headers, and more. No signup required.",
    }
};

const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "whoisalfaz Free Website Audit Tool",
    "url": "https://whoisalfaz.me/audit/",
    "image": "https://whoisalfaz.me/icon.png",
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
};

export default function AuditPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* WEB APP SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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

                {/* SEO CONTENT FOOTER */}
                <AuditContentFooter />

            </div>
        </main>
    );
}
