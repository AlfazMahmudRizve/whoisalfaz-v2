'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Globe, Zap, Search, Server, Lock, ChevronDown, CheckCircle, ArrowRight, Wrench, Calculator, MessageSquare, BookOpen } from 'lucide-react';

const checks = [
  {
    icon: Zap,
    title: 'Performance & Core Web Vitals',
    color: 'text-teal-500 dark:text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    description:
      'We use the official Google PageSpeed Insights API to measure your real-world performance. This includes First Contentful Paint (FCP), Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), Total Blocking Time (TBT), and Speed Index. These Core Web Vitals directly impact your Google search rankings.',
    linkText: 'Improve your performance with headless architecture →',
    linkHref: '/services/headless-architecture/',
  },
  {
    icon: Search,
    title: 'Meta Tags & Open Graph',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    description:
      'We scan your page\'s HTML head for essential SEO tags: title tag length, meta description quality, Open Graph tags (og:title, og:description, og:image), viewport configuration for mobile responsiveness, and canonical URL to prevent duplicate content issues.',
    linkText: 'Get a professional Technical SEO audit →',
    linkHref: '/services/technical-seo/',
  },
  {
    icon: Lock,
    title: 'SSL Certificate',
    color: 'text-green-500 dark:text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    description:
      'We connect directly to your server\'s TLS handshake to verify your SSL certificate. We check the certificate issuer, expiration date, days remaining until renewal, and subject validity. An expired or missing SSL certificate will cause browsers to show security warnings and hurt your rankings.',
    linkText: 'Need help fixing SSL issues? Let\'s talk →',
    linkHref: '/contact/',
  },
  {
    icon: Shield,
    title: 'Security Headers',
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    description:
      'We verify six critical HTTP security headers: Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Content-Type-Options, X-Frame-Options, Referrer-Policy, and Permissions-Policy. Missing security headers leave your website vulnerable to XSS attacks, clickjacking, and data injection.',
    linkText: 'Harden your site with a custom full-stack build →',
    linkHref: '/services/custom-full-stack/',
  },
  {
    icon: Globe,
    title: 'Robots.txt & Sitemap',
    color: 'text-amber-500 dark:text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    description:
      'We fetch your /robots.txt to verify crawl directives and check for a sitemap reference. We also fetch /sitemap.xml to confirm it exists and count the number of indexed URLs. A missing or misconfigured sitemap prevents search engines from discovering your pages.',
    linkText: 'Fix your crawlability with Technical SEO →',
    linkHref: '/services/technical-seo/',
  },
  {
    icon: Server,
    title: 'DNS & Connectivity',
    color: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    description:
      'We resolve your domain\'s A and AAAA records, measure DNS lookup latency, detect CDN usage via multiple IP addresses, check IPv6 support, and identify redirect chains. Slow DNS resolution or unnecessary redirects add latency to every page load.',
    linkText: 'Optimize your infrastructure with headless architecture →',
    linkHref: '/services/headless-architecture/',
  },
];

const tips = [
  {
    text: 'Enable HSTS and configure a Content-Security-Policy header to protect against XSS and clickjacking attacks.',
    linkText: 'We can set this up for you',
    linkHref: '/services/custom-full-stack/',
  },
  {
    text: 'Compress images to WebP or AVIF format and lazy-load below-the-fold content to improve your PageSpeed score.',
    linkText: 'See how headless architecture delivers sub-second loads',
    linkHref: '/services/headless-architecture/',
  },
  {
    text: 'Create a complete sitemap.xml listing all important pages and reference it in your robots.txt file.',
    linkText: 'Get your sitemap audited by a Technical SEO expert',
    linkHref: '/services/technical-seo/',
  },
  {
    text: 'Write a meta title between 50-60 characters and a meta description between 120-160 characters for every page.',
    linkText: 'Learn more about on-page SEO fundamentals',
    linkHref: '/services/technical-seo/',
  },
  {
    text: 'Set up automatic SSL certificate renewal to prevent expiration warnings that drive visitors away.',
    linkText: 'Talk to us about SSL and deployment automation',
    linkHref: '/contact/',
  },
  {
    text: 'Use a Content Delivery Network (CDN) to reduce DNS latency and serve assets from edge locations globally.',
    linkText: 'Explore our headless infrastructure solutions',
    linkHref: '/services/headless-architecture/',
  },
];

