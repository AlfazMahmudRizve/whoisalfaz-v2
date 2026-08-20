'use client';

import { useState } from 'react';
import { Copy, Check, Code2, Download, ExternalLink, ShieldCheck, Sparkles, Terminal, FileCode2 } from 'lucide-react';

const SNIPPETS = {
  html: {
    label: 'HTML',
    icon: Code2,
    code: '<a href="https://whoisalfaz.me/audit/" target="_blank"><img src="https://whoisalfaz.me/badges/audited-by-whoisalfaz.svg" alt="Audited by WhoisAlfaz" /></a>',
    desc: 'Ideal for website footers, client websites, web apps, and static HTML templates.'
  },
  markdown: {
    label: 'Markdown',
    icon: Terminal,
    code: '[![Audited by WhoisAlfaz](https://whoisalfaz.me/badges/audited-by-whoisalfaz.svg)](https://whoisalfaz.me/audit/)',
    desc: 'Perfect for GitHub READMEs, GitLab repositories, and developer documentation.'
  },
  jsx: {
    label: 'React / Next.js',
    icon: FileCode2,
    code: '<a href="https://whoisalfaz.me/audit/" target="_blank" rel="noopener noreferrer">\n  <img \n    src="https://whoisalfaz.me/badges/audited-by-whoisalfaz.svg" \n    alt="Audited by WhoisAlfaz" \n    width={190} \n    height={28} \n  />\n</a>',
    desc: 'Ready for Next.js, Remix, Astro, and React component trees.'
  },
  url: {
    label: 'Direct Asset URL',
    icon: ExternalLink,
    code: 'https://whoisalfaz.me/badges/audited-by-whoisalfaz.svg',
    desc: 'Direct CDN link to the retina-ready vector SVG badge.'
  }
};

export default function AuditBadgeSection() {
  const [activeTab, setActiveTab] = useState('html');
  const [copied, setCopied] = useState(false);
  const [previewTheme, setPreviewTheme] = useState('dark');

  const currentSnippet = SNIPPETS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'audit_badge_copied', {
        event_category: 'Audit Badge',
        event_label: activeTab
      });
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="embed-badge" className="my-16 scroll-mt-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0d121f] border border-slate-200 dark:border-white/10 p-6 sm:p-10 shadow-2xl transition-all duration-300">
        {/* Glow effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles size={12} className="animate-spin-slow" />
              Embed & Share Badge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Showcase Your Site Health With the Official Badge
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              Let clients and contributors know your website passes Core Web Vitals, technical SEO, and modern security header standards. Embed the live verified badge in your README or footer.
            </p>
          </div>

          {/* Quick stats pill */}
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2.5 rounded-2xl self-start md:self-auto">
            <ShieldCheck size={20} className="text-teal-500" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">Badge Status</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Verified · SVG Retina</p>
            </div>
          </div>
        </div>

        {/* Live Badge Preview Area */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Preview Panel */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Live Preview</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/10 text-[11px] font-bold">
                  <button
                    onClick={() => setPreviewTheme('dark')}
                    className={`px-2 py-0.5 rounded transition-colors ${previewTheme === 'dark' ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-black shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Dark
                  </button>
                  <button
                    onClick={() => setPreviewTheme('light')}
                    className={`px-2 py-0.5 rounded transition-colors ${previewTheme === 'light' ? 'bg-slate-900 text-white dark:bg-teal-500 dark:text-black shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    Light
                  </button>
                </div>
              </div>

              {/* Preview Canvas */}
              <div
                className={`w-full py-12 px-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                  previewTheme === 'dark'
                    ? 'bg-[#080c14] border-white/10 text-white'
                    : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <a
                  href="https://whoisalfaz.me/audit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform hover:scale-105 inline-block group"
                  title="Click to test badge destination"
                >
                  <img
                    src="/badges/audited-by-whoisalfaz.svg"
                    alt="Audited by WhoisAlfaz"
                    width={190}
                    height={28}
                    className="h-7 w-auto shadow-lg rounded-md"
                  />
                </a>
                <p className="text-[11px] font-medium opacity-60 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                  Clickable badge links to free audit tool
                </p>
              </div>

              {/* Direct Download SVG button */}
              <div className="mt-3 flex justify-end">
                <a
                  href="/badges/audited-by-whoisalfaz.svg"
                  download="audited-by-whoisalfaz.svg"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-500 dark:hover:text-teal-300 transition-colors"
                >
                  <Download size={13} />
                  Download standalone .svg file
                </a>
              </div>
            </div>
          </div>

          {/* Right: Code Generator Panel */}
          <div className="lg:col-span-7">
            {/* Format Selection Tabs */}
            <div className="flex flex-wrap gap-2 mb-3">
              {Object.entries(SNIPPETS).map(([key, item]) => {
                const Icon = item.icon;
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-500 text-black shadow-md shadow-teal-500/20'
                        : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Code Box */}
            <div className="relative rounded-2xl bg-[#090d16] border border-slate-800 dark:border-white/10 p-4 font-mono text-xs text-slate-200 shadow-inner group">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5 text-[11px] text-slate-400 font-sans">
                <span>{currentSnippet.desc}</span>
                <span className="uppercase text-[10px] font-bold tracking-widest text-teal-400">{activeTab}</span>
              </div>

              <pre className="overflow-x-auto whitespace-pre-wrap break-all py-2 text-teal-300/90 leading-relaxed select-all">
                {currentSnippet.code}
              </pre>

              {/* Copy Button */}
              <button
                onClick={handleCopy}
                className={`mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all duration-200 ${
                  copied
                    ? 'bg-emerald-500 text-black'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-teal-500/50'
                }`}
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-black stroke-[3]" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy {currentSnippet.label} Snippet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Benefits for Devs & Agencies */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <span className="text-teal-500 font-black">01.</span> GitHub READMEs
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Showcase top-tier technical performance, DNS latency, and SEO compliance on open source repositories.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <span className="text-teal-500 font-black">02.</span> Website Footers
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Provide third-party audit verification for users, boosting client confidence and conversion rates.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <span className="text-teal-500 font-black">03.</span> Agency Client Handoffs
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Include proof of quality assurance and SSL security verification in your final client deliverables.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
