import Link from 'next/link';
import { Shield, FileText, Mail, Award, Cpu, RefreshCw, CheckCircle, Eye } from 'lucide-react';

export const metadata = {
    title: "Editorial & Fact-Checking Policy | Alfaz Mahmud Rizve",
    description: "Read the Editorial, Review, and AI Disclosure Policy for whoisalfaz.me. Learn our hands-on testing methodologies, expert guidelines, and transparency standards.",
    alternates: {
        canonical: '/editorial-policy/',
    },
    openGraph: {
        title: "Editorial & Fact-Checking Policy | Alfaz Mahmud Rizve",
        description: "Read the Editorial, Review, and AI Disclosure Policy for whoisalfaz.me. Learn our hands-on testing methodologies, expert guidelines, and transparency standards.",
        url: 'https://whoisalfaz.me/editorial-policy/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Editorial & Fact-Checking Policy | Alfaz Mahmud Rizve",
        description: "Read the Editorial, Review, and AI Disclosure Policy for whoisalfaz.me. Learn our hands-on testing methodologies, expert guidelines, and transparency standards.",
    }
};

export default function EditorialPolicy() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Editorial, Review, and AI Disclosure Policy",
        "description": "Editorial standards, fact-checking methodology, and AI usage disclosures for whoisalfaz.me",
        "url": "https://whoisalfaz.me/editorial-policy/",
        "author": {
            "@type": "Person",
            "name": "Alfaz Mahmud Rizve",
            "url": "https://whoisalfaz.me/about/alfaz-mahmud-rizve/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Alfaz Mahmud Rizve",
            "logo": {
                "@type": "ImageObject",
                "url": "https://whoisalfaz.me/profile.jpg"
            }
        },
        "reviewedBy": {
            "@type": "Person",
            "name": "Alfaz Mahmud Rizve"
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] selection:bg-blue-500/30 selection:text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

                {/* LEFT: SIDEBAR NAV (Sticky) */}
                <aside className="hidden lg:block h-fit sticky top-32 space-y-8">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <FileText size={14} /> Table of Contents
                        </h4>
                        <nav className="space-y-1">
                            {[
                                { id: "standards", label: "Editorial Standards" },
                                { id: "methodology", label: "Review Methodology" },
                                { id: "credentials", label: "Expert Credentials" },
                                { id: "ai-disclosure", label: "AI Usage Policy" },
                                { id: "corrections", label: "Corrections & Updates" },
                                { id: "transparency", label: "Trust & Ethics" },
                            ].map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all border-l-2 border-transparent hover:border-blue-500"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                        <h4 className="text-white font-bold mb-2">Editorial Feedback</h4>
                        <p className="text-slate-400 text-xs mb-4">
                            Found an error, outdated code, or want to suggest an improvement?
                        </p>
                        <a href="mailto:contact@whoisalfaz.me" className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:underline">
                            <Mail size={16} /> Contact Editorial Team
                        </a>
                    </div>
                </aside>

                {/* RIGHT: MAIN CONTENT */}
                <article className="prose prose-invert max-w-none 
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-slate-400 prose-p:leading-relaxed
                    prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
                    prose-ul:marker:text-slate-600 prose-li:text-slate-400">

                    {/* Header */}
                    <div className="mb-16 border-b border-white/10 pb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Shield size={12} /> E-E-A-T Compliance
                        </div>
                        <h1 className="text-5xl font-black text-white mb-6">Editorial & AI Policy</h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            We are committed to absolute accuracy, transparency, and hands-on testing in all technical guides, code tutorials, and architectural analyses published on whoisalfaz.me.
                        </p>
                        <p className="text-sm text-slate-500 mt-4 font-mono">
                            Last updated: July 9, 2026
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12">
                        <p className="mt-0">
                            This Editorial, Review, and AI Disclosure Policy guides the creation, verification, and maintenance of all digital content across <strong>whoisalfaz.me</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). Our core mission is to provide verified, reliable, and actionable insights in Revenue Operations (RevOps), API automation, software integration, and full-stack development.
                        </p>
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex items-start gap-3 text-sm text-slate-300">
                                <div className="mt-1 min-w-[20px]"><Eye className="text-blue-500" size={16} /></div>
                                <span>Learn about our hands-on testing methodology.</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-300">
                                <div className="mt-1 min-w-[20px]"><FileText className="text-purple-500" size={16} /></div>
                                <span>Read about our strict AI tools disclosure.</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 1: Editorial Standards */}
                    <h2 id="standards" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><FileText size={24} /></span>
                        Editorial Standards & Core Principles
                    </h2>
                    <p>
                        Every article published on whoisalfaz.me is created under strict editorial oversight. We prioritize:
                    </p>
                    <ul>
                        <li><strong>Accuracy & Quality:</strong> Every technical guide, code block, and workflow architecture diagram is subject to thorough verification.</li>
                        <li><strong>Objectivity:</strong> We write from an independent perspective, emphasizing what actually works in production. We do not accept sponsored content for software products we have not actively tested and integrated ourselves.</li>
                        <li><strong>Topical Authority:</strong> Our coverage is strictly restricted to domains where we possess verified professional expertise—specifically RevOps architecture, API automation, next-gen data pipeline engineering, and modern web frameworks like <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>.</li>
                    </ul>

                    {/* Section 2: Review Methodology */}
                    <h2 id="methodology" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><CheckCircle size={24} /></span>
                        First-Hand Testing & Review Methodology
                    </h2>
                    <p>
                        In our experience, generic tutorials written without real environment testing lead to fragile integrations. We believe in providing value through original research and hands-on validation.
                    </p>
                    <div className="bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl my-6">
                        <h4 className="text-blue-400 font-bold mt-0 mb-2">How We Test and Review:</h4>
                        <ul className="mb-0 text-slate-300">
                            <li><strong>Hands-On Verification:</strong> For every tool integration, API connector, or configuration we review, <strong>we tested</strong> the systems ourselves in a sandboxed staging environment.</li>
                            <li><strong>System Measurement:</strong> In each case study, <strong>we measured</strong> operational latency, API call volumes, failover rates, and system efficiency to provide real performance numbers.</li>
                            <li><strong>Our Testing Environments:</strong> Code snippets and database migrations are executed locally and on cloud-hosted clusters to verify idempotency and robustness before the guide is written.</li>
                            <li><strong>Original Research:</strong> Rather than aggregating existing documentations, we document custom endpoints, edge cases, and unexpected errors encountered in our actual consulting work.</li>
                        </ul>
                    </div>

                    {/* Section 3: Credentials */}
                    <h2 id="credentials" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-teal-500/20 text-teal-400"><Award size={24} /></span>
                        Expert Credentials & Qualifications
                    </h2>
                    <p>
                        Content on this site is written and reviewed by <strong>Alfaz Mahmud Rizve</strong>, a certified automation architect and full-stack engineer with years of experience building production systems.
                    </p>
                    <ul>
                        <li><strong>Specialist Expertise:</strong> Alfaz Mahmud Rizve is a Revenue Operations specialist, focusing on data pipeline engineering, CRMs, and self-hosted n8n infrastructure.</li>
                        <li><strong>Professional Credentials:</strong> Over a decade of cumulative engineering experience. Certification details are continuously verified and updated.</li>
                        <li><strong>Reviewed By Human Experts:</strong> All content is written or reviewed by Alfaz Mahmud Rizve (acting as lead editor and main publisher) to guarantee it holds up to enterprise standards. We do not publish anonymous or unverified articles.</li>
                    </ul>

                    {/* Section 4: AI Disclosure */}
                    <h2 id="ai-disclosure" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-orange-500/20 text-orange-400"><Cpu size={24} /></span>
                        AI Usage & Disclosure Guidelines
                    </h2>
                    <p>
                        We are fully transparent about our use of generative artificial intelligence (AI) and Large Language Models (LLMs) in the content creation process.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8 mt-4">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> How We Use AI
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                AI models assist us in structural outlining, vocabulary suggestions, brainstorming potential edge cases, and producing secondary drafts.
                            </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-white font-bold mb-2 text-sm flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> What AI Cannot Do
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                AI cannot write our code untested. We never publish raw AI-generated content. All technical steps are verified with hands-on environments.
                            </p>
                        </div>
                    </div>
                    <p>
                        To ensure high content quality, every technical article undergoes:
                    </p>
                    <ol>
                        <li><strong>Strict Refactoring:</strong> Any AI-suggested code snippet is checked against modern performance standards and security practices.</li>
                        <li><strong>Human Authorship:</strong> The majority of the final published text is hand-written, edited, and formatted, keeping raw AI output below 10%.</li>
                    </ol>

                    {/* Section 5: Corrections & Updates */}
                    <h2 id="corrections" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-green-500/20 text-green-400"><RefreshCw size={24} /></span>
                        Corrections, Updates & Fact-Checking Policy
                    </h2>
                    <p>
                        Software APIs and packages update constantly. A guide that works today might break tomorrow. We address this using a proactive correction and update system:
                    </p>
                    <ul>
                        <li><strong>Fact-Checked Content:</strong> Our guides are systematically fact-checked against official documentation (such as <a href="https://docs.n8n.io" target="_blank" rel="noopener noreferrer">n8n Documentation</a> and <a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a>) at the time of publishing.</li>
                        <li><strong>Correction Workflow:</strong> If a reader reports a bug, broken endpoint, or outdated syntax, we investigate and deploy corrections within 48 hours.</li>
                        <li><strong>Version Control:</strong> Crucial technical updates are clearly marked with a changelog block indicating what was modified, when, and why.</li>
                    </ul>

                    {/* Section 6: Trust & Ethics */}
                    <h2 id="transparency" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400"><Shield size={24} /></span>
                        Trust, Ethics & Transparency
                    </h2>
                    <p>
                        Our trust score is our most valuable asset. We maintain transparency through clear disclosure of links, credentials, and affiliations:
                    </p>
                    <ul>
                        <li><strong>Affiliate Transparency:</strong> If any link contains an affiliate tag, we explicitly mention it near the link. We only link to tools we use in our actual daily engineering workflows.</li>
                        <li><strong>Corporate Ethics:</strong> No third-party advertiser influences our evaluation. If a tool fails our security and performance benchmarks, we document its limitations honestly.</li>
                    </ul>

                    <hr className="border-white/10 my-12" />

                    <h2 className="text-2xl">Contact and Legal Resources</h2>
                    <p>For inquiries, corrections, or feedback regarding our editorial policies, please contact us or visit our related trust pages:</p>

                    <div className="flex flex-col md:flex-row gap-6 not-prose mt-8">
                        <a href="mailto:contact@whoisalfaz.me" className="flex-1 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-600/20 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="text-blue-400" />
                                <span className="text-white font-bold">Email Editorial Team</span>
                            </div>
                            <span className="text-blue-200 group-hover:underline">contact@whoisalfaz.me</span>
                        </a>

                        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-xl text-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="text-slate-400" />
                                <span className="text-white font-bold">Legal Resources</span>
                            </div>
                            <ul className="space-y-2 pl-0 list-none m-0">
                                <li><Link href="/about/alfaz-mahmud-rizve/" className="text-slate-400 hover:text-white hover:underline">&rarr; About Alfaz Mahmud Rizve</Link></li>
                                <li><Link href="/portfolio/" className="text-slate-400 hover:text-white hover:underline">&rarr; Portfolio</Link></li>
                                <li><Link href="/privacy-policy/" className="text-slate-400 hover:text-white hover:underline">&rarr; Privacy Notice</Link></li>
                                <li><Link href="/terms/" className="text-slate-400 hover:text-white hover:underline">&rarr; Terms of Service</Link></li>
                                <li><Link href="/contact/" className="text-slate-400 hover:text-white hover:underline">&rarr; Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                </article>
            </div>

            {/* Hidden E-E-A-T SEO helpers for raw file crawlers */}
            <div className="hidden sr-only" aria-hidden="true">
                <span className="author" name="author" rel="author">Alfaz Mahmud Rizve</span>
                <span className="byline">RevOps Architect & Full Stack Automation Engineer</span>
                <a href="/editorial-policy/">Editorial & AI Policy</a>
                <a href="/about/alfaz-mahmud-rizve/">About Alfaz Mahmud Rizve</a>
                <a href="/portfolio/">Portfolio</a>
                <a href="/privacy-policy/">Privacy Notice</a>
                <a href="/terms/">Terms of Service</a>
                <a href="/contact/">Contact Us</a>
                <a href="https://schema.org/WebPage" target="_blank" rel="noopener noreferrer">Schema.org WebPage</a>
                <a href="https://developers.google.com/search/docs/appearance/helpful-content-system" target="_blank" rel="noopener noreferrer">Google Helpful Content</a>
            </div>
        </main>
    );
}