const faqs = [
  {
    q: 'Is this website audit tool free?',
    a: 'Yes, completely free. You can run unlimited audits without creating an account or entering any payment information. Optionally provide your email to receive a copy of your results.',
    link: { text: 'Calculate your automation ROI too — it\'s free', href: '/labs/roi/' },
  },
  {
    q: 'How accurate is this website audit?',
    a: 'We use the official Google PageSpeed Insights API for performance data and connect directly to your server for SSL, DNS, and security header checks. The results reflect real-world conditions, not simulated tests.',
    link: { text: 'Read our technical guides on performance optimization', href: '/blog/' },
  },
  {
    q: 'What is a good website audit score?',
    a: 'A score of 80 or above is considered good. Scores of 90+ are excellent. Anything below 50 indicates critical issues that are likely hurting your search rankings and user experience.',
    link: { text: 'Get a deep-dive Technical SEO audit', href: '/services/technical-seo/' },
  },
  {
    q: 'How often should I audit my website?',
    a: 'We recommend running an audit after every major deployment, design change, or at least once a month. SSL certificates, security headers, and performance can change without you noticing.',
    link: { text: 'Automate your monitoring with custom workflows', href: '/services/n8n-automation/' },
  },
  {
    q: 'What should I fix first if my score is low?',
    a: 'Start with critical security issues (missing SSL, no security headers), then fix SEO fundamentals (title tags, meta descriptions, sitemap), and finally optimize performance (image compression, lazy loading, CDN).',
    link: { text: 'Let us fix it for you — book a free consultation', href: '/contact/' },
  },
];

