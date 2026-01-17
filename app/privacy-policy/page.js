
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, Mail, ChevronRight } from 'lucide-react';

export const metadata = {
    title: "Privacy Policy | Alfaz Mahmud Rizve",
    description: "Privacy Notice and Data Protection Policy for whoisalfaz.me",
};

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6 bg-[#0a0a0a] selection:bg-blue-500/30 selection:text-white">
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
                                { id: "summary", label: "Summary of Key Points" },
                                { id: "info-collect", label: "1. What We Collect" },
                                { id: "how-process", label: "2. How We Process" },
                                { id: "legal-bases", label: "3. Legal Bases" },
                                { id: "share-info", label: "4. Sharing Information" },
                                { id: "cookies", label: "5. Cookies & Tracking" },
                                { id: "security", label: "Data Security" },
                                { id: "rights", label: "Your Rights" },
                                { id: "contact", label: "Contact Us" },
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
                        <h4 className="text-white font-bold mb-2">Have Questions?</h4>
                        <p className="text-slate-400 text-xs mb-4">
                            If anything in this policy is unclear, please don't hesitate to reach out.
                        </p>
                        <a href="mailto:contact@whoisalfaz.me" className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:underline">
                            <Mail size={16} /> Email Privacy Team
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
                            <Shield size={12} /> Legal & Privacy
                        </div>
                        <h1 className="text-5xl font-black text-white mb-6">Privacy Notice</h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            We are committed to protecting your personal information and your right to privacy.
                        </p>
                        <p className="text-sm text-slate-500 mt-4 font-mono">
                            Last updated: December 29, 2025
                        </p>
                    </div>

                    {/* Intro */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12">
                        <p className="mt-0">
                            This Privacy Notice for <strong>Alfaz Mahmud Rizve</strong> (doing business as <strong>whoisalfaz.me</strong>) ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services").
                        </p>
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex items-start gap-3 text-sm text-slate-300">
                                <div className="mt-1 min-w-[20px]"><Eye className="text-blue-500" size={16} /></div>
                                <span>Visit our website at <Link href="https://whoisalfaz.me">https://whoisalfaz.me</Link></span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-slate-300">
                                <div className="mt-1 min-w-[20px]"><FileText className="text-purple-500" size={16} /></div>
                                <span>Engage with our Digital Marketing & Automation Consulting services</span>
                            </div>
                        </div>
                        <p className="mb-0 mt-6 text-sm text-slate-500">
                            Questions? Contact us at <a href="mailto:contact@whoisalfaz.me">contact@whoisalfaz.me</a>.
                        </p>
                    </div>

                    <h2 id="summary" className="flex items-center gap-3 text-2xl scroll-mt-32">
                        <span className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><FileText size={24} /></span>
                        Summary of Key Points
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-16 mt-8">
                        {[
                            { title: "What do we process?", desc: "We process info depending on how you interact with us (e.g. name, email)." },
                            { title: "Sensitive info?", desc: "We do NOT process sensitive personal information like race or religion." },
                            { title: "Third party data?", desc: "We do NOT collect information from third parties." },
                            { title: "How we share?", desc: "We may share info in specific situations (e.g. business transfers)." },
                            { title: "Data Security", desc: "We use organizational and technical processes to protect your data." },
                            { title: "Your Rights", desc: "You may have rights to access, update, or delete your data depending on location." },
                        ].map((card, i) => (
                            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                                <h3 className="text-white font-bold mb-2 text-sm">{card.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <hr className="border-white/10 my-12" />

                    <h2 id="info-collect" className="text-2xl scroll-mt-32">1. What Information Do We Collect?</h2>
                    <h3>Personal Information You Disclose to Us</h3>
                    <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</p>
                    <div className="bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl my-6">
                        <h4 className="text-blue-400 font-bold mt-0 mb-2">Collected Data Includes:</h4>
                        <ul className="mb-0 text-slate-300">
                            <li>Names</li>
                            <li>Email addresses</li>
                        </ul>
                    </div>

                    <h3>Information Automatically Collected</h3>
                    <p>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</p>
                    <ul>
                        <li><strong>Device Data:</strong> IP address, device type, OS, browser type.</li>
                        <li><strong>Location Data:</strong> General location based on IP.</li>
                    </ul>
                    <p className="text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                        <strong>Google API:</strong> Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.
                    </p>

                    <h2 id="how-process" className="text-2xl scroll-mt-32">2. How Do We Process Your Information?</h2>
                    <p>We process your personal information for a variety of reasons, depending on how you interact with our Services:</p>
                    <ul className="grid grid-cols-1 gap-4 not-prose">
                        <li className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="p-2 bg-green-500/20 text-green-400 rounded-lg h-fit"><CheckCircle className="w-5 h-5" /></div>
                            <div>
                                <strong className="text-white block mb-1">Account Management</strong>
                                <span className="text-sm text-slate-400">To facilitate account creation and authentication.</span>
                            </div>
                        </li>
                        <li className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg h-fit"><Shield className="w-5 h-5" /></div>
                            <div>
                                <strong className="text-white block mb-1">Safety & Vitals</strong>
                                <span className="text-sm text-slate-400">To save or protect an individual's vital interest.</span>
                            </div>
                        </li>
                    </ul>

                    <h2 id="legal-bases" className="text-2xl scroll-mt-32">3. Legal Bases for Processing</h2>
                    <p>We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.</p>

                    <div className="space-y-6">
                        <div>
                            <h4 className="flex items-center gap-2 text-white"><span className="w-2 h-2 rounded-full bg-blue-500"></span> EU / UK Users (GDPR)</h4>
                            <p className="text-sm">We rely on <strong>Consent</strong>, <strong>Legal Obligations</strong>, and <strong>Vital Interests</strong>.</p>
                        </div>
                        <div>
                            <h4 className="flex items-center gap-2 text-white"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Canadian Users</h4>
                            <p className="text-sm">We process with <strong>Express</strong> or <strong>Implied Consent</strong>, or where legally permitted without consent (e.g. fraud prevention).</p>
                        </div>
                    </div>

                    <h2 id="share-info" className="text-2xl scroll-mt-32">4. Sharing Your Information</h2>
                    <p>We may share or transfer your information in specific situations:</p>
                    <ul>
                        <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition.</li>
                    </ul>

                    <h2 id="cookies" className="text-2xl scroll-mt-32">5. Cookies & Tracking Technologies</h2>
                    <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services.</p>
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <strong className="text-white block mb-2">Google Analytics</strong>
                        <p className="text-sm mb-4">We may share your information with Google Analytics to track and analyze the use of the Services.</p>
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" className="text-xs px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors inline-block">Opt-out of Google Analytics &rarr;</a>
                    </div>

                    <h2 id="ai-products" className="text-2xl scroll-mt-32">6. AI-Based Products</h2>
                    <p>We offer products powered by AI/ML. All personal information processed using our AI Products is handled in line with our Privacy Notice and our agreement with third parties.</p>

                    <h2 id="retention" className="text-2xl scroll-mt-32">7. Data Retention</h2>
                    <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law.</p>

                    <h2 id="security" className="text-2xl scroll-mt-32">8. Data Security</h2>
                    <p>We have implemented appropriate and reasonable technical and organizational security measures. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.</p>

                    <h2 id="rights" className="text-2xl scroll-mt-32">Your Privacy Rights (Region Specific)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose text-sm">
                        <div className="bg-white/5 p-6 rounded-xl">
                            <h4 className="text-white font-bold mb-2">EEA, UK, Canada</h4>
                            <p className="text-slate-400">Right to access, rectify, erase, restrict processing, and data portability.</p>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl">
                            <h4 className="text-white font-bold mb-2">United States</h4>
                            <p className="text-slate-400">Residents of CA, CO, CT, VA, etc. have rights to access, correct, delete, and portable data.</p>
                        </div>
                    </div>
                    <p className="mt-4">
                        <strong>California "Shine The Light":</strong> Residents can request info about personal data shared for direct marketing once a year.
                    </p>

                    <h2 id="dnt" className="text-2xl scroll-mt-32">Do-Not-Track (DNT)</h2>
                    <p>We do not currently respond to DNT browser signals as no uniform standard exists.</p>

                    <h2 id="contact" className="text-2xl scroll-mt-32">Contact Us</h2>
                    <p>If you have questions about this notice, please contact us:</p>

                    <div className="flex flex-col md:flex-row gap-6 not-prose mt-8">
                        <a href="mailto:contact@whoisalfaz.me" className="flex-1 p-6 bg-blue-600/10 border border-blue-500/20 rounded-xl hover:bg-blue-600/20 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="text-blue-400" />
                                <span className="text-white font-bold">Email Us</span>
                            </div>
                            <span className="text-blue-200 group-hover:underline">contact@whoisalfaz.me</span>
                        </a>

                        <div className="flex-1 p-6 bg-white/5 border border-white/10 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="text-slate-400" />
                                <span className="text-white font-bold">Post</span>
                            </div>
                            <address className="text-slate-400 not-italic text-sm">
                                Alfaz Mahmud Rizve<br />
                                alkaran, Chittagong 4000<br />
                                Bangladesh
                            </address>
                        </div>
                    </div>

                </article>
            </div>
        </main>
    );
}

function CheckCircle({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
