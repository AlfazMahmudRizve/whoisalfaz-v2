
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

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Is this website audit tool free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, completely free. You can run unlimited audits without creating an account or entering any payment information. Optionally provide your email to receive a copy of your results."
            }
        },
        {
            "@type": "Question",
            "name": "How accurate is this website audit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use the official Google PageSpeed Insights API for performance data and connect directly to your server for SSL, DNS, and security header checks. The results reflect real-world conditions, not simulated tests."
            }
        },
        {
            "@type": "Question",
            "name": "What is a good website audit score?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A score of 80 or above is considered good. Scores of 90+ are excellent. Anything below 50 indicates critical issues that are likely hurting your search rankings and user experience."
            }
        },
        {
            "@type": "Question",
            "name": "How often should I audit my website?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recommend running an audit after every major deployment, design change, or at least once a month. SSL certificates, security headers, and performance can change without you noticing."
            }
        },
        {
            "@type": "Question",
            "name": "What should I fix first if my score is low?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Start with critical security issues (missing SSL, no security headers), then fix SEO fundamentals (title tags, meta descriptions, sitemap), and finally optimize performance (image compression, lazy loading, CDN)."
            }
        }
    ]
};

export default function AuditPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-300">
            {/* FAQ SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
