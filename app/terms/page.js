
import Link from 'next/link';
import { Section, ScrollText, Mail, FileText, ChevronRight, Scale, AlertTriangle } from 'lucide-react';

export const metadata = {
    title: "Terms of Use | Alfaz Mahmud Rizve",
    description: "Terms and Conditions for whoisalfaz.me",
};

export default function TermsPage() {
    const TOC = [
        { id: "services", label: "1. Our Services" },
        { id: "intellectual", label: "2. Intellectual Property" },
        { id: "representations", label: "3. User Representations" },
        { id: "prohibited", label: "4. Prohibited Activities" },
        { id: "contributions", label: "5. User Contributions" },
        { id: "license", label: "6. Contribution License" },
        { id: "management", label: "9. Site Management" },
        { id: "termination", label: "11. Term & Termination" },
        { id: "modifications", label: "12. Modifications" },
        { id: "disputes", label: "14. Dispute Resolution" },
        { id: "liability", label: "17. Limitations of Liability" },
        { id: "contact", label: "23. Contact Us" },
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
                            For specific questions regarding these terms, please contact us directly.
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
                            <Scale size={12} /> Terms of Service
                        </div>
                        <h1 className="text-5xl font-black text-white mb-6">Terms of Use</h1>
                        <p className="text-lg text-slate-400 max-w-2xl">
                            Please read these terms carefully before using our services.
                        </p>
                        <p className="text-sm text-slate-500 mt-4 font-mono">
                            Last updated: December 30, 2025
                        </p>
                    </div>

                    {/* Agreement Blurb */}
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 mb-12">
                        <h3 className="text-white mt-0 mb-4">AGREEMENT TO TERMS</h3>
                        <p className="mt-0">
                            We are <strong>whoisalfaz.me</strong> ("Company," "we," "us," or "our"), operating in Bangladesh. We operate the website <Link href="https://whoisalfaz.me">https://whoisalfaz.me</Link> (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
                        </p>
                        <p>
                            You can contact us by phone at +8801991210347, email or by mail to Alkaran, Chittagong, Bangladesh, 4000.
                        </p>
                        <p>
                            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and whoisalfaz.me, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex gap-4 items-start not-prose">
                            <AlertTriangle className="text-red-400 shrink-0 mt-1" size={20} />
                            <p className="text-red-200 text-sm mb-0">IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
                        </div>
                    </div>

                    <h2 id="services" className="scroll-mt-32">1. OUR SERVICES</h2>
                    <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>

                    <h2 id="intellectual" className="scroll-mt-32">2. INTELLECTUAL PROPERTY RIGHTS</h2>
                    <h3>Our intellectual property</h3>
                    <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>
                    <p>Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States, Bangladesh, and around the world.</p>
                    <p>The Content and Marks are provided in or through the Services "AS IS" for your personal, non-commercial use or internal business purpose only.</p>

                    <h3>Your use of our Services</h3>
                    <p>Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:</p>
                    <ul>
                        <li>Access the Services; and</li>
                        <li>Download or print a copy of any portion of the Content to which you have properly gained access,</li>
                    </ul>
                    <p>solely for your personal, non-commercial use or internal business purpose.</p>

                    <h2 id="representations" className="scroll-mt-32">3. USER REPRESENTATIONS</h2>
                    <p>By using the Services, you represent and warrant that:</p>
                    <ol>
                        <li>all registration information you submit will be true, accurate, current, and complete;</li>
                        <li>you will maintain the accuracy of such information and promptly update such registration information as necessary;</li>
                        <li>you have the legal capacity and you agree to comply with these Legal Terms;</li>
                        <li>you are not a minor in the jurisdiction in which you reside;</li>
                        <li>you will not access the Services through automated or non-human means, whether through a bot, script or otherwise;</li>
                        <li>you will not use the Services for any illegal or unauthorized purpose; and</li>
                        <li>your use of the Services will not violate any applicable law or regulation.</li>
                    </ol>

                    <h2 id="prohibited" className="scroll-mt-32">4. PROHIBITED ACTIVITIES</h2>
                    <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                    <p>As a user of the Services, you agree not to:</p>
                    <ul>
                        <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
                        <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords.</li>
                        <li>Circumvent, disable, or otherwise interfere with security-related features of the Services.</li>
                        <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services.</li>
                        <li>Use any information obtained from the Services in order to harass, abuse, or harm another person.</li>
                        <li>Make improper use of our support services or submit false reports of abuse or misconduct.</li>
                        <li>Use the Services in a manner inconsistent with any applicable laws or regulations.</li>
                        <li>Engage in unauthorized framing of or linking to the Services.</li>
                        <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material.</li>
                        <li>Engage in any automated use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
                        <li>Delete the copyright or other proprietary rights notice from any Content.</li>
                        <li>Attempt to impersonate another user or person or use the username of another user.</li>
                        <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to the Services.</li>
                        <li>Harass, annoy, intimidate, or threaten any of our employees or agents.</li>
                        <li>Attempt to bypass any measures of the Services designed to prevent or restrict access to the Services.</li>
                        <li>Copy or adapt the Services' software, including but not limited to Flash, PHP, HTML, JavaScript, or other code.</li>
                        <li>Decipher, decompile, disassemble, or reverse engineer any of the software.</li>
                        <li>Use the Services as part of any effort to compete with us.</li>
                    </ul>

                    <h2 id="contributions" className="scroll-mt-32">5. USER GENERATED CONTRIBUTIONS</h2>
                    <p>The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services (collectively, "Contributions"). Contributions may be viewable by other users of the Services and through third-party websites.</p>

                    <h2 id="license" className="scroll-mt-32">6. CONTRIBUTION LICENSE</h2>
                    <p>You and Services agree that we may access, store, process, and use any information and personal data that you provide following the terms of the Privacy Policy and your choices (including settings).</p>
                    <p>By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you.</p>

                    <h2 id="submissions" className="scroll-mt-32">7. SUBMISSIONS</h2>
                    <p>You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the Services ("Submissions") provided by you to us are non-confidential and shall become our sole property.</p>

                    <h2 id="third-party" className="scroll-mt-32">8. THIRD-PARTY WEBSITES AND CONTENT</h2>
                    <p>The Services may contain links to other websites ("Third-Party Websites") and third-party content. Such Third-Party Websites and Third-Party Content are not investigated, monitored, or checked for accuracy, appropriateness, or completeness by us, and we are not responsible for any Third-Party Websites accessed through the Services.</p>

                    <h2 id="management" className="scroll-mt-32">9. SITE MANAGEMENT</h2>
                    <p>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms; (3) in our sole discretion, refuse, restrict access to, limit the availability of, or disable any of your Contributions; (4) remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</p>

                    <h2 id="privacy" className="scroll-mt-32">10. PRIVACY POLICY</h2>
                    <p>We care about data privacy and security. Please review our <Link href="/privacy-policy">Privacy Policy</Link>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.</p>

                    <h2 id="termination" className="scroll-mt-32">11. TERM AND TERMINATION</h2>
                    <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON.</p>

                    <h2 id="modifications" className="scroll-mt-32">12. MODIFICATIONS AND INTERRUPTIONS</h2>
                    <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</p>

                    <h2 id="imprint" className="scroll-mt-32">13. GOVERNING LAW</h2>
                    <p>These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of Bangladesh applicable to agreements made and to be entirely performed within Bangladesh, without regard to its conflict of law principles.</p>

                    <h2 id="disputes" className="scroll-mt-32">14. DISPUTE RESOLUTION</h2>
                    <p>Any dispute related to these Legal Terms and your use of the Services will be decided by binding arbitration. YOU AGREE TO GIVE UP YOUR RIGHT TO GO TO COURT to assert or defend your rights under this contract (except for matters that may be taken to small claims court). Your rights will be determined by a NEUTRAL ARBITRATOR and NOT a judge or jury.</p>

                    <h2 id="corrections" className="scroll-mt-32">15. CORRECTIONS</h2>
                    <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>

                    <h2 id="disclaimer" className="scroll-mt-32">16. DISCLAIMER</h2>
                    <div className="p-6 border border-yellow-500/20 bg-yellow-900/10 rounded-xl">
                        <p className="font-bold text-yellow-500 mb-2 mt-0">DISCLAIMER</p>
                        <p className="text-yellow-100/80 mb-0 text-sm italic">
                            THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.
                        </p>
                    </div>

                    <h2 id="liability" className="scroll-mt-32">17. LIMITATIONS OF LIABILITY</h2>
                    <p className="p-4 bg-white/5 border border-white/10 rounded-lg text-sm">
                        IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.
                    </p>

                    <h2 id="indemnification" className="scroll-mt-32">18. INDEMNIFICATION</h2>
                    <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of your use of the Services.</p>

                    <h2 id="userdata" className="scroll-mt-32">19. USER DATA</h2>
                    <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</p>

                    <h2 id="electronic" className="scroll-mt-32">20. ELECTRONIC COMMUNICATIONS</h2>
                    <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing.</p>

                    <h2 id="california" className="scroll-mt-32">21. CALIFORNIA USERS AND RESIDENTS</h2>
                    <p>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</p>

                    <h2 id="miscellaneous" className="scroll-mt-32">22. MISCELLANEOUS</h2>
                    <p>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision.</p>

                    <h2 id="contact" className="scroll-mt-32">23. CONTACT US</h2>
                    <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>

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
                                <span className="text-white font-bold">Mail & Phone</span>
                            </div>
                            <address className="text-slate-400 not-italic text-sm space-y-2">
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
