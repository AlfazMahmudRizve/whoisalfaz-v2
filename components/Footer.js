import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0a] pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-1 group mb-4">
                            <span className="font-bold tracking-tight text-lg">
                                <span className="text-teal-700 dark:text-teal-400">whois</span><span className="text-purple-600 dark:text-purple-500">alfaz</span> <span className="text-teal-700 dark:text-teal-400">.me</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed transition-colors duration-300">
                            Alfaz Mahmud Rizve builds autonomous revenue systems and high-performance headless infrastructure for scaling agencies and SaaS businesses. <Link href="/portfolio/" className="text-teal-600 dark:text-teal-400 hover:underline font-bold">About Me →</Link>
                        </p>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 transition-colors duration-300">Solutions</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/services/custom-full-stack/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Custom Full-Stack Applications</Link></li>
                            <li><Link href="/services/headless-architecture/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Headless CMS Infrastructure</Link></li>
                            <li><Link href="/services/n8n-automation/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Custom Workflow Automation</Link></li>
                            <li><Link href="/services/technical-seo/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Technical SEO Audits</Link></li>
                            <li><Link href="/services/growth-consulting/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Strategy & Growth Consulting</Link></li>
                        </ul>
                    </div>

                    {/* Free Tools Column */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 transition-colors duration-300">Free Tools</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/audit/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Website Audit Tool</Link></li>
                            <li><Link href="/labs/roi/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">ROI Calculator</Link></li>
                            <li><Link href="/labs/chat/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">AI Chat Assistant</Link></li>
                            <li><a href="https://careerops.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">CareerOps AI Resume</a></li>
                            <li><a href="https://cashops.whoisalfaz.me/" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">CashOps Dashboard</a></li>
                            <li><Link href="/partners/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Sponsorships</Link></li>
                        </ul>
                    </div>

                    {/* Popular Guides Column */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 transition-colors duration-300">Popular Guides</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/blog/automation-operating-system-for-saas/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">SaaS Automation OS</Link></li>
                            <li><Link href="/blog/n8n-global-error-handling/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Global Error Handling</Link></li>
                            <li><Link href="/blog/automate-personal-branding-with-n8n/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Automate Personal Branding</Link></li>
                            <li><Link href="/blog/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">View All Guides →</Link></li>
                        </ul>
                    </div>

                    {/* Case Studies Column */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 transition-colors duration-300">Case Studies</h3>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/case-studies/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">All Case Studies</Link></li>
                            <li><Link href="/blog/case-study-cashops-financial-dashboard/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">CashOps Dashboard</Link></li>
                            <li><Link href="/blog/case-study-urban-cafe-foodtech-platform/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Urban Cafe OS</Link></li>
                            <li><Link href="/blog/case-study-veloryc-premium-ecommerce/" className="hover:text-teal-600 dark:hover:text-blue-400 transition-colors">Veloryc Commerce</Link></li>
                        </ul>
                    </div>

                    {/* Connect Section */}
                    <div>
                        <h3 className="text-slate-900 dark:text-white font-bold mb-4 transition-colors duration-300">Connect</h3>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://www.linkedin.com/in/alfaz-mahmud-rizve/" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-blue-400 transition-colors" title="LinkedIn">
                                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                            </a>
                            <a href="https://www.youtube.com/@whoisalfazz" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-blue-400 transition-colors" title="YouTube">
                                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/whois.alfaz/" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-blue-400 transition-colors" title="Instagram">
                                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.584-.071 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477-.96-.896 1.382-.42-.419-.819-.679-1.381-.896-.422-.164-1.056-.36-2.227-.413-1.266-.057-1.646-.07-4.85.07s-3.584-.015-4.85-.071c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.016-3.584.071-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057-.36 2.227-.413 1.266-.057 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                            </a>
                            <a href="https://facebook.com/alfazmahmudrizve" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-blue-400 transition-colors" title="Facebook">
                                <svg role="img" viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="mailto:contact@whoisalfaz.me" className="text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-blue-400 transition-colors" title="Email Me">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="border-t border-slate-200 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 dark:text-slate-600 text-[10px] uppercase tracking-widest font-mono transition-colors duration-300">
                    <p>&copy; {currentYear} Alfaz Mahmud Rizve . Engineered with Next.js & Automation.</p>
                    <div className="flex gap-6">
                        <Link href="/about/alfaz-mahmud-rizve/" className="hover:text-teal-600 dark:hover:text-white transition-colors">About Me</Link>
                        <Link href="/terms/" className="hover:text-teal-600 dark:hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link href="/privacy-policy/" className="hover:text-teal-600 dark:hover:text-white transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
