'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ExternalLink, 
  ArrowRight, 
  Code2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Rocket,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { VAULT_PLATFORMS, VaultPlatform } from '../data/vaultPlatforms';

export default function VaultPlatformsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Turnkey Platforms' },
    { id: 'flagship', label: 'Flagship Concepts' },
    { id: 'fullstack', label: 'Full-Stack & PWA' },
    { id: 'commerce', label: 'Commerce & 3D' },
    { id: 'ai-telemetry', label: 'AI & Telemetry' },
  ];

  const filteredPlatforms = VAULT_PLATFORMS.filter((vp) => {
    // Category match
    if (selectedCategory === 'flagship' && vp.project.id !== 'heaven-atelier') return false;
    if (selectedCategory === 'fullstack' && !['urban-harvest-cafe', 'cashops'].includes(vp.project.id)) return false;
    if (selectedCategory === 'commerce' && !['veloryc', 'spectre', 'heaven-atelier'].includes(vp.project.id)) return false;
    if (selectedCategory === 'ai-telemetry' && !['careerops', 'cashops'].includes(vp.project.id)) return false;

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatch = vp.project.title.toLowerCase().includes(q);
      const descMatch = vp.project.description.toLowerCase().includes(q);
      const tagMatch = vp.project.tags.some((t) => t.toLowerCase().includes(q));
      const bestForMatch = vp.bestFor.toLowerCase().includes(q);
      return titleMatch || descMatch || tagMatch || bestForMatch;
    }

    return true;
  });

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white/70 dark:bg-[#0f0f0f]/70 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 shadow-sm">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search platforms by tech, feature, or use-case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Grid of Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPlatforms.map((item) => {
          const { project } = item;
          return (
            <div
              key={project.id}
              className="group bg-white dark:bg-[#0c0c0c] border border-slate-200/80 dark:border-white/10 hover:border-teal-500/40 dark:hover:border-teal-400/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Visual Media Header */}
              <div className="relative h-60 md:h-64 w-full bg-slate-900 overflow-hidden border-b border-slate-200/60 dark:border-white/5">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-black/70 backdrop-blur-md text-white border border-white/20">
                    {item.badge}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/95 dark:bg-black/90 text-slate-900 dark:text-white border border-slate-200 dark:border-white/20 shadow-md">
                    {item.priceDisplay}{' '}
                    <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400">TURNKEY</span>
                  </span>
                </div>

                {/* Bottom Timeline Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-medium">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock size={13} className="text-teal-400" />
                    {item.deliveryTimeline}
                  </span>
                  <span className="font-mono text-[11px] text-white/70">
                    Full Commercial License
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Title & Tagline */}
                  <div className="space-y-1.5">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Ideal Fit / Best For */}
                  <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider shrink-0 text-[10px] bg-slate-200/60 dark:bg-white/10 px-1.5 py-0.5 rounded">
                      Best For
                    </span>
                    <span className="leading-tight">{item.bestFor}</span>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-white/5">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Included Deliverables:
                    </div>
                    <ul className="space-y-1.5">
                      {item.deliverables.slice(0, 5).map((del, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-teal-600 dark:text-teal-400 mt-0.5 shrink-0"
                          />
                          <span className="leading-tight">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        Acquisition &amp; Deployment
                      </div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {item.priceDisplay}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">
                        30-Day Warranty
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Zero Monthly SaaS Rent
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <Link
                      href={`/contact/?service=custom-full-stack&project=${encodeURIComponent(project.id)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02]"
                    >
                      Acquire Platform <ArrowRight size={14} />
                    </Link>

                    <div className="flex gap-2">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-white/10 transition-all"
                      >
                        Live Demo <ExternalLink size={13} />
                      </a>

                      <Link
                        href={`/portfolio/#${project.id}`}
                        className="inline-flex items-center justify-center px-3 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-all"
                        title="View Architecture Specification"
                      >
                        <Code2 size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Commercial Protocol Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white p-8 md:p-12 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-mono uppercase tracking-widest">
              <ShieldCheck size={14} /> Commercial Acquisition Protocol
            </div>
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
              What Every Platform Acquisition Includes
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              When you purchase a turnkey platform from Vault, you receive complete commercial autonomy. No SaaS lock-in, no per-seat subscriptions, no hidden monthly usage surcharges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-white/10">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-teal-400">
                <Code2 size={20} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-tight">1. Unrestricted Codebase</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full Git repository transfer. Pure TypeScript, Next.js, or React 19 code with zero vendor lock-in.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-purple-400">
                <Layers size={20} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-tight">2. Schemas &amp; Migrations</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete PostgreSQL / Supabase schema migrations, row-level security (RLS), and database seed files.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <Rocket size={20} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-tight">3. White-Glove Setup</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We configure DNS, SSL certificates, environment secrets, and deploy to your Vercel or Cloudflare account.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <ShieldCheck size={20} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-tight">4. 30-Day Warranty</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct 1-on-1 technical handover, setup walkthrough call, and 30 days of priority bugfix coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
