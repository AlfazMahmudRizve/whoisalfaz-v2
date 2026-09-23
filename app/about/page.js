import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, ShieldCheck, Layers, CheckCircle2, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'About Alfaz Mahmud Rizve | GTM & RevOps Architect',
  description: 'Learn about Alfaz Mahmud Rizve — GTM & RevOps Architect building autonomous revenue systems, self-healing n8n workflows, and Next.js applications.',
  alternates: {
    canonical: 'https://whoisalfaz.me/about/',
  },
  openGraph: {
    title: 'About Alfaz Mahmud Rizve | GTM & RevOps Architect',
    description: 'Learn about Alfaz Mahmud Rizve — GTM & RevOps Architect building autonomous revenue systems, self-healing n8n workflows, and Next.js applications.',
    url: 'https://whoisalfaz.me/about/',
    type: 'profile',
    images: [
      {
        url: 'https://whoisalfaz.me/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Alfaz Mahmud Rizve',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Alfaz Mahmud Rizve | GTM & RevOps Architect',
    description: 'Learn about Alfaz Mahmud Rizve — GTM & RevOps Architect building autonomous revenue systems, self-healing n8n workflows, and Next.js applications.',
    images: ['https://whoisalfaz.me/profile.jpg'],
  },
};

export default function AboutAuthorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Alfaz Mahmud Rizve",
      "jobTitle": "GTM & RevOps Architect",
      "url": "https://whoisalfaz.me/about/",
      "image": "https://whoisalfaz.me/profile.jpg",
      "sameAs": [
        "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
        "https://x.com/whois_alfaz",
        "https://github.com/AlfazMahmudRizve",
        "https://n8n.io/creators"
      ],
      "knowsAbout": [
        "GTM Strategy",
        "RevOps",
        "SEO & Organic Growth",
        "Programmatic SEO",
        "Topical Authority Architecture",
        "Automation Engineering",
        "n8n",
        "Next.js",
        "System Architecture",
        "React",
        "PostgreSQL",
        "API Integration",
        "Lead Routing",
        "Data Pipeline Optimization"
      ],
      "description": "Alfaz Mahmud Rizve is a GTM & RevOps Architect specializing in organic search acquisition, high-performance Next.js web applications, and autonomous revenue operations infrastructure.",
      "alumniOf": {
        "@type": "Organization",
        "name": "RevOps & Engineering Architecture"
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
                <Image src="/profile.webp" alt="Alfaz Mahmud Rizve" fill sizes="(max-width: 768px) 128px, 192px" className="object-cover" priority />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <Badge variant="default" className="mb-4 text-[10px] uppercase tracking-widest">
                Author &amp; Architect
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight uppercase">
                Alfaz Mahmud Rizve
              </h1>
              <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 mb-6 font-mono">
                GTM &amp; RevOps Architect
              </h2>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                I engineer scalable revenue engines by unifying three core pillars: <strong>GTM &amp; SEO (Organic Acquisition)</strong>, <strong>High-Performance Next.js Web Applications</strong>, and <strong>Autonomous RevOps Workflow Automation</strong>. Rather than running isolated campaigns or brittle scripts, I architect connected growth ecosystems where topical authority drives organic demand into sub-second web experiences, which capture, score, and sync leads through deterministic backend pipelines.
              </p>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                Over the past several years, I have architected programmatic SEO networks, zero-touch indexing engines, custom CRM sync systems, and web applications that process thousands of webhook events with near-zero latency. Review our rigorous <Link href="/editorial-policy/" className="text-teal-600 dark:text-teal-400 font-bold hover:underline">Editorial Policy &amp; Research Standards</Link> to see how we benchmark and test every system before publishing.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 hover:text-blue-500 rounded-xl font-bold">
                  <a href="https://www.linkedin.com/in/alfaz-mahmud-rizve/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> LinkedIn Profile
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-slate-300 dark:border-white/10 rounded-xl font-bold">
                  <a href="https://x.com/whois_alfaz" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} /> X (Twitter)
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* RevOps Engineering Methodology */}
        <section className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-10 shadow-sm mb-12">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-blue-500/20">
            <Layers size={24} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">
            The RevOps Engineering Methodology
          </h3>
          <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Revenue Operations is frequently misunderstood as simply stringing SaaS tools together. True RevOps engineering approaches business infrastructure with the same mathematical rigor, fault tolerance, and observability expected of mission-critical software systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-mono font-bold text-sm">
                    01
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Deterministic State Machines</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Workflows should behave deterministically. Every state transition—from lead capture to deal routing—is explicitly modeled with strict status validations, preventing silent failure modes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-mono font-bold text-sm">
                    02
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Self-Healing &amp; Idempotency</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Pipelines handle network timeouts, rate limits, and partial API failures gracefully. Idempotent design ensures that retried requests never create duplicate contacts or double-charge accounts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-bold text-sm">
                    03
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Decoupled Architecture</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  By insulating core data models from third-party API dependencies, switching CRMs, email providers, or payment gateways requires zero changes to core business logic.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-sm">
                    04
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Telemetry &amp; Actionable Metrics</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every execution step is logged with end-to-end tracing. Operational dashboards surface latency spikes, webhook health, and conversion bottlenecks before they impact top-line revenue.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Credentials & Technical Capabilities */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6 border border-purple-100 dark:border-purple-500/20">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Technical Credentials</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">GTM & SEO Architecture:</strong> Programmatic SEO networks, semantic entity clustering, double-directional link graphs, and automated IndexNow distribution.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">System Architecture:</strong> Designing idempotent, fault-tolerant data pipelines for Enterprise RevOps and multi-channel outreach setups.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Full Stack Engineering:</strong> Production Next.js App Router, React, Tailwind CSS, TypeScript, and modern SSR caching strategies.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Database & State:</strong> PostgreSQL, Supabase, Redis queueing, and optimized relational schema modeling.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Data Security & Compliance:</strong> Self-hosted secure n8n infrastructure adhering to strict GDPR, HIPAA, and data sovereignty standards.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 rounded-2xl flex items-center justify-center mb-6 border border-teal-100 dark:border-teal-500/20">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Client Success Metrics</h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">VibeViso 90-Day Surge:</strong> Generated 40k impressions and 88% click acceleration in 90 days via hyper-local entity clusters and double-directional internal linking.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">FlowerShop.net.ph Scale:</strong> Architected and deployed 679 fully indexed commercial pages with zero thin-content penalties.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span><strong className="text-slate-900 dark:text-slate-200">Zero-Touch Indexing Engine:</strong> Automated API pipeline pushing 41 URLs to Google, Bing, and IndexNow within 12 seconds of deploy.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span>Engineered <strong className="text-slate-900 dark:text-slate-200">Zero-Touch Lead Scoring & Routing</strong> engines connecting Brevo, HeyReach, and CRMs, reducing lead response time from 4 hours to under 30 seconds.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-teal-500 mt-1 shrink-0" />
                <span>Saved clients over <strong className="text-slate-900 dark:text-slate-200">$45,000 annually</strong> in bloated SaaS subscription fees by replacing legacy Zapier tasks with self-hosted n8n workflows.</span>
              </li>
            </ul>
          </div>

        </section>

        {/* Case Studies */}
        <section className="mb-12">
          <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-6">Featured Case Studies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link href="/blog/case-study-cashops-financial-dashboard/" className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-teal-500/50 hover:-translate-y-1 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-2 block">Custom Full-Stack</span>
              <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-2">CashOps Financial Dashboard</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Automated financial reporting pipeline eliminating 15+ hours of manual work weekly with zero latency aggregation.</p>
            </Link>
            <Link href="/blog/case-study-veloryc-premium-ecommerce/" className="group bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 hover:border-rose-500/50 hover:-translate-y-1 transition-all">
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-2 block">Conversion Optimization</span>
              <h4 className="text-slate-900 dark:text-white font-bold group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-2">Veloryc Premium Ecommerce</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Guest checkout flow and server-side optimization that increased checkout conversions by 40%.</p>
            </Link>
          </div>
          <Link href="/case-studies/" className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm mt-4 hover:underline">
            View all case studies →
          </Link>
        </section>

      </main>
    </div>
  );
}
