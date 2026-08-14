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
    <section className="relative w-full bg-slate-50 dark:bg-[#060218] text-slate-900 dark:text-white overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20 transition-colors duration-300 select-none">
      {/* Dynamic Keyframes and Entrance Styles */}
      <style jsx global>{`
        @keyframes heroFadeDown {
          0% {
            opacity: 0;
            transform: translateY(-24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroFadeUpSmooth {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroScaleInOrbits {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes cursorFloatIn {
          0% {
            opacity: 0;
            transform: translate(-24px, 24px) scale(0.7);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes cursorGentleBob {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-6px);
          }
        }

        .anim-hero-badge {
          animation: heroFadeDown 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }

        .anim-hero-subtext {
          animation: heroFadeUpSmooth 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        .anim-hero-ctas {
          animation: heroFadeUpSmooth 0.9s cubic-bezier(0.22, 1, 0.36, 1) 3.2s both;
        }

        .anim-hero-cursor {
          animation: 
            cursorFloatIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) 3.6s both,
            cursorGentleBob 2.5s ease-in-out 4.4s infinite alternate;
        }

        .anim-hero-orbits {
          animation: heroScaleInOrbits 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }

        .anim-hero-ticker {
          animation: heroFadeUpSmooth 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }
      `}</style>

      {/* ========================================================================= */}
      {/* AMBIENT BACKGROUND & NEBULA FLARES (THEME ADAPTIVE)                       */}
      {/* ========================================================================= */}
      {/* Subtle grid mesh overlay */}
      <div className="absolute inset-0 grid-mesh opacity-30 dark:opacity-20 pointer-events-none -z-10" />

      {/* Top-left Purple nebula flare */}
      <div className="absolute -top-[15%] -left-[10%] w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] rounded-full bg-[#A068FF]/10 dark:bg-[#A068FF]/18 blur-[140px] pointer-events-none -z-10 animate-ambient-1" />

      {/* Bottom-right Teal nebula flare */}
      <div className="absolute top-[20%] -right-[15%] w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-[#2DD4BF]/10 dark:bg-[#2DD4BF]/15 blur-[150px] pointer-events-none -z-10 animate-ambient-2" />

      {/* Center atmospheric ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-teal-500/5 dark:bg-purple-950/20 blur-[160px] pointer-events-none -z-10" />

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT CONTAINER                                              */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* ======================================================================= */}
          {/* LEFT COLUMN: Badge, Typewriter Heading, Subtitle, CTAs & Floating Cursor */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left z-20">
            
            {/* Live Indicator Status Badge */}
            <div className="anim-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-purple-500/30 backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(160,104,255,0.15)] mb-6 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF] shadow-[0_0_8px_#2DD4BF]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.18em] text-teal-700 dark:text-teal-300 uppercase">
                AUTONOMOUS REVENUE SYSTEMS
              </span>
            </div>

            {/* Typewriter Heading in Urbanist font */}
            <div className="w-full mb-6">
              <TypewriterHeading
                text1="Autonomous Revenue Engines Built on Sub-Second Infrastructure"
                text2=" — Engineered to Scale Your Agency to 8 Figures!"
                typingSpeed={35}
                startDelay={400}
                className="text-[30px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[52px] xl:text-[58px] 2xl:text-[64px]"
              />
            </div>

            {/* Subtext description */}
            <p className="anim-hero-subtext text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300/90 font-medium leading-relaxed max-w-xl mb-9 transition-colors">
              I eliminate manual bottlenecks for scaling agencies with self-healing n8n workflows, AI agents, and high-performance Next.js architecture.
            </p>

            {/* CTA Action Buttons & Floating Cursor */}
            <div className="relative w-full max-w-lg mb-4">
              
              <div className="anim-hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Primary CTA: Book Strategy Call (Rotating conic-gradient border & slide hover fill) */}
                <div className="btn-border-wrap shadow-[0_0_20px_rgba(160,104,255,0.2)] dark:shadow-[0_0_30px_rgba(160,104,255,0.3)] hover:shadow-[0_0_40px_rgba(160,104,255,0.5)] transition-all duration-300">
                  <Link
                    href="/contact/"
                    className="btn-slide-fill w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-slate-900 dark:bg-[#0A0520] hover:bg-[#A068FF] text-white font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2.5 group"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="w-4 h-4 text-[#2DD4BF] group-hover:text-white group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </Link>
                </div>

                {/* Secondary CTA: Our Solutions */}
                <Link
                  href="/services/"
                  className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full border border-slate-200 dark:border-slate-700/80 hover:border-teal-500/50 dark:hover:border-teal-400/50 bg-white dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-bold text-sm sm:text-base backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(45,212,191,0.15)]"
                >
                  <span>Our Solutions</span>
                </Link>

              </div>

              {/* Floating Alfaz Pointer Badge (Appears delayed at 3.6s with gentle float) */}
              <div className="anim-hero-cursor hidden sm:flex absolute -bottom-14 right-4 sm:right-10 items-center gap-2 pointer-events-none z-30">
                {/* Pointer Arrow SVG in #A068FF */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-[0_4px_12px_rgba(160,104,255,0.7)] shrink-0 transform -rotate-12 -mt-3"
                >
                  <path
                    d="M4 0L20 12L12 14L8 22L4 0Z"
                    fill="#A068FF"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* RevOps Architect Pill Badge */}
                <div
                  className="px-4 py-2 rounded-[20px] bg-[#A068FF] text-white text-[14px] sm:text-[15px] font-medium shadow-[0_10px_30px_rgba(160,104,255,0.4)] flex items-center gap-2 border border-white/20 backdrop-blur-sm"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2DD4BF]" />
                  </span>
                  <span>Alfaz</span>
                  <span className="opacity-60 text-xs">•</span>
                  <span className="text-xs sm:text-sm font-normal text-purple-100">RevOps Architect</span>
                </div>
              </div>

            </div>

            {/* Micro Highlights Pill Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Zero Headcount Ops</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/5 shadow-xs">
                <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Sub-Second Latency</span>
              </div>
            </div>

          </div>

          {/* ======================================================================= */}
          {/* RIGHT COLUMN: Concentric Orbits Visualization                           */}
          {/* ======================================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center w-full anim-hero-orbits overflow-visible py-4 lg:py-0">
            <ConcentricOrbits
              targetCount={30}
              countSuffix="+"
              centerLabel="Systems Deployed"
              centerBadge="AUTONOMOUS REVOPS"
              countDuration={2000}
              countDelay={1200}
              pauseOnHover={true}
              className="w-full flex items-center justify-center scale-90 xs:scale-95 sm:scale-100"
            />
          </div>

        </div>

        {/* ======================================================================= */}
        {/* BOTTOM: Infinitely Scrolling Logo Ticker with Edge Fade Masks           */}
        {/* ======================================================================= */}
        <div className="anim-hero-ticker mt-14 sm:mt-20 pt-8 border-t border-slate-200/80 dark:border-purple-500/10 transition-colors">
          <p className="text-[10px] sm:text-xs font-mono font-bold text-slate-500 dark:text-slate-400/80 uppercase tracking-[0.25em] mb-6 text-center">
            ENGINEERED WITH MODERN REVENUE INFRASTRUCTURE
          </p>

          <div className="relative overflow-hidden w-full max-w-6xl mx-auto">
            {/* Left Edge Gradient Fade Mask */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-[#060218] dark:via-[#060218]/90 dark:to-transparent z-20 pointer-events-none transition-colors" />

            {/* Right Edge Gradient Fade Mask */}
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent dark:from-[#060218] dark:via-[#060218]/90 dark:to-transparent z-20 pointer-events-none transition-colors" />

            {/* Marquee Track */}
            <div className="flex gap-4 sm:gap-6 items-center justify-start animate-marquee hover:[animation-play-state:paused] w-max">
              {tickerItems.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200/80 dark:border-white/5 bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.06] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-purple-400/50 dark:hover:border-purple-500/30 transition-all duration-300 shrink-0 cursor-default select-none group shadow-xs dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
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
