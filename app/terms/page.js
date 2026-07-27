import Link from 'next/link';
import { ScrollText, Mail, FileText, Scale, AlertTriangle, ShieldCheck, Clock, CreditCard, Lock } from 'lucide-react';

export const metadata = {
    title: "Terms of Service & Consulting SLA | Alfaz Mahmud Rizve",
    description: "Legal Terms of Service and RevOps consulting Service Level Agreement (SLA) for whoisalfaz.me, covering intellectual property, SLAs, payment terms, and liability limits.",
    alternates: {
        canonical: '/terms/',
    },
    openGraph: {
        title: "Terms of Service & Consulting SLA | Alfaz Mahmud Rizve",
        description: "Legal Terms of Service and RevOps consulting Service Level Agreement (SLA) for whoisalfaz.me, covering intellectual property, SLAs, payment terms, and liability limits.",
        url: 'https://whoisalfaz.me/terms/',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Terms of Service & Consulting SLA | Alfaz Mahmud Rizve",
        description: "Legal Terms of Service and RevOps consulting Service Level Agreement (SLA) for whoisalfaz.me, covering intellectual property, SLAs, payment terms, and liability limits.",
    }
};

export default function TermsPage() {
    const TOC = [
        { id: "services", label: "1. Services & RevOps Scope" },
        { id: "slas", label: "2. RevOps Consulting SLAs" },
        { id: "payment", label: "3. Payment Terms & Billing" },
        { id: "intellectual", label: "4. Intellectual Property" },
        { id: "representations", label: "5. User Representations" },
        { id: "prohibited", label: "6. Prohibited Activities" },
        { id: "disclaimer", label: "7. Disclaimer of Warranties" },
        { id: "liability", label: "8. Limitation of Liability" },
        { id: "indemnification", label: "9. Indemnification" },
        { id: "disputes", label: "10. Governing Law & Disputes" },
        { id: "termination", label: "11. Term & Termination" },
        { id: "contact", label: "12. Contact Legal" },
    ];

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] selection:bg-purple-500/30 selection:text-white">
            {/* BACKGROUND ELEMENTS */}
            <div className="fixed inset-0 bg-[#0a0a0a] -z-20" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0a0a0a] to-[#0a0a0a] -z-10" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12">

                {/* LEFT: SIDEBAR NAV (Sticky) */}
                <aside className="hidden lg:block h-fit sticky top-32 space-y-8">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <ScrollText size={14} /> Table of Contents
                        </h4>
                        <nav className="space-y-1">
                            {TOC.map((item) => (
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
                        <h4 className="text-white font-bold mb-2">Legal Inquiries?</h4>
                        <p className="text-slate-400 text-xs mb-4">
                            For specific questions regarding consulting SLAs, retainer terms, or custom agreements, contact us directly.
                        </p>
                        <a href="mailto:contact@whoisalfaz.me" className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:underline">
                            <Mail size={16} /> Contact Legal
                        </a>
                    </div>
                </aside>

                {/* RIGHT: MAIN CONTENT */}
                <article className="prose prose-invert max-w-none 
                    prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                    prose-p:text-slate-400 prose-p:leading-relaxed
                    prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:text-blue-300 hover:prose-a:underline
                    prose-ul:marker:text-slate-600 prose-li:text-slate-400
                    prose-hr:border-white/10">

                    {/* Header */}
                    <div className="mb-16 border-b border-white/10 pb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                            <Scale size={12} /> Terms of Service &amp; SLA
                        </div>
                        <h1 className="text-5xl font-black text-white mb-6">Terms of Service</h1>
                        <p className="text-lg text-slate-400 max-w-3xl">
                            Comprehensive Master Services Agreement governing website usage, software development, RevOps engineering, custom n8n automation builds, and consulting SLAs.
                        </p>
                        <p className="text-sm text-slate-500 mt-4 font-mono">
                            Effective Date: January 1, 2026 | Last updated: July 28, 2026
                        </p>
                    </div>

                    {/* Agreement Blurb */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12">
                        <h3 className="text-white mt-0 mb-4 uppercase tracking-wider text-sm font-black">Agreement to Terms</h3>
                        <p className="mt-0">
                            These Legal Terms constitute a legally binding agreement between you, whether personally or on behalf of an entity (&quot;Client,&quot; &quot;User,&quot; or &quot;you&quot;), and <strong>whoisalfaz.me</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by Alfaz Mahmud Rizve in Chittagong, Bangladesh.
                        </p>
                        <p>
                            These terms apply to all access to and use of <Link href="https://whoisalfaz.me">https://whoisalfaz.me</Link> (the &quot;Site&quot;), as well as all RevOps consulting, custom full-stack web applications, n8n workflow automations, technical SEO audits, and managed infrastructure services (collectively, the &quot;Services&quot;).
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex gap-4 items-start not-prose mt-4">
                            <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                            <p className="text-red-200 text-sm mb-0">IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND MUST DISCONTINUE USE IMMEDIATELY.</p>
                        </div>
                    </div>

                    <h2 id="services" className="scroll-mt-32">1. OUR SERVICES &amp; REVOPS SCOPE</h2>
                    <p>
                        whoisalfaz.me provides high-ticket revenue operations engineering, technical architecture, and custom automation development for SaaS founders and digital agencies. Our offerings include:
                    </p>
                    <ul>
                        <li><Link href="/services/growth-consulting/">Strategy &amp; Growth Consulting</Link>: Tech stack audits, SOP development, and revenue leak analyses billed hourly ($200/hr) or via fixed-scope retainer.</li>
                        <li><Link href="/services/n8n-automation/">Custom Workflow Automation</Link>: Engineering, deployment, and optimization of autonomous n8n workflows, CRM data syncs, and AI lead qualification agents.</li>
                        <li><Link href="/services/headless-architecture/">Headless CMS Infrastructure</Link>: Next.js frontend development decoupled from traditional CMS backends for sub-second page performance.</li>
                        <li><Link href="/services/technical-seo/">Technical SEO Audits</Link>: Forensic auditing of JavaScript rendering, crawl budget, structured data, and indexability errors.</li>
                    </ul>
                    <p>
                        Specific scopes of work, deliverables, deadlines, and project milestones are defined in individual Statement of Work (&quot;SOW&quot;) documents or agreed project proposals executed between the Client and Company.
                    </p>

                    <h2 id="slas" className="scroll-mt-32">2. REVOPS CONSULTING SERVICE LEVEL AGREEMENTS (SLAS)</h2>
                    <p>
                        To ensure enterprise reliability, all managed workflow automations, retainer services, and technical consulting engagements operate under strict Service Level Agreements:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-3 text-emerald-400 font-bold">
                                <ShieldCheck size={20} /> Uptime Commitment
                            </div>
                            <p className="text-slate-300 text-sm mb-0">
                                <strong>99.5% Monthly Target Uptime</strong> for self-hosted or managed n8n workflow engines deployed under our active maintenance packages. Excludes planned maintenance windows and third-party API provider outages (e.g., OpenAI, Apollo, Brevo).
                            </p>
                        </div>
                        <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-3 text-blue-400 font-bold">
                                <Clock size={20} /> Support Response Timelines
                            </div>
                            <p className="text-slate-300 text-sm mb-0">
                                <strong>Standard Tickets:</strong> 24 business hours.<br />
                                <strong>Priority Revenue Critical Outages:</strong> Initial triage within 4 business hours for active monthly retainer clients.
                            </p>
                        </div>
                    </div>

                    <h3>2.1 Scope Boundaries &amp; Change Requests</h3>
                    <p>
                        Any modifications, feature additions, or architectural changes requested outside the agreed SOW will be documented as a formal Change Request. Change Requests will be quoted at our standard consulting rate of $200/hour or as an addendum fee before work commences.
                    </p>

                    <h2 id="payment" className="scroll-mt-32">3. PAYMENT TERMS, HOURLY RATES &amp; BILLING</h2>
                    <p>
                        Engagement pricing and payment terms are structured as follows:
                    </p>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl not-prose my-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <CreditCard className="text-purple-400 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="text-white font-bold text-base mb-1">Hourly &amp; Project Rates</h4>
                                <p className="text-slate-400 text-sm mb-0">
                                    Ad-hoc strategy sessions and un-scoped consulting are billed at <strong>$200 USD per hour</strong>. Fixed-scope projects (e.g., n8n workflow builds starting at $750, Headless CMS builds at $1,500) require an upfront deposit.
                                </p>
                            </div>
                        </div>
                        <div className="border-t border-white/10 pt-4 flex items-start gap-4">
                            <Lock className="text-blue-400 shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="text-white font-bold text-base mb-1">Deposit &amp; Invoicing Terms</h4>
                                <p className="text-slate-400 text-sm mb-0">
                                    A <strong>50% non-refundable deposit</strong> is required prior to project kickoff. Final payment (50%) is due upon milestone completion or workflow deployment. Invoices are issued with NET 15 payment terms via Stripe or bank transfer.
                                </p>
                            </div>
                        </div>
                    </div>

                    <h3>3.1 Overdue Invoices &amp; Late Fees</h3>
                    <p>
                        Invoices unpaid after 30 calendar days will accrue late interest at the rate of 1.5% per month (or the maximum allowed by law). We reserve the right to pause active consulting, disable hosting access, or suspend automated workflows for accounts with past-due balances exceeding 15 calendar days.
                    </p>

                    <h3>3.2 Refund Policy</h3>
                    <p>
                        Due to the custom engineering nature of our deliverables, initial deposit payments are non-refundable once discovery work has commenced. Milestone-based contracts allow for refunds only if the Company is unable to deliver the agreed-upon technical scope due to technical infeasibility.
                    </p>

                    <h2 id="intellectual" className="scroll-mt-32">4. INTELLECTUAL PROPERTY &amp; WORK PRODUCT OWNERSHIP</h2>
                    <h3>4.1 Client Data Confidentiality</h3>
                    <p>
                        Clients retain 100% full, exclusive ownership of all proprietary data, CRM leads, customer records, database schemas, and API tokens provided to us during an engagement.
                    </p>

                    <h3>4.2 Custom Deliverables &amp; Code Ownership</h3>
                    <p>
                        Upon payment in full of all outstanding project fees, we grant the Client a perpetual, worldwide, non-exclusive, non-transferable license to use, execute, modify, and deploy all custom n8n JSON workflow scripts, Next.js frontend code, and custom API bridges created specifically for the Client.
                    </p>

                    <h3>4.3 Pre-existing Frameworks &amp; Open-Source License</h3>
                    <p>
                        We retain ownership of all pre-existing code libraries, reusable utility functions, boilerplate schemas, and generic automation patterns (&quot;Company Pre-Existing IP&quot;). Third-party open-source libraries (e.g., Next.js under MIT license, n8n under Sustainable Use License) remain subject to their respective original software licenses.
                    </p>

                    <h2 id="representations" className="scroll-mt-32">5. USER REPRESENTATIONS &amp; RESPONSIBILITIES</h2>
                    <p>By accessing the Services or engaging our consulting, you represent and warrant that:</p>
                    <ol>
                        <li>All registration and contact information you submit is true, accurate, current, and complete;</li>
                        <li>You have full legal authority to enter into binding agreements on behalf of your entity;</li>
                        <li>You will provide necessary API access tokens, server credentials, and timely feedback required to fulfill project milestones;</li>
                        <li>Your use of our automated workflows complies with third-party platform policies (e.g., Meta API rules, LinkedIn terms, email anti-spam laws including CAN-SPAM and GDPR).</li>
                    </ol>

                    <h2 id="prohibited" className="scroll-mt-32">6. PROHIBITED ACTIVITIES</h2>
                    <p>You may not access or use the Services for any unlawful purpose. Prohibited activities include:</p>
                    <ul>
                        <li>Using automated workflows to distribute unsolicited bulk commercial email (spam) in violation of applicable laws;</li>
                        <li>Systematically scraping or harvesting data from the Site without explicit written permission;</li>
                        <li>Attempting to bypass security measures, reverse-engineer proprietary code, or interfere with network infrastructure;</li>
                        <li>Impersonating another user or submitting false reports of abuse or system errors.</li>
                    </ul>

                    <h2 id="disclaimer" className="scroll-mt-32">7. DISCLAIMER OF WARRANTIES</h2>
                    <div className="p-6 border border-yellow-500/20 bg-yellow-900/10 rounded-xl not-prose">
                        <p className="font-bold text-yellow-500 mb-2">LIMITED WARRANTY DISCLAIMER</p>
                        <p className="text-yellow-100/80 mb-0 text-sm leading-relaxed">
                            THE SERVICES, SOFTWARE DELIVERABLES, AND AUTOMATION WORKFLOWS ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THIRD-PARTY APIS (OPENAI, APOLLO, BREVO, STRIPE) WILL REMAIN UNINTERRUPTED OR UNCHANGED.
                        </p>
                    </div>

                    <h2 id="liability" className="scroll-mt-32">8. LIMITATION OF LIABILITY</h2>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-xl not-prose my-6">
                        <h4 className="text-white font-bold text-base mb-2">AGGREGATE FINANCIAL LIABILITY CAP</h4>
                        <p className="text-slate-300 text-sm mb-0 leading-relaxed">
                            IN NO EVENT SHALL WHOISALFAZ.ME, ALFAZ MAHMUD RIZVE, OR ITS SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES (INCLUDING LOSS OF PROFITS, LOST REVENUE, DATA CORRUPTION, OR BUSINESS INTERRUPTION). OUR TOTAL CUMULATIVE LIABILITY ARISING OUT OF ANY CLAIM RELATED TO THE SERVICES SHALL BE STRICTLY LIMITED TO THE TOTAL AMOUNT OF FEES PAID BY CLIENT TO COMPANY IN THE <strong>THIRTY (30) CALENDAR DAYS</strong> IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO LIABILITY.
                        </p>
                    </div>

                    <h2 id="indemnification" className="scroll-mt-32">9. INDEMNIFICATION</h2>
                    <p>
                        You agree to defend, indemnify, and hold harmless whoisalfaz.me and Alfaz Mahmud Rizve from and against any claims, liabilities, damages, judgments, or expenses (including reasonable attorney fees) arising from your breach of these Legal Terms, misuse of automated workflows, or violation of third-party API terms.
                    </p>

                    <h2 id="disputes" className="scroll-mt-32">10. GOVERNING LAW &amp; DISPUTE RESOLUTION</h2>
                    <p>
                        These Legal Terms shall be governed by and construed in accordance with the laws of Bangladesh, without giving effect to conflict of law principles. Any legal dispute or claim arising from these terms shall be resolved through final and binding arbitration in Chittagong, Bangladesh, conducted in the English language.
                    </p>

                    <h2 id="termination" className="scroll-mt-32">11. TERM AND TERMINATION</h2>
                    <p>
                        These Legal Terms remain in full force while you use the Site or active consulting services. Either party may terminate an ongoing retainer agreement upon 30 days written notice. Upon termination, Client shall immediately pay all outstanding balances for completed work up to the termination date.
                    </p>

                    <h2 id="contact" className="scroll-mt-32">12. CONTACT LEGAL &amp; CONSULTING INQUIRIES</h2>
                    <p>For questions regarding these Terms of Service, RevOps SLAs, or legal inquiries, please contact:</p>

                    <div className="flex flex-col md:flex-row gap-6 not-prose mt-8">
                        <a href="mailto:contact@whoisalfaz.me" className="flex-1 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-600/20 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="text-blue-400" />
                                <span className="text-white font-bold">Email Legal Team</span>
                            </div>
                            <span className="text-blue-200 group-hover:underline">contact@whoisalfaz.me</span>
                        </a>

                        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="text-slate-400" />
                                <span className="text-white font-bold">Official Headquarters</span>
                            </div>
                            <address className="text-slate-400 not-italic text-sm space-y-1">
                                <p><strong>whoisalfaz.me</strong></p>
                                <p>Alkaran, Chittagong, Bangladesh, 4000</p>
                                <p>Phone: +8801991210347</p>
                            </address>
                        </div>
                    </div>

                </article>
            </div>
        </main>
    );
}
