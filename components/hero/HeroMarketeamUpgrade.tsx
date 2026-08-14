'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { TypewriterHeading } from './TypewriterHeading';
import { ConcentricOrbits } from './ConcentricOrbits';

interface TechPartner {
  name: string;
  customPath: string;
}

const TECH_PARTNERS: TechPartner[] = [
  {
    name: 'n8n',
    customPath:
      'M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632',
  },
  {
    name: 'HubSpot',
    customPath:
      'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
  },
  {
    name: 'Apollo.io',
    customPath:
      'M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z',
  },
  {
    name: 'Databox',
    customPath: 'M24 16.51H20V24h4v-7.49zM14 6.49H10V24h4V6.49zM4 14.51H0V24h4v-9.49z',
  },
  {
    name: 'Brevo',
    customPath:
      'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z',
  },
  {
    name: 'Supabase',
    customPath:
      'M21.362 9.354H12V.304a.6.6 0 0 0-1.026-.424L.194 10.702a.6.6 0 0 0 .426 1.024H10v9.05a.6.6 0 0 0 1.026.424l10.78-10.822a.6.6 0 0 0-.444-1.024z',
  },
  {
    name: 'Pinecone',
    customPath:
      'M15.42 1.48a.47.47 0 0 0-.84 0L12 6.57 9.42 1.48a.47.47 0 0 0-.84 0L.11 19.38a.47.47 0 0 0 .42.62H23.47a.47.47 0 0 0 .42-.62L15.42 1.48zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
  },
  {
    name: 'Next.js',
    customPath:
      'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.277 17.656L9.623 6.969H7.692v10.062h1.692V10.15l7.07 8.916a10.33 10.33 0 0 0 1.823-1.41zM14.615 6.969h1.693v6.308l-1.693-2.154V6.969z',
  },
  {
    name: 'Weaviate',
    customPath: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
];

export function HeroMarketeamUpgrade() {
  const tickerItems = [...TECH_PARTNERS, ...TECH_PARTNERS];

  return (
    <section className="relative w-full bg-slate-50 dark:bg-[#060218] text-slate-900 dark:text-white overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 transition-colors duration-300 select-none">
      {/* ========================================================================= */}
      {/* AMBIENT BACKGROUND & NEBULA FLARES (HARDWARE COMPOSITED)                   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none -z-10" />

      {/* Top-left Purple flare */}
      <div className="absolute -top-[10%] -left-[5%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-[#A068FF]/10 dark:bg-[#A068FF]/15 blur-[90px] pointer-events-none -z-10" />

      {/* Bottom-right Teal flare */}
      <div className="absolute top-[20%] -right-[10%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full bg-[#2DD4BF]/10 dark:bg-[#2DD4BF]/12 blur-[100px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT CONTAINER                                              */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: Immediate Paint, Zero LCP / CLS Delay                     */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-white/[0.04] border border-slate-200 dark:border-purple-500/30 shadow-xs mb-5 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.16em] text-teal-700 dark:text-teal-300 uppercase">
                AUTONOMOUS REVENUE SYSTEMS
              </span>
            </div>

            {/* Typewriter Heading in Urbanist font (Instant Paint for <0.8s LCP) */}
            <div className="w-full mb-5">
              <TypewriterHeading
                text1="Autonomous Revenue Engines Built on Sub-Second Infrastructure"
                text2=" — Engineered to Scale Your Agency to 8 Figures!"
                className="text-[28px] xs:text-[34px] sm:text-[42px] md:text-[46px] lg:text-[48px] xl:text-[54px] 2xl:text-[60px]"
              />
            </div>

            {/* Subtext description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300/90 font-medium leading-relaxed max-w-xl mb-8 transition-colors">
              I eliminate manual bottlenecks for scaling agencies with self-healing n8n workflows, AI agents, and high-performance Next.js architecture.
            </p>

            {/* CTA Action Buttons & Floating Badge */}
            <div className="relative w-full max-w-lg mb-2">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Primary CTA: Book Strategy Call */}
                <div className="btn-border-wrap shadow-sm hover:shadow-[0_0_25px_rgba(160,104,255,0.4)] transition-shadow duration-300">
                  <Link
                    href="/contact/"
                    className="btn-slide-fill w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-slate-900 dark:bg-[#0A0520] hover:bg-[#A068FF] text-white font-bold text-sm sm:text-base transition-colors duration-200 flex items-center justify-center gap-2.5 group"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-4 h-4 text-[#2DD4BF] group-hover:text-white group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
                  </Link>
                </div>

                {/* Secondary CTA: Our Solutions */}
                <Link
                  href="/services/"
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-slate-200 dark:border-slate-700/80 hover:border-teal-500/50 dark:hover:border-teal-400/50 bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Our Solutions</span>
                </Link>

              </div>

              {/* Floating Alfaz Pointer Badge */}
              <div className="hidden sm:flex absolute -bottom-12 right-2 sm:right-6 items-center gap-1.5 pointer-events-none z-30">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-md shrink-0 transform -rotate-12 -mt-2"
                >
                  <path
                    d="M4 0L20 12L12 14L8 22L4 0Z"
                    fill="#A068FF"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                <div
                  className="px-3.5 py-1.5 rounded-full bg-[#A068FF] text-white text-[13px] font-medium shadow-md flex items-center gap-1.5 border border-white/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                  <span>Alfaz</span>
                  <span className="opacity-60 text-xs">•</span>
                  <span className="text-xs font-normal text-purple-100">RevOps Architect</span>
                </div>
              </div>

            </div>

            {/* Micro Highlights Pill Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Zero Headcount Ops</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Sub-Second Latency</span>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: 60fps Hardware Accelerated Concentric Orbits               */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center w-full overflow-visible py-2 lg:py-0">
            <ConcentricOrbits
              targetCount={30}
              countSuffix="+"
              centerLabel="Systems Deployed"
              centerBadge="AUTONOMOUS REVOPS"
              className="w-full flex items-center justify-center"
            />
          </div>

        </div>

        {/* ======================================================================= */}
        {/* BOTTOM: Infinitely Scrolling Logo Ticker with Edge Fade Masks           */}
        {/* ======================================================================= */}
        <div className="mt-10 sm:mt-14 pt-6 border-t border-slate-200 dark:border-purple-500/10 transition-colors">
          <p className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400/80 uppercase tracking-[0.25em] mb-5 text-center">
            ENGINEERED WITH MODERN REVENUE INFRASTRUCTURE
          </p>

          <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
            {/* Left Edge Gradient Fade Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#060218] dark:via-[#060218]/90 dark:to-transparent z-20 pointer-events-none transition-colors" />

            {/* Right Edge Gradient Fade Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent dark:from-[#060218] dark:via-[#060218]/90 dark:to-transparent z-20 pointer-events-none transition-colors" />

            {/* Marquee Track */}
            <div className="flex gap-4 sm:gap-6 items-center justify-start animate-marquee hover:[animation-play-state:paused] w-max">
              {tickerItems.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-slate-200 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 shrink-0 cursor-default select-none shadow-2xs"
                >
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-slate-500 dark:text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors shrink-0"
                  >
                    <path d={partner.customPath} />
                  </svg>
                  <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap uppercase font-sans">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HeroMarketeamUpgrade;