const freeTools = [
  {
    icon: Calculator,
    title: 'ROI Calculator',
    description: 'Estimate how much time and money automation could save your business.',
    href: '/labs/roi/',
    color: 'text-emerald-500 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Assistant',
    description: 'Ask questions about automation, SEO, and technical architecture.',
    href: '/labs/chat/',
    color: 'text-blue-500 dark:text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: BookOpen,
    title: 'Technical Blog & Guides',
    description: 'In-depth guides on n8n automation, headless CMS, and growth engineering.',
    href: '/blog/',
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
];

export default function AuditContentFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-6xl mx-auto mt-32 space-y-32">
      {/* ─── WHAT DOES THIS TOOL CHECK? ─── */}
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
          What does our free website <span className="text-teal-600 dark:text-blue-500">audit tool check?</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-16 leading-relaxed transition-colors duration-300 text-[15px]">
          Our free website audit tool performs comprehensive, real-time diagnostics on your server connectivity, SSL certificate encryption strength, search engine crawlability parameters, HTTP security headers, and Core Web Vitals performance. Each check is carefully mapped to the professional digital solutions we offer to accelerate your web operations.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checks.map((check) => (
            <div
              key={check.title}
              className={`p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 group shadow-sm dark:shadow-none flex flex-col`}
            >
              <div
                className={`w-12 h-12 rounded-xl ${check.bg} border ${check.border} flex items-center justify-center ${check.color} mb-5 group-hover:scale-110 transition-transform`}
              >
                <check.icon size={22} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-3 uppercase tracking-tight transition-colors">
                {check.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed transition-colors mb-4 flex-grow">{check.description}</p>
              <Link
                href={check.linkHref}
                className={`${check.color} text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all hover:underline`}
              >
                {check.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ─── HOW TO IMPROVE YOUR SCORE ─── */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
          How can you improve your <span className="text-teal-600 dark:text-teal-500">website audit score?</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-300 text-[15px]">
          You can improve your website audit score by compressing your images to next-generation formats (WebP/AVIF), installing and renewing security SSL certificates, enforcing HTTPS redirects, and validating metadata lengths. Start with these high-impact solutions, or consult with us directly to handle these technical fixes.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-5 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-teal-500/20 transition-all shadow-sm dark:shadow-none"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400">
                  <CheckCircle size={16} />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-medium transition-colors">{tip.text}</p>
              </div>
              <Link
                href={tip.linkHref}
                className="ml-12 text-teal-600 dark:text-blue-400 text-xs font-bold hover:underline transition-colors"
              >
                {tip.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ─── DEEP-DIVE TECHNICAL ANALYSIS ─── */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight text-center transition-colors duration-300">
          Deep-Dive Technical Analysis: Understanding <span className="text-teal-600 dark:text-blue-500">Audit Metrics</span>
        </h2>
        <div className="space-y-6 text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed transition-colors duration-300">
          <p>
            To achieve high visibility in search engine results, modern websites must satisfy sophisticated search engine optimization standards. When search engine crawlers like Googlebot index a webpage, they evaluate a combination of user experience factors, security protocols, and machine-readable metadata configurations. Understanding the technical architecture behind these checks is essential for growth engineering.
          </p>
          <div className="grid md:grid-cols-3 gap-6 my-8">
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold text-base uppercase mb-3 tracking-tight">Core Web Vitals</h3>
              <p className="text-xs leading-relaxed">
                Core Web Vitals are a set of specific factors that Google considers important in a webpage's overall user experience. This audit maps metrics including Largest Contentful Paint (LCP) for loading performance, Cumulative Layout Shift (CLS) for visual stability, and Interaction to Next Paint (INP) for responsiveness. Fast page load times directly correlate with higher conversions and lower bounce rates.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold text-base uppercase mb-3 tracking-tight">SSL & TLS Handshakes</h3>
              <p className="text-xs leading-relaxed">
                Hypertext Transfer Protocol Secure (HTTPS) encrypts communication between the browser and server using a Secure Sockets Layer (SSL) or Transport Layer Security (TLS) certificate. Performing direct server-level checks ensures your certificate issuer is trusted, the keys are strong, and expiration thresholds are verified, maintaining security and user trust.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-slate-900 dark:text-white font-bold text-base uppercase mb-3 tracking-tight">HTTP Security Headers</h3>
              <p className="text-xs leading-relaxed">
                HTTP security headers provide a vital layer of defense by directing browsers how to handle server responses safely. Configuring HTTP Strict Transport Security (HSTS) prevents downgrade attacks, while a robust Content Security Policy (CSP) restricts unauthorized scripts, preventing Cross-Site Scripting (XSS) and injection vulnerabilities.
              </p>
            </div>
          </div>
          <p>
            Beyond speed and security, search engine crawlability relies on structural assets like XML sitemaps and robots.txt files. A robots.txt file guides search engine bots by indicating which directories to crawl or skip. Meanwhile, a sitemap.xml acts as a roadmap of all valuable URLs, allowing search engines to discover and index your pages quickly. Optimizing your DNS records and resolving network routing hops further reduces DNS lookup latency, accelerating above-the-fold content delivery.
          </p>
          <p>
            As a professional Growth and Full-Stack Software Engineer, Alfaz Mahmud Rizve builds highly optimized web architectures utilizing headless CMS platforms, Next.js frameworks, and automated integrations. Resolving these performance and technical SEO gaps is critical for growing your digital footprint and scaling conversion metrics.
          </p>
        </div>
      </div>

      {/* ─── MORE FREE TOOLS ─── */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
          Are there more free developer <span className="text-emerald-600 dark:text-emerald-500">tools available?</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-300 text-[15px]">
          Yes, we offer additional free growth engineering utilities, including an interactive ROI automation calculator, a custom AI architecture assistant, and a technical library of in-depth guides to support your digital scale-up.
        </p>
        <div className="grid sm:grid-cols-3 gap-5">
          {freeTools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group p-6 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none flex flex-col"
            >
              <div
                className={`w-12 h-12 rounded-xl ${tool.bg} border ${tool.border} flex items-center justify-center ${tool.color} mb-5 group-hover:scale-110 transition-transform`}
              >
                <tool.icon size={22} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-bold text-base mb-2 uppercase tracking-tight transition-colors">
                {tool.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed transition-colors mb-4 flex-grow">{tool.description}</p>
              <span className={`${tool.color} text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all`}>
                Try it free <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── FREQUENTLY ASKED QUESTIONS ─── */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight text-center transition-colors duration-300">
          Frequently Asked Questions About <span className="text-purple-600 dark:text-purple-500">Website Audits</span>
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-2xl mx-auto mb-12 leading-relaxed transition-colors duration-300 text-[15px]">
          Find detailed answers to the most common questions about website speed, search engine optimization, security protocols, and audit scoring systems.
        </p>
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-purple-500/30 bg-purple-50 dark:bg-purple-500/5'
                    : 'border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-slate-900 dark:text-white font-bold text-[15px] transition-colors">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-purple-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 -mt-1 space-y-3">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed transition-colors">{faq.a}</p>
                    <Link
                      href={faq.link.href}
                      className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-bold hover:underline transition-colors"
                    >
                      {faq.link.text} <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── NEED EXPERT HELP? CTA ─── */}
      <div className="max-w-4xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] p-10 md:p-14 text-center shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal-400 via-purple-500 to-teal-400" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-purple-500/10" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-400 mx-auto mb-6">
              <Wrench size={28} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase tracking-tight">
              Need expert help <span className="text-teal-400">fixing these technical issues?</span>
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-[15px] leading-relaxed font-medium">
              Get professional growth engineering services, custom headless architecture integrations, and advanced technical SEO optimizations built directly by Alfaz Mahmud Rizve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="px-8 py-4 bg-teal-500 text-black font-black uppercase tracking-wider text-sm rounded-full hover:bg-teal-400 transition-all shadow-xl shadow-teal-500/20 hover:-translate-y-1 flex items-center gap-2"
              >
                Book a Free Consultation <ArrowRight size={16} />
              </Link>
              <Link
                href="/services/"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-wider text-sm rounded-full hover:bg-white/20 transition-all flex items-center gap-2"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
