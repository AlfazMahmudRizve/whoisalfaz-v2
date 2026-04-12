import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, Zap, Server } from 'lucide-react';

export const metadata = {
  title: 'Alfaz Mahmud Rizve - RevOps Architect & Full Stack Engineer',
  description: 'Alfaz Mahmud Rizve is a RevOps automation architect and full-stack engineer. Learn about his credentials, client outcomes, and engineering philosophy.',
  alternates: {
    canonical: 'https://whoisalfaz.me/about/alfaz-mahmud-rizve/',
  },
};

export default function AboutAuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Alfaz Mahmud Rizve",
      "jobTitle": "RevOps Architect & Full Stack Automation Engineer",
      "url": "https://whoisalfaz.me",
      "image": "https://whoisalfaz.me/profile.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/alfazmahmudrizve/",
        "https://x.com/whoisalfaz"
      ],
      "knowsAbout": ["RevOps", "Automation", "n8n", "Next.js", "System Architecture", "React", "PostgreSQL"],
      "description": "Alfaz Mahmud Rizve is a Revenue Operations (RevOps) Architect and Full Stack Engineer specializing in building scalable backend logic and high-performance frontend interfaces.",
      "alumniOf": {
        "@type": "Organization",
        "name": "RevOps & Engineering"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pt-24 pb-20 selection:bg-teal-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Decorative Background */}
      <div className="fixed top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal-500/10 to-transparent dark:from-teal-900/10 dark:to-transparent -z-10" />

      <main className="max-w-4xl mx-auto px-6">
        
        <Link href="/blog/" className="inline-flex items-center gap-2 text-slate-500 font-bold uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors mb-12 text-xs group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Library
        </Link>

        {/* Hero Section */}
        <section className="bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-[#0f172a] dark:to-slate-900 border border-slate-200 dark:border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px] -mr-16 -mt-16 pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
            {/* Profile Image */}
            <div className="shrink-0 w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-slate-100 dark:bg-slate-800 p-1 ring-4 ring-slate-100 dark:ring-white/5 shadow-xl">
              <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                <Image src="/profile.jpg" alt="Alfaz Mahmud Rizve" fill sizes="(max-width: 768px) 128px, 192px" className="object-cover" priority />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <div className="inline-block px-4 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-100 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-widest mb-4">
                Author & Architect
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight uppercase">
                Alfaz Mahmud Rizve
              </h1>
              <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-6 font-mono">
                RevOps Architect & Full Stack Automation Engineer
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl">
                I do not build fragile Zaps. I engineer robust, autonomous systems. As a RevOps Architect, I bridge the gap between complex backend automation logic and high-performance, user-centric frontends. My philosophy is simple: architecture first, tools second.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="https://www.linkedin.com/in/alfazmahmudrizve/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-blue-200 dark:border-blue-500/30">
                  <ExternalLink size={16} /> LinkedIn Profile
                </a>
                <a href="https://x.com/whoisalfaz" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-900 dark:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors border border-slate-200 dark:border-white/10">
                  <ExternalLink size={16} /> X (Twitter)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Credentials & Architecture */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-100 dark:border-purple-500/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Engineering Credentials</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">System Architecture:</strong> Designing idempotent, fault-tolerant data pipelines for Enterprise RevOps.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Full Stack Development:</strong> Next.js App Router, React, Tailwind CSS, TypeScript.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Data Privacy Compliance:</strong> Self-hosted secure n8n infrastructure with GDPR/HIPAA standards.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 border border-teal-100 dark:border-teal-500/20">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Client Outcomes</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>Engineered <strong className="text-slate-900 dark:text-slate-200">Zero-Touch Lead Scoring</strong> systems connecting Brevo, HeyReach, and CRMs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>Achieved <strong className="text-slate-900 dark:text-slate-200">Sub-Second Load Times</strong> for SEO-optimized Next.js web applications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                <span>Automated <strong className="text-slate-900 dark:text-slate-200">100+ Hours/Month</strong> of manual data entry via deterministic workflow engines.</span>
              </li>
            </ul>
          </div>

        </section>

      </main>
    </div>
  );
}
