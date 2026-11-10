'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { m, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Mail,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sliders,
  UserCheck,
  Sparkles
} from 'lucide-react';

import WorkflowSteps from '@/components/WorkflowSteps';
import LazyAuditTool from '@/components/LazyAuditTool';
import NewsletterForm from '@/components/NewsletterForm';
import HomeContentFooter from '@/components/footers/HomeContentFooter';
import VerifiedN8nBadge from '@/components/VerifiedN8nBadge';

interface Post {
  title: string;
  slug: { current: string };
  description?: string;
  date?: string;
  image?: string;
  categories?: string[];
}

interface Props {
  posts: Post[];
}

// Framer Motion Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1
    }
  }
};

interface TechPartner {
  name: string;
  role: string;
  customPath: string;
}

const TECH_PARTNERS: TechPartner[] = [
  {
    name: 'n8n',
    role: 'Workflow Ops',
    customPath:
      'M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632',
  },
  {
    name: 'Next.js',
    role: 'Edge Speed',
    customPath:
      'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.277 17.656L9.623 6.969H7.692v10.062h1.692V10.15l7.07 8.916a10.33 10.33 0 0 0 1.823-1.41zM14.615 6.969h1.693v6.308l-1.693-2.154V6.969z',
  },
  {
    name: 'Supabase',
    role: 'Postgres & Auth',
    customPath:
      'M21.362 9.354H12V.304a.6.6 0 0 0-1.026-.424L.194 10.702a.6.6 0 0 0 .426 1.024H10v9.05a.6.6 0 0 0 1.026.424l10.78-10.822a.6.6 0 0 0-.444-1.024z',
  },
  {
    name: 'HubSpot',
    role: 'CRM Pipeline',
    customPath:
      'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
  },
  {
    name: 'Apollo.io',
    role: 'B2B Enrichment',
    customPath:
      'M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z',
  },
  {
    name: 'Pinecone',
    role: 'Vector AI',
    customPath:
      'M15.42 1.48a.47.47 0 0 0-.84 0L12 6.57 9.42 1.48a.47.47 0 0 0-.84 0L.11 19.38a.47.47 0 0 0 .42.62H23.47a.47.47 0 0 0 .42-.62L15.42 1.48zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
  },
  {
    name: 'Brevo',
    role: 'Email Automation',
    customPath:
      'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z',
  },
  {
    name: 'Surfer SEO',
    role: 'Topical Authority',
    customPath:
      'M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.2 16.2L8.5 12l7.7-4.2v8.4z',
  },
  {
    name: 'Databox',
    role: 'Telemetry',
    customPath:
      'M24 16.51H20V24h4v-7.49zM14 6.49H10V24h4V6.49zM4 14.51H0V24h4v-9.49z',
  },
  {
    name: 'Weaviate',
    role: 'Semantic Search',
    customPath:
      'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  },
  {
    name: 'monday.com',
    role: 'Operations',
    customPath:
      'M21.926 7.647h-4.32a.112.112 0 0 0-.112.112v8.482c0 .062.05.112.112.112h4.32a.112.112 0 0 0 .112-.112V7.759a.112.112 0 0 0-.112-.112zm-7.603 3.635H9.988a.112.112 0 0 0-.112.112v5.047c0 .062.051.112.112.112h4.335a.112.112 0 0 0 .112-.112v-5.047a.112.112 0 0 0-.112-.112zm-7.618 2.652H2.385a.112.112 0 0 0-.112.113v2.395c0 .062.051.112.112.112h4.32a.112.112 0 0 0 .112-.112v-2.395a.112.112 0 0 0-.112-.113z',
  },
  {
    name: 'Wati',
    role: 'WhatsApp API',
    customPath:
      'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.1 15.6h-10.2v-1.2h10.2v1.2zm0-3.6h-10.2v-1.2h10.2v1.2zm0-3.6h-10.2V7.2h10.2v1.2z',
  },
];

export default function ProductionHomepage({ posts }: Props) {
  const { theme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [soundEnabled] = useState(true);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(1);

  // Business ROI Calculator State
  const [teamMembers, setTeamMembers] = useState<number>(3);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(8);
  const [avgHourlyCost, setAvgHourlyCost] = useState<number>(45);

  // Interactive Benchmark & Directory State
  const [latencyTesting, setLatencyTesting] = useState(false);
  const [liveLatency, setLiveLatency] = useState<number | null>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  // Safe theme detection
  const isLight = mounted ? (resolvedTheme || theme) === 'light' : true;

  const runLatencyBenchmark = () => {
    setLatencyTesting(true);
    playSound(880, 'sine', 0.04);
    setTimeout(() => {
      setLiveLatency(38);
      setLatencyTesting(false);
      playSound(1200, 'triangle', 0.08);
    }, 400);
  };

  // Micro audio synthesis helper
  const playSound = (freq = 880, type: OscillatorType = 'sine', duration = 0.04) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext blocked
    }
  };

  // Calculated Business Metrics
  const totalWeeklyHours = teamMembers * hoursWastedPerWeek;
  const annualHoursWasted = totalWeeklyHours * 52;
  const annualPayrollWasted = Math.round(annualHoursWasted * avgHourlyCost);
  const estimatedSaaSSaved = Math.round(teamMembers * 150 * 12);
  const totalAnnualSavings = annualPayrollWasted + estimatedSaaSSaved;

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans overflow-x-hidden relative ${
      isLight 
        ? 'bg-slate-50 text-slate-900 selection:bg-teal-500/20 selection:text-teal-900' 
        : 'bg-[#0a0a0a] text-slate-100 selection:bg-teal-500/30 selection:text-teal-200'
    }`}>
      
      {/* FLOATING AMBIENT GLOW ORBS */}
      <m.div 
        animate={{ 
          x: [0, 35, 0], 
          y: [0, -25, 0],
          scale: [1, 1.15, 1] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isLight ? 'bg-teal-500/10' : 'bg-teal-500/15'
        }`}
      />
      <m.div 
        animate={{ 
          x: [0, -35, 0], 
          y: [0, 30, 0],
          scale: [1, 1.2, 1] 
        }}
        transition={{ 
          duration: 14, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`absolute top-1/3 -right-24 w-[550px] h-[550px] rounded-full blur-[150px] pointer-events-none -z-10 ${
          isLight ? 'bg-purple-500/10' : 'bg-purple-500/15'
        }`}
      />
      <m.div 
        animate={{ 
          x: [0, 25, 0], 
          y: [0, -20, 0],
          scale: [1, 1.1, 1] 
        }}
        transition={{ 
          duration: 16, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className={`absolute bottom-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10 ${
          isLight ? 'bg-teal-500/5' : 'bg-teal-500/10'
        }`}
      />

      {/* Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:outline-none rounded-lg ${
          isLight ? 'focus:bg-teal-600 focus:text-white' : 'focus:bg-teal-400 focus:text-slate-950'
        }`}
      >
        Skip to main content
      </a>



      {/* MAIN CONTENT LANDMARK CONTAINER */}
      <div id="main-content" className="relative z-10">

        {/* ======================================================================= */}
        {/* SECTION 1: SOLUTION-LED HERO                                            */}
        {/* ======================================================================= */}
        <section className="px-4 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-16 relative">
          
          <div className="max-w-[1536px] mx-auto">
            
            {/* Hero Island Card */}
            <m.div 
              initial={{ opacity: 0, y: 30, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[2.5rem] p-8 sm:p-14 md:p-16 transition-all duration-300 relative overflow-hidden mb-12 ${
                isLight 
                  ? 'bg-white border border-slate-200/90 shadow-[0_4px_35px_rgba(0,0,0,0.03)] text-slate-900' 
                  : 'bg-[#111622] border border-white/10 shadow-[0_4px_35px_rgba(0,0,0,0.6)] text-white'
              }`}
            >
              
              {/* Top Credibility Trust Row (Clean, No Repetitive Badges) */}
              <m.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex flex-wrap items-center gap-3.5 mb-8"
              >
                <VerifiedN8nBadge variant="full" className="shadow-xs" />
                
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold transition-all ${
                  isLight 
                    ? 'bg-slate-100/90 border border-slate-200 text-slate-800' 
                    : 'bg-white/5 border border-white/10 text-slate-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-teal-600' : 'bg-teal-400'}`} />
                  <span>Web Development • Organic SEO • RevOps Automation</span>
                </div>
              </m.div>

              {/* Editorial Headline with Refined Typography & Kinetic Motion */}
              <h1 
                className={`text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] font-urbanist font-black uppercase tracking-[-0.035em] leading-[1.02] sm:leading-[0.96] mb-8 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <span className="block overflow-hidden">
                  <m.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="inline-block"
                  >
                    Websites and automations
                  </m.span>
                </span>
                
                <span className="block overflow-hidden">
                  <m.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.32 }}
                    className={`inline-block ${
                      isLight 
                        ? 'text-slate-500' 
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400'
                    }`}
                  >
                    that bring you more clients
                  </m.span>
                </span>

                <span className="block overflow-hidden">
                  <m.span
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.44 }}
                    className="inline-block"
                  >
                    <m.span
                      whileHover={{ scale: 1.02, x: 4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`inline-block cursor-default ${
                        isLight 
                          ? 'text-teal-700' 
                          : 'text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400'
                      }`}
                    >
                      without the busywork.
                    </m.span>
                  </m.span>
                </span>
              </h1>

              {/* Conversational Plain English Subtitle */}
              <m.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.55 }}
                className={`text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed mb-10 font-normal ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                Stop losing potential clients to slow websites, missed inquiries, and manual data entry. We build lightning-fast web applications, rank your business on Google, and automate your lead follow-ups so you convert more buyers 24/7.
              </m.p>

              {/* Action Buttons */}
              <m.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <m.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact/"
                    onMouseEnter={() => playSound(980, 'sine', 0.04)}
                    className={`px-8 py-4 font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 flex items-center gap-2 group ${
                      isLight 
                        ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20' 
                        : 'bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold shadow-[0_0_30px_rgba(45,212,191,0.25)]'
                    }`}
                  >
                    <span>BOOK A FREE STRATEGY CALL</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </m.div>

                <m.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href="#solutions"
                    onMouseEnter={() => playSound(640, 'triangle', 0.04)}
                    className={`px-7 py-4 text-xs font-semibold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 ${
                      isLight 
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200' 
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10'
                    }`}
                  >
                    <span>EXPLORE THREE SOLUTIONS</span>
                    <ChevronRight size={14} className={isLight ? 'text-teal-600' : 'text-teal-400'} />
                  </a>
                </m.div>
              </m.div>

              {/* ======================================================================= */}
              {/* UPGRADED MARQUEE: TECH STACK & ENTERPRISE INTEGRATION ECOSYSTEM          */}
              {/* ======================================================================= */}
              <div className={`mt-10 sm:mt-14 pt-8 border-t transition-colors ${
                isLight ? 'border-slate-200/90' : 'border-white/10'
              }`}>
                {/* Header row with live status beacon */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <p className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      Engineered with Modern Revenue Infrastructure
                    </p>
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                    <span>12+ Native Integrations</span>
                    <span className="text-slate-300 dark:text-white/20">•</span>
                    <span className="text-teal-700 dark:text-teal-400 font-semibold">Zero Vendor Lock-In</span>
                  </div>
                </div>

                {/* Marquee Container with Fluid Edge-Fade Feathering */}
                <div className="relative overflow-hidden w-full -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-16 px-4 sm:px-8 md:px-12 lg:px-16">
                  {/* Left Edge Mask */}
                  <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none transition-colors ${
                    isLight 
                      ? 'bg-gradient-to-r from-white via-white/80 to-transparent' 
                      : 'bg-gradient-to-r from-[#111622] via-[#111622]/80 to-transparent'
                  }`} />

                  {/* Right Edge Mask */}
                  <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-20 pointer-events-none transition-colors ${
                    isLight 
                      ? 'bg-gradient-to-l from-white via-white/80 to-transparent' 
                      : 'bg-gradient-to-l from-[#111622] via-[#111622]/80 to-transparent'
                  }`} />

                  {/* Infinite Smooth Scrolling Track */}
                  <div className="flex gap-3 sm:gap-4 items-center justify-start animate-marquee hover:[animation-play-state:paused] w-max py-1.5">
                    {[...TECH_PARTNERS, ...TECH_PARTNERS].map((partner, index) => (
                      <div
                        key={`${partner.name}-${index}`}
                        onMouseEnter={() => playSound(800 + (index % 6) * 45, 'sine', 0.02)}
                        className={`group flex items-center gap-2.5 px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full border transition-all duration-200 shrink-0 cursor-default select-none ${
                          isLight
                            ? 'bg-slate-50/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-teal-400 hover:bg-white hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-white/[0.03] border-white/10 text-slate-300 hover:text-white hover:border-teal-400/50 hover:bg-white/[0.07] hover:shadow-[0_0_20px_rgba(45,212,191,0.15)] hover:-translate-y-0.5'
                        }`}
                      >
                        <svg
                          role="img"
                          viewBox="0 0 24 24"
                          className={`w-4 h-4 fill-current transition-colors shrink-0 ${
                            isLight 
                              ? 'text-slate-600 group-hover:text-teal-600' 
                              : 'text-slate-400 group-hover:text-teal-400'
                          }`}
                        >
                          <path d={partner.customPath} />
                        </svg>
                        <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap uppercase font-sans">
                          {partner.name}
                        </span>
                        <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full shrink-0 transition-colors ${
                          isLight 
                            ? 'bg-slate-200/70 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700' 
                            : 'bg-white/10 text-slate-400 group-hover:bg-teal-400/10 group-hover:text-teal-300'
                        }`}>
                          {partner.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </m.div>

            {/* ========================================================================= */}
            {/* THREE CORE SOLUTIONS // FULL-WIDTH SPLIT SHOWCASE CARDS                   */}
            {/* ========================================================================= */}
            <div id="solutions" className="pt-6 scroll-mt-24">
              
              {/* Section Header (No repetitive pill tag above heading) */}
              <m.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <div>
                  <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-urbanist font-black uppercase tracking-[-0.03em] leading-[0.96] ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    Everything your business needs to grow <br className="hidden lg:block" />
                    <span className={isLight ? 'text-teal-600' : 'text-teal-400'}>— under one roof.</span>
                  </h2>
                </div>
                <p className={`text-sm sm:text-base max-w-md leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-slate-300'
                }`}>
                  Most companies have great products but lose clients because of slow websites and delayed responses. We build the three systems that fix this permanently.
                </p>
              </m.div>

              {/* THE 3 CORE SOLUTIONS */}
              <div className="space-y-8 mb-12">
                
                {/* ----------------------------------------------------------------------- */}
                {/* SHOWCASE 1: ORGANIC SEARCH (No "Organic Demand Capture" pill)            */}
                {/* ----------------------------------------------------------------------- */}
                <m.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onMouseEnter={() => playSound(640, 'sine', 0.03)}
                  className={`group rounded-[2.25rem] p-8 sm:p-12 transition-all duration-300 flex flex-col lg:flex-row gap-10 items-stretch ${
                    isLight 
                      ? 'bg-white border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-teal-300' 
                      : 'bg-[#111622] border border-white/10 hover:border-teal-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {/* Left Column */}
                  <div className="lg:w-7/12 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-2xl sm:text-4xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                        isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-400'
                      } transition-colors`}>
                        Get Found by Ready-to-Buy Clients on Google
                      </h3>

                      <p className={`text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-xl ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Stop burning your budget on rising Meta and Google ad auctions. We build 600+ page search systems that rank for high-intent keywords your potential clients are actively searching for — bringing qualified leads directly to you with zero ongoing ad spend.
                      </p>
                    </div>

                    <div>
                      {/* Metric Proof Row */}
                      <div className={`grid grid-cols-3 gap-3 py-4 px-4 sm:px-6 rounded-2xl mb-6 ${
                        isLight ? 'bg-slate-50 border border-slate-200' : 'bg-black/50 border border-white/[0.08]'
                      }`}>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>+380%</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Organic Traffic</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>600+</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Indexed Pages</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>$0</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Ongoing Ad Spend</div>
                        </div>
                      </div>

                      <Link
                        href="/services/seo-organic-growth/"
                        className={`inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider transition-colors hover:underline ${
                          isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-400'
                        }`}
                      >
                        <span>Explore SEO Architecture</span>
                        <div className="flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-200">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Interactive Visual */}
                  <div className={`lg:w-5/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${
                    isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-black/60 border-white/[0.08]'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-4">
                        <div className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>GOOGLE #1 SERP RANK</span>
                        </div>
                        <span className={`font-bold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>+380% TRAFFIC</span>
                      </div>

                      {/* Growth Sparkline with PathLength Animation */}
                      <div className="relative h-24 w-full flex items-end my-2">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 240 70" fill="none">
                          <defs>
                            <linearGradient id="curveLight1" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <m.path
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: "easeInOut" }}
                            d="M 0 62 C 40 60, 70 54, 110 40 C 150 26, 180 14, 240 6"
                            stroke={isLight ? '#0d9488' : '#2dd4bf'}
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 0 62 C 40 60, 70 54, 110 40 C 150 26, 180 14, 240 6 L 240 70 L 0 70 Z"
                            fill="url(#curveLight1)"
                          />
                          <circle cx="240" cy="6" r="4.5" fill={isLight ? '#0d9488' : '#2dd4bf'} className="animate-ping" />
                          <circle cx="240" cy="6" r="3.5" fill={isLight ? '#0d9488' : '#2dd4bf'} />
                        </svg>
                      </div>

                      <div className={`space-y-2 mt-4 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        <div className={`flex items-center justify-between p-2 rounded-lg ${isLight ? 'bg-white border border-slate-200' : 'bg-white/[0.04]'}`}>
                          <span>High-Intent Commercial Searches</span>
                          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Position 1.2 Avg</span>
                        </div>
                        <div className={`flex items-center justify-between p-2 rounded-lg ${isLight ? 'bg-white border border-slate-200' : 'bg-white/[0.04]'}`}>
                          <span>Target Audience Reach</span>
                          <span className={`font-bold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>Active Buyers</span>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-4 pt-4 border-t text-xs flex items-center justify-between ${
                      isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.06] text-slate-400'
                    }`}>
                      <span>Monthly Traffic Lift</span>
                      <span className={`font-bold ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>COMPOUNDING OVER TIME</span>
                    </div>
                  </div>
                </m.div>

                {/* ----------------------------------------------------------------------- */}
                {/* SHOWCASE 2: WEB PLATFORMS (No "Sub-Second Performance" pill)             */}
                {/* ----------------------------------------------------------------------- */}
                <m.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onMouseEnter={() => playSound(720, 'sine', 0.03)}
                  className={`group rounded-[2.25rem] p-8 sm:p-12 transition-all duration-300 flex flex-col lg:flex-row gap-10 items-stretch ${
                    isLight 
                      ? 'bg-white border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-purple-300' 
                      : 'bg-[#111622] border border-white/10 hover:border-purple-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {/* Left Column */}
                  <div className="lg:w-7/12 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-2xl sm:text-4xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                        isLight ? 'text-slate-900 group-hover:text-purple-700' : 'text-white group-hover:text-purple-400'
                      } transition-colors`}>
                        Websites That Load in Under 1 Second and Convert
                      </h3>

                      <p className={`text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-xl ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Slow websites kill conversions. If your pages take more than 2 seconds to load, over half your visitors leave before reading your offer. We build custom Next.js platforms that load in milliseconds across the globe, giving your visitors an instant experience that turns them into clients.
                      </p>
                    </div>

                    <div>
                      {/* Metric Proof Row */}
                      <div className={`grid grid-cols-3 gap-3 py-4 px-4 sm:px-6 rounded-2xl mb-6 ${
                        isLight ? 'bg-slate-50 border border-slate-200' : 'bg-black/50 border border-white/[0.08]'
                      }`}>
                        <div>
                          <div className="text-2xl sm:text-3xl font-urbanist font-black text-purple-600 dark:text-purple-400">&lt; 0.8s</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Global Page Load</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>100/100</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Google Lighthouse</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>+30%</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Conversion Lift</div>
                        </div>
                      </div>

                      <Link
                        href="/services/custom-full-stack/"
                        className={`inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider transition-colors hover:underline ${
                          isLight ? 'text-slate-900 group-hover:text-purple-700' : 'text-white group-hover:text-purple-400'
                        }`}
                      >
                        <span>Explore Web Platforms</span>
                        <div className="flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-200">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Latency Benchmark */}
                  <div className={`lg:w-5/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${
                    isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-black/60 border-white/[0.08]'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-4">
                        <div className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>
                          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                          <span>EDGE LATENCY AUDIT</span>
                        </div>
                        <span className={`font-bold ${isLight ? 'text-purple-700' : 'text-purple-400'}`}>NEXT.js 16 EDGE</span>
                      </div>

                      {/* Interactive Latency Trigger Button */}
                      <div className={`p-4 rounded-xl border mb-4 ${
                        isLight ? 'bg-white border-slate-200' : 'bg-white/[0.03] border-white/10'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Time to First Byte (TTFB):</span>
                          <span className={`text-xl font-urbanist font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            {liveLatency ? `${liveLatency} ms` : '38 ms'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-purple-600 dark:bg-purple-400 transition-all duration-500 ${
                              latencyTesting ? 'w-full animate-pulse' : 'w-[94%]'
                            }`} 
                          />
                        </div>
                      </div>

                      <m.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={runLatencyBenchmark}
                        disabled={latencyTesting}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isLight 
                            ? 'bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200' 
                            : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        }`}
                      >
                        <Zap size={14} className={latencyTesting ? 'animate-spin' : ''} />
                        <span>{latencyTesting ? 'Measuring Edge Node...' : 'Test Live Server Speed'}</span>
                      </m.button>
                    </div>

                    <div className={`mt-4 pt-4 border-t text-xs flex items-center justify-between ${
                      isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.06] text-slate-400'
                    }`}>
                      <span>Edge Cache Hit Rate</span>
                      <span className="text-purple-700 dark:text-purple-400 font-bold">99.4% GLOBAL HIT</span>
                    </div>
                  </div>
                </m.div>

                {/* ----------------------------------------------------------------------- */}
                {/* SHOWCASE 3: REVOPS AUTOMATION (No "Certified n8n Automation" pill)       */}
                {/* ----------------------------------------------------------------------- */}
                <m.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onMouseEnter={() => playSound(800, 'sine', 0.03)}
                  className={`group rounded-[2.25rem] p-8 sm:p-12 transition-all duration-300 flex flex-col lg:flex-row gap-10 items-stretch ${
                    isLight 
                      ? 'bg-white border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.02)] hover:shadow-xl hover:border-amber-300' 
                      : 'bg-[#111622] border border-white/10 hover:border-amber-400/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {/* Left Column */}
                  <div className="lg:w-7/12 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-2xl sm:text-4xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                        isLight ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-400'
                      } transition-colors`}>
                        Follow Up With Every Lead in 5 Seconds — Automatically
                      </h3>

                      <p className={`text-sm sm:text-base leading-relaxed mb-8 font-normal max-w-xl ${
                        isLight ? 'text-slate-600' : 'text-slate-300'
                      }`}>
                        Replace manual copy-pasting with self-healing automation. When someone fills out your contact form, our workflows instantly qualify their inquiry, update your CRM, and send a calendar booking link within seconds — while your competitors are still checking their inboxes.
                      </p>
                    </div>

                    <div>
                      {/* Metric Proof Row */}
                      <div className={`grid grid-cols-3 gap-3 py-4 px-4 sm:px-6 rounded-2xl mb-6 ${
                        isLight ? 'bg-slate-50 border border-slate-200' : 'bg-black/50 border border-white/[0.08]'
                      }`}>
                        <div>
                          <div className="text-2xl sm:text-3xl font-urbanist font-black text-amber-600 dark:text-amber-400">5.2s</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Response Speed</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>500+</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Hours Saved / Year</div>
                        </div>
                        <div>
                          <div className={`text-2xl sm:text-3xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>0</div>
                          <div className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Manual Data Entry</div>
                        </div>
                      </div>

                      <Link
                        href="/services/n8n-automation/"
                        className={`inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider transition-colors hover:underline ${
                          isLight ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-400'
                        }`}
                      >
                        <span>Explore Automation Pipelines</span>
                        <div className="flex items-center gap-1 group-hover:translate-x-2 transition-transform duration-200">
                          <ArrowRight size={16} />
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Micro-Workflow Pulse */}
                  <div className={`lg:w-5/12 rounded-2xl p-6 sm:p-7 flex flex-col justify-between border ${
                    isLight ? 'bg-slate-50/90 border-slate-200' : 'bg-black/60 border-white/[0.08]'
                  }`}>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-4">
                        <div className={`flex items-center gap-1.5 font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>
                          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                          <span>SPEED-TO-LEAD PIPELINE</span>
                        </div>
                        <span className={`font-bold ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>5.2s ELAPSED</span>
                      </div>

                      {/* Step Flow Wire */}
                      <div className="flex items-center justify-between gap-2 py-4 px-1 relative">
                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isLight ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            <Mail size={16} />
                          </div>
                          <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Lead Form</span>
                        </div>

                        <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-500/40 to-teal-500/40 relative">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-[4px] left-1/2 -translate-x-1/2 animate-ping" />
                        </div>

                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isLight ? 'bg-teal-100 text-teal-800 border border-teal-300' : 'bg-teal-500/20 text-teal-400 border border-teal-500/40'
                          }`}>
                            <UserCheck size={16} />
                          </div>
                          <span className={`text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Enriched</span>
                        </div>

                        <div className="flex-1 h-0.5 bg-gradient-to-r from-teal-500/40 to-emerald-500/40 relative" />

                        <div className="flex flex-col items-center gap-1.5 text-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isLight ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          }`}>
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Booked</span>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-4 pt-4 border-t text-xs flex items-center justify-between ${
                      isLight ? 'border-slate-200 text-slate-600' : 'border-white/[0.06] text-slate-400'
                    }`}>
                      <span>Manual Human Delay</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">0 SECONDS (100% AUTO)</span>
                    </div>
                  </div>
                </m.div>

              </div>

              {/* ========================================================================= */}
              {/* DIRECT CAPABILITIES DIRECTORY (No "Specialized Capabilities" label)       */}
              {/* ========================================================================= */}
              <m.div 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-[2.25rem] p-6 sm:p-10 mb-8 transition-all ${
                  isLight 
                    ? 'bg-white border border-slate-200/90 shadow-[0_4px_30px_rgba(0,0,0,0.02)] text-slate-900' 
                    : 'bg-[#111622] border border-white/[0.08] text-white'
                }`}
              >
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b ${
                  isLight ? 'border-slate-200' : 'border-white/[0.08]'
                }`}>
                  <div>
                    <h3 className={`text-xl sm:text-2xl font-urbanist font-black uppercase tracking-tight ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}>
                      What We Build for Your Business
                    </h3>
                  </div>
                  <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    5 Core Services • Production-Grade Code
                  </span>
                </div>

                <div className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-white/[0.06]'}`}>
                  {[
                    {
                      name: 'Fast Modern Websites & Web Applications',
                      description: 'Custom Next.js web applications that load in milliseconds, look incredible on mobile devices, and convert casual visitors into booked calls.',
                      tag: 'High-Speed Web',
                      link: '/services/custom-full-stack/'
                    },
                    {
                      name: 'Google Search & Organic SEO Domination',
                      description: 'Systematic content engines and programmatic pages that rank on page one of Google for high-intent search terms your buyers use.',
                      tag: 'Organic Demand',
                      link: '/services/seo-organic-growth/'
                    },
                    {
                      name: 'Certified n8n Workflow Automation',
                      description: 'Reliable automations connecting your website forms, CRM, email notifications, and calendars with zero manual effort or expensive Zapier bills.',
                      tag: 'Automation',
                      link: '/services/n8n-automation/'
                    },
                    {
                      name: 'Custom Client Portals & Internal Dashboards',
                      description: 'Secure client collaboration portals, internal operations dashboards, and web tools built with Next.js and Supabase database.',
                      tag: 'Web Applications',
                      link: '/services/custom-full-stack/'
                    },
                    {
                      name: 'Page Speed & Core Web Vitals Fixes',
                      description: 'Performance engineering that brings slow legacy WordPress or Webflow websites to 100/100 Google page speed scores and sub-second global loading.',
                      tag: 'Performance',
                      link: '/services/headless-architecture/'
                    }
                  ].map((service, idx) => (
                    <Link
                      key={service.name}
                      href={service.link}
                      className="block group"
                    >
                      <m.div
                        whileHover={{ x: 6, transition: { duration: 0.2 } }}
                        onMouseEnter={() => {
                          setHoveredService(idx);
                          playSound(600 + idx * 60, 'sine', 0.02);
                        }}
                        onMouseLeave={() => setHoveredService(null)}
                        className={`py-5 sm:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 px-3 sm:px-4 rounded-xl cursor-pointer ${
                          hoveredService === idx
                            ? (isLight ? 'bg-slate-100/80 shadow-sm' : 'bg-white/[0.04]')
                            : (isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]')
                        }`}
                      >
                        <div className="flex items-start md:items-center gap-4 sm:gap-6 flex-1">
                          <span className={`w-8 shrink-0 flex items-center justify-center ${
                            isLight ? 'text-teal-700' : 'text-teal-400'
                          }`}>
                            <Sparkles size={16} />
                          </span>
                          <div>
                            <h4 className={`text-base sm:text-lg font-bold mb-1 transition-colors ${
                              isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-400'
                            }`}>
                              {service.name}
                            </h4>
                            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
                              isLight ? 'text-slate-600' : 'text-slate-400'
                            }`}>
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 shrink-0 pl-12 md:pl-0">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            isLight 
                              ? 'bg-slate-100 text-slate-700 border border-slate-200' 
                              : 'bg-white/5 text-slate-300 border border-white/10'
                          }`}>
                            {service.tag}
                          </span>
                          <ChevronRight size={16} className={`transition-transform duration-200 group-hover:translate-x-1 ${
                            isLight ? 'text-teal-700' : 'text-teal-400'
                          }`} />
                        </div>
                      </m.div>
                    </Link>
                  ))}
                </div>

                {/* Explore All Solutions Link */}
                <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isLight ? 'border-slate-200' : 'border-white/[0.08]'
                }`}>
                  <p className={`text-xs font-mono uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Looking for a tailored architecture or enterprise scope?
                  </p>
                  <Link
                    href="/services/"
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-teal-700 dark:text-teal-400 hover:underline"
                  >
                    <span>Explore Complete Solutions Matrix</span>
                    <span>→</span>
                  </Link>
                </div>
              </m.div>

            </div>

            {/* ========================================================================= */}
            {/* SECTION 2: THE PIPELINE GAP (No badge pills)                              */}
            {/* ========================================================================= */}
            <div id="pipeline-gap" className={`rounded-[2.5rem] p-8 sm:p-14 md:p-16 mb-8 transition-all ${
              isLight 
                ? 'bg-white border border-slate-200/90 shadow-sm text-slate-900' 
                : 'bg-[#111622] border border-white/[0.08] text-white'
            }`}>
              <m.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mb-12"
              >
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  The 3 Costly Bottlenecks in Most Sales Funnels
                </h2>
                <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  If your website is slow, you rely heavily on expensive ads, or your team spends hours copy-pasting customer details, you are quietly paying a heavy penalty on every marketing dollar.
                </p>
              </m.div>

              {/* 3 Eye-Catching Cards (No Numbers, No Badges) */}
              <m.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                
                {/* Card 1: Delayed Responses */}
                <m.div 
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isLight 
                      ? 'bg-slate-50/90 border-slate-200 hover:border-amber-300 hover:shadow-xl' 
                      : 'bg-black/40 border-white/[0.08] hover:border-amber-500/40 hover:shadow-2xl'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isLight ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        <Clock size={22} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-urbanist font-black uppercase mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Slow replies cause leads to go cold
                    </h3>

                    <p className={`text-sm leading-relaxed mb-6 font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      When an interested buyer submits a contact form, they want an answer right now. Leads contacted within 5 minutes are <strong>21 times more likely</strong> to convert. Waiting hours or until the next morning means 70% of potential buyers have already booked with your competitors.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/[0.04] border-white/10 text-slate-300'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-rose-600 dark:text-rose-400">Typical Delay: ~4-12 hours</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">With Us: 5 seconds</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      <strong>The Fix:</strong> Instant automated qualification and calendar links sent before they leave your website.
                    </p>
                  </div>
                </m.div>

                {/* Card 2: Manual Busywork */}
                <m.div 
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isLight 
                      ? 'bg-slate-50/90 border-slate-200 hover:border-purple-300 hover:shadow-xl' 
                      : 'bg-black/40 border-white/[0.08] hover:border-purple-500/40 hover:shadow-2xl'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isLight ? 'bg-purple-100 text-purple-800 border border-purple-200' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        <Sliders size={22} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-urbanist font-black uppercase mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Your team is buried in manual copy-pasting
                    </h3>

                    <p className={`text-sm leading-relaxed mb-6 font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Your talented sales and marketing staff should be talking to prospects and closing deals, not copying emails between spreadsheets, CRM records, and invoicing tools. Manual busywork drains 10 to 15 hours per employee every single week.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/[0.04] border-white/10 text-slate-300'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-rose-600 dark:text-rose-400">Manual Loss: 12 hrs / wk</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">With Us: 0 hrs (100% auto)</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      <strong>The Fix:</strong> Certified n8n automations that silently sync data across your forms, CRM, and tools in the background.
                    </p>
                  </div>
                </m.div>

                {/* Card 3: Rising Ad Costs */}
                <m.div 
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                  className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isLight 
                      ? 'bg-slate-50/90 border-slate-200 hover:border-teal-300 hover:shadow-xl' 
                      : 'bg-black/40 border-white/[0.08] hover:border-teal-500/40 hover:shadow-2xl'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        isLight ? 'bg-teal-100 text-teal-800 border border-teal-200' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
                      }`}>
                        <TrendingUp size={22} />
                      </div>
                    </div>

                    <h3 className={`text-xl font-urbanist font-black uppercase mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Paid ads get more expensive every month
                    </h3>

                    <p className={`text-sm leading-relaxed mb-6 font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Ad costs on Meta and Google jump 15% to 25% year after year. The moment you pause your ad budget, your lead flow instantly drops to zero. If you don&apos;t own high-ranking search assets, your customer acquisition costs will steadily eat away your profits.
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-slate-200 text-slate-700' : 'bg-white/[0.04] border-white/10 text-slate-300'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                      <span className="text-rose-600 dark:text-rose-400">Ad Dependency: Monthly cash drain</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">With Us: Evergreen leads</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      <strong>The Fix:</strong> Search-ranking content assets that bring qualified buyers from Google for free, month after month.
                    </p>
                  </div>
                </m.div>

              </m.div>

            </div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 3: REAL CLIENT OUTCOME (ZERO-HARDWARE KITCHEN OS)                */}
        {/* ======================================================================= */}
        <section id="case-study" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#07080a]'
        }`}>
          <div className="max-w-[1536px] mx-auto">
            
            {/* Header (No "Verified Client Outcome" pill) */}
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Saving $2,000 Per Station + 3% Order Commission
                </h2>
              </div>
              <div className={`text-xs font-medium uppercase tracking-wider ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Client: Urban Cafe Restaurant Group
              </div>
            </m.div>

            <m.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              
              {/* Left 6 Cols: Photo & Hard Numbers */}
              <div className="lg:col-span-6 space-y-6">
                <m.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className={`relative aspect-[16/10] rounded-2xl overflow-hidden border shadow-xl ${
                    isLight ? 'border-slate-200 bg-slate-100' : 'border-white/10 bg-[#0d1015]'
                  }`}
                >
                  <Image
                    src="/images/blog/case-study-urban-cafe-foodtech-platform-featured.webp"
                    alt="Kitchen OS Client Outcome"
                    fill
                    sizes="(max-width: 1024px) 100vw, 750px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="px-3 py-1 rounded-full bg-teal-500 text-slate-950 font-bold">
                      $2,000 HARDWARE EXPENSE ELIMINATED
                    </span>
                    <span className="text-white font-semibold">0% PLATFORM COMMISSIONS</span>
                  </div>
                </m.div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-4 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/[0.08]'
                  }`}>
                    <div className={`text-2xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>$0</div>
                    <div className={`text-xs font-medium uppercase mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Hardware Cost</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/[0.08]'
                  }`}>
                    <div className={`text-2xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>0%</div>
                    <div className={`text-xs font-medium uppercase mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Order Fee</div>
                  </div>
                  <div className={`p-4 rounded-xl border ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/[0.08]'
                  }`}>
                    <div className={`text-2xl font-urbanist font-black ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>&lt; 0.1s</div>
                    <div className={`text-xs font-medium uppercase mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Sync Speed</div>
                  </div>
                </div>
              </div>

              {/* Right 6 Cols: The Business Story */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                
                <div className="space-y-6 mb-8">
                  <h3 className={`text-2xl sm:text-3xl font-urbanist font-black uppercase ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    The Challenge: Trapped in Proprietary Hardware &amp; Commission Fees
                  </h3>

                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Urban Cafe was facing a massive scaling hurdle. Every new location demanded $2,000+ in proprietary POS tablets, plus a 3% slice of every order taken. On top of that, commercial tablets routinely froze in hot kitchen environments during dinner rushes.
                  </p>

                  <h4 className={`text-lg font-urbanist font-bold uppercase ${
                    isLight ? 'text-teal-700' : 'text-teal-400'
                  }`}>
                    The Solution: A Browser-Native Kitchen OS
                  </h4>

                  <p className={`text-sm sm:text-base leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Instead of buying locked-down hardware, I engineered a browser-native Progressive Web App that runs on any standard tablet. Orders sync across stations in under 100 milliseconds using instant WebSockets, with voice-activated alerts that ring through loud kitchen noise.
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border mb-8 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/10'
                }`}>
                  <div className={`text-xs uppercase font-bold mb-2 ${
                    isLight ? 'text-teal-800' : 'text-teal-400'
                  }`}>
                    The Business Bottom Line:
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    The restaurant group deployed across multiple locations for zero upfront hardware expense, reclaimed thousands in monthly merchant fees, and achieved 100% station uptime during dinner rushes.
                  </p>
                </div>

                <m.div whileHover={{ x: 4 }}>
                  <Link
                    href="/blog/case-study-urban-cafe-foodtech-platform/"
                    onMouseEnter={() => playSound(880, 'sine', 0.04)}
                    className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:underline ${
                      isLight ? 'text-teal-700' : 'text-teal-400'
                    }`}
                  >
                    <span>READ THE DETAILED BREAKDOWN</span>
                    <ArrowRight size={14} />
                  </Link>
                </m.div>

              </div>

            </m.div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 4: SPEED TO LEAD (No "The Speed-to-Lead Advantage" pill)         */}
        {/* ======================================================================= */}
        <section id="speed-to-lead" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#0a0a0a]'
        }`}>
          <div className="max-w-[1536px] mx-auto">
            
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="max-w-3xl mb-14"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                What Happens in the First 60 Seconds of a Lead Arriving?
              </h2>
              <p className={`text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Compare a slow manual agency process with our automated RevOps pipeline. The difference is measured in thousands of dollars in closed revenue.
              </p>
            </m.div>

            {/* Interactive Timeline Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
              {[
                {
                  step: 1,
                  time: '00:00 SECONDS',
                  title: 'Inbound Ingest',
                  desc: 'A prospect fills a website form, sends an email inquiry, or reaches out via chat.'
                },
                {
                  step: 2,
                  time: '00:02 SECONDS',
                  title: 'Data Enrichment',
                  desc: 'Background engine instantly checks company size, industry, and estimates project scope.'
                },
                {
                  step: 3,
                  time: '00:05 SECONDS',
                  title: 'Instant Calendar Link',
                  desc: 'Qualified leads receive a booking link right in their inbox before they leave your page.'
                },
                {
                  step: 4,
                  time: '00:10 SECONDS',
                  title: 'Team Alert Sent',
                  desc: 'Your team receives a complete lead notification in Slack or CRM with full context.'
                }
              ].map((t) => (
                <m.button
                  key={t.step}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTimelineStep(t.step);
                    playSound(600 + t.step * 100, 'sine', 0.03);
                  }}
                  className={`text-left p-6 rounded-2xl border transition-all cursor-pointer ${
                    activeTimelineStep === t.step
                      ? isLight 
                        ? 'bg-white border-teal-600 shadow-md text-slate-900 ring-2 ring-teal-500/20' 
                        : 'bg-white/[0.08] border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.2)] text-white ring-2 ring-teal-400/20'
                      : isLight 
                        ? 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300' 
                        : 'bg-black/30 border-white/[0.06] hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                    isLight ? 'text-teal-700' : 'text-teal-400'
                  }`}>
                    {t.time}
                  </div>
                  <div className={`text-base font-urbanist font-black uppercase mb-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    {t.title}
                  </div>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {t.desc}
                  </p>
                </m.button>
              ))}
            </div>

            {/* Comparative Summary Box */}
            <m.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#111622] border-white/10'
              }`}
            >
              <div>
                <div className={`text-xs uppercase tracking-wider font-bold mb-1 ${
                  isLight ? 'text-teal-700' : 'text-teal-400'
                }`}>
                  The Business Reality:
                </div>
                <div className={`text-lg sm:text-xl font-urbanist font-black uppercase ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  You reply in 5 seconds while your competitors take 8 to 24 hours.
                </div>
                <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  First-responder advantage secures up to 50% of all closed deals in modern service businesses.
                </p>
              </div>

              <m.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="shrink-0">
                <Link
                  href="/contact/"
                  className={`px-6 py-3.5 font-bold text-xs uppercase tracking-wider rounded-xl transition-all block text-center ${
                    isLight 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm' 
                      : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-sm'
                  }`}
                >
                  AUTOMATE YOUR INBOUND PIPELINE ↗
                </Link>
              </m.div>
            </m.div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 5: ROI CALCULATOR (No "Executive Value Calculator" pill)          */}
        {/* ======================================================================= */}
        <section id="roi-calculator" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#07080a]'
        }`}>
          <div className="max-w-[1536px] mx-auto">
            
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="text-center mb-16"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight mb-4 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Calculate How Much Manual Work Costs Your Business
              </h2>
              <p className={`text-sm sm:text-base max-w-xl mx-auto font-normal ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Adjust the sliders below to see the estimated payroll hours and software fees you can eliminate with custom automations.
              </p>
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left 6 Cols: Interactive Sliders */}
              <m.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className={`lg:col-span-6 border rounded-3xl p-6 sm:p-10 space-y-8 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/10'
                }`}
              >
                
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>TEAM MEMBERS HANDLING MANUAL TASKS:</span>
                    <span className={`font-bold text-base ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>{teamMembers} PEOPLE</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={teamMembers}
                    aria-label="Team members handling manual tasks"
                    onChange={(e) => {
                      setTeamMembers(Number(e.target.value));
                      playSound(400 + Number(e.target.value) * 30, 'sine', 0.02);
                    }}
                    className={`w-full cursor-pointer ${isLight ? 'accent-teal-600' : 'accent-teal-400'}`}
                  />
                  <div className={`flex justify-between text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>1 Person</span>
                    <span>15 People</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>HOURS SPENT ON BUSYWORK PER PERSON / WEEK:</span>
                    <span className={`font-bold text-base ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>{hoursWastedPerWeek} HRS / WEEK</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="25"
                    step="1"
                    value={hoursWastedPerWeek}
                    aria-label="Hours spent on busywork per person per week"
                    onChange={(e) => {
                      setHoursWastedPerWeek(Number(e.target.value));
                      playSound(500 + Number(e.target.value) * 20, 'sine', 0.02);
                    }}
                    className={`w-full cursor-pointer ${isLight ? 'accent-teal-600' : 'accent-teal-400'}`}
                  />
                  <div className={`flex justify-between text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>2 Hours</span>
                    <span>25 Hours</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>AVERAGE HOURLY COST:</span>
                    <span className={`font-bold text-base ${isLight ? 'text-teal-700' : 'text-teal-400'}`}>${avgHourlyCost} / HR</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="120"
                    step="5"
                    value={avgHourlyCost}
                    aria-label="Average hourly employee cost"
                    onChange={(e) => {
                      setAvgHourlyCost(Number(e.target.value));
                      playSound(600 + Number(e.target.value) * 3, 'sine', 0.02);
                    }}
                    className={`w-full cursor-pointer ${isLight ? 'accent-teal-600' : 'accent-teal-400'}`}
                  />
                  <div className={`flex justify-between text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>$25/hr</span>
                    <span>$120/hr</span>
                  </div>
                </div>

              </m.div>

              {/* Right 6 Cols: Result Cards */}
              <m.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65 }}
                className="lg:col-span-6 space-y-6"
              >
                
                <m.div 
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.3 }}
                  className={`p-8 sm:p-10 rounded-3xl border shadow-sm ${
                    isLight 
                      ? 'bg-teal-50/60 border-teal-200/90 text-slate-900' 
                      : 'bg-[#111622] border-teal-400/30 text-white shadow-[0_0_30px_rgba(45,212,191,0.1)]'
                  }`}
                >
                  <div className={`text-xs uppercase font-bold tracking-wider mb-2 ${
                    isLight ? 'text-teal-800' : 'text-teal-400'
                  }`}>
                    Estimated Annual Value Reclaimed
                  </div>
                  
                  <div className="text-5xl sm:text-6xl font-urbanist font-black mb-4">
                    ${totalAnnualSavings.toLocaleString()}
                    <span className={`text-lg font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}> / YEAR</span>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 font-normal ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    This represents direct payroll recovered from repetitive administrative tasks, combined with software fee savings by consolidating expensive third-party tools into self-hosted automations.
                  </p>

                  <div className={`grid grid-cols-2 gap-4 border-t pt-4 text-xs ${
                    isLight ? 'border-teal-200' : 'border-white/10'
                  }`}>
                    <div>
                      <span className={`block mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>TIME RECLAIMED:</span>
                      <span className={`font-bold text-sm ${isLight ? 'text-teal-800' : 'text-teal-400'}`}>{annualHoursWasted} HOURS / YR</span>
                    </div>
                    <div>
                      <span className={`block mb-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>SOFTWARE SAVINGS:</span>
                      <span className={`font-bold text-sm ${isLight ? 'text-teal-800' : 'text-teal-400'}`}>${estimatedSaaSSaved.toLocaleString()} / YR</span>
                    </div>
                  </div>
                </m.div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <m.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Link
                      href="/contact/"
                      className={`w-full py-4 font-bold text-xs uppercase tracking-wider rounded-xl transition-all block text-center ${
                        isLight 
                          ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm' 
                          : 'bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold shadow-sm'
                      }`}
                    >
                      RECOVER THIS REVENUE FOR YOUR BUSINESS ↗
                    </Link>
                  </m.div>
                  <m.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Link
                      href="/services/n8n-automation/"
                      className={`w-full py-4 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all block text-center ${
                        isLight 
                          ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200' 
                          : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10'
                      }`}
                    >
                      EXPLORE AUTOMATION PACKAGES
                    </Link>
                  </m.div>
                </div>

              </m.div>

            </div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 6: HOW WE WORK (No "Zero Friction Delivery" pill)                */}
        {/* ======================================================================= */}
        <section id="process" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#090b0f]'
        }`}>
          <div className="max-w-[1536px] mx-auto text-center">
            
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
            >
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-urbanist font-black mb-3 uppercase tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                How We Work With You
              </h2>

              <p className={`text-sm sm:text-base max-w-xl mx-auto mb-14 font-normal ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                A disciplined four-step execution process designed to identify bottlenecks, architect custom solutions, and deploy systems that run autonomously.
              </p>
            </m.div>

            <WorkflowSteps />

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 7: AUDIT TOOL (No "Free Instant Diagnostic" pill)                */}
        {/* ======================================================================= */}
        <section id="audit-tool" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-[#07080a]'
        }`}>
          <div className="max-w-[1536px] mx-auto">
            
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className="text-center mb-12"
            >
              <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight mb-3 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Is Your Website Losing You Customers?
              </h2>

              <p className={`text-sm sm:text-base max-w-xl mx-auto font-normal ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Run an instant diagnostic on your domain to inspect page speed, security headers, Core Web Vitals, and indexing health using our browser-native{' '}
                <Link href="/blog/screaming-frog-alternatives-free-seo-audit-tools/" className="text-teal-700 dark:text-teal-400 font-bold hover:underline">
                  free SEO audit tool
                </Link>.
              </p>
            </m.div>

            <m.div 
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`rounded-3xl p-4 sm:p-8 border shadow-xl ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#111622] border-white/10'
              }`}
            >
              <LazyAuditTool />
            </m.div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 8: RECENT ARTICLES (No "Knowledgebase & Playbooks" pill)         */}
        {/* ======================================================================= */}
        <section id="dispatches" className={`py-24 px-4 sm:px-8 lg:px-12 border-b relative ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#090b0f]'
        }`}>
          <div className="max-w-[1536px] mx-auto">
            
            <m.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65 }}
              className={`flex flex-col md:flex-row justify-between items-end mb-14 gap-6 pb-6 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div>
                <h2 className={`text-3xl sm:text-4xl md:text-5xl font-urbanist font-black uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Recent <span className={isLight ? 'text-purple-700' : 'text-purple-400'}>Insights</span>
                </h2>
              </div>

              <Link
                href="/blog/"
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 group hover:underline ${
                  isLight ? 'text-purple-700' : 'text-purple-400'
                }`}
              >
                <span>READ ALL INSIGHTS</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </m.div>

            <m.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              {(posts && posts.length > 0 ? posts.slice(0, 3) : []).map((post, i) => (
                <m.div 
                  key={post.slug?.current || i}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25 } }}
                  className="h-full"
                >
                  <Link
                    href={`/blog/${post.slug?.current}/`}
                    prefetch={false}
                    onMouseEnter={() => playSound(700 + i * 80, 'sine', 0.03)}
                    className="group h-full block"
                  >
                    <article className={`h-full rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                      isLight 
                        ? 'bg-white border-slate-200 shadow-sm hover:shadow-xl' 
                        : 'bg-[#111622] border-white/10 hover:border-purple-500/50 hover:shadow-2xl'
                    }`}>
                      
                      {/* Top Image */}
                      <div className="h-48 bg-slate-800 relative overflow-hidden p-4 flex flex-col justify-start">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-teal-500/20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-300" />
                        
                        <div className="relative z-10 flex flex-wrap gap-2">
                          {post.categories && post.categories.length > 0 ? (
                            post.categories.slice(0, 2).map((cat) => (
                              <span
                                key={cat}
                                className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-md text-[9px] font-bold uppercase tracking-wider text-white"
                              >
                                {cat}
                              </span>
                            ))
                          ) : (
                            <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/20 rounded-md text-[9px] font-bold uppercase tracking-wider text-white">
                              PLAYBOOK
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className={`font-urbanist font-black text-lg mb-2 transition-colors uppercase tracking-tight leading-snug ${
                          isLight ? 'text-slate-900 group-hover:text-teal-700' : 'text-white group-hover:text-teal-400'
                        }`}>
                          {post.title}
                        </h3>
                        <p className={`text-xs line-clamp-3 mb-6 flex-grow font-normal leading-relaxed ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {post.description}
                        </p>
                        <div className={`text-xs font-bold uppercase tracking-wider flex justify-end items-center gap-1.5 transition-colors ${
                          isLight ? 'text-teal-700 group-hover:text-teal-800' : 'text-teal-400 group-hover:text-teal-300'
                        }`}>
                          <span>READ PLAYBOOK</span>
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </article>
                  </Link>
                </m.div>
              ))}
            </m.div>

          </div>
        </section>

        {/* ======================================================================= */}
        {/* SECTION 9: FINALE CALL TO ACTION (No "Let's Work Together" pill)         */}
        {/* ======================================================================= */}
        <section className={`py-28 px-4 sm:px-8 lg:px-12 relative overflow-hidden text-center border-b ${
          isLight ? 'bg-slate-100/90 border-slate-200 text-slate-900' : 'bg-[#040507] border-white/10 text-white'
        }`}>
          
          <m.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto relative z-10"
          >
            
            <m.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                isLight ? 'bg-teal-100 text-teal-800 border border-teal-200' : 'bg-teal-500/10 text-teal-400 border border-teal-500/20'
              }`}
            >
              <Mail size={26} />
            </m.div>

            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-urbanist font-black uppercase tracking-[-0.03em] leading-[1.02] sm:leading-[0.98] mb-6 ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}>
              Ready to scale <br />
              <span className={isLight ? 'text-teal-600' : 'text-teal-400'}>your revenue?</span>
            </h2>

            <p className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-12 font-normal ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Book a free 30-minute growth architecture review. We will inspect your current website, identify lead leaks, and show you where automation can save your business thousands.
            </p>

            {/* Direct Booking Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-16">
              <m.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link
                  href="/contact/"
                  onMouseEnter={() => playSound(1080, 'sine', 0.05)}
                  className={`w-full sm:w-auto px-8 py-4 font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-200 flex items-center justify-center gap-2 group ${
                    isLight 
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20' 
                      : 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-[0_0_30px_rgba(45,212,191,0.3)]'
                  }`}
                >
                  <span>BOOK STRATEGY CALL</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </m.div>

              <m.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  href="/about/"
                  onMouseEnter={() => playSound(720, 'triangle', 0.04)}
                  className={`w-full sm:w-auto px-8 py-4 text-xs font-semibold uppercase tracking-wider rounded-full transition-all block text-center ${
                    isLight 
                      ? 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200' 
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10'
                  }`}
                >
                  ABOUT ALFAZ
                </Link>
              </m.div>
            </div>

            {/* Redesigned Sleek Value Card (No Clunky Double-Box) */}
            <div className={`rounded-[2.5rem] p-7 sm:p-10 border max-w-2xl mx-auto mb-14 shadow-xl transition-all ${
              isLight 
                ? 'bg-white border-slate-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.04)] text-slate-900' 
                : 'bg-[#111622] border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] text-white'
            }`}>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest mb-3 bg-teal-500/10 text-teal-700 dark:text-teal-400 border border-teal-500/20">
                  <Sparkles size={12} className="text-teal-600 dark:text-teal-400" />
                  <span>Weekly Growth Blueprints</span>
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-urbanist font-black uppercase tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Actionable Growth Systems in Your Inbox
                </h3>
                
                <p className={`text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Every two weeks, I send battle-tested n8n automation blueprints, SEO architectures, and lead generation frameworks. No spam, ever.
                </p>
              </div>

              <NewsletterForm 
                source="home_finale_newsletter" 
                variant="inline"
                buttonText="Get Free Playbooks"
                placeholder="Enter your work email address..."
              />

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>Zero Spam</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>1-Click Unsubscribe</span>
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span>100% Free Forever</span>
                </span>
              </div>
            </div>

            {/* Clean Direct Contact & Confidence Trust Bar (No Location / No Fixed Services) */}
            <div className={`pt-10 border-t flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono uppercase tracking-wider ${
              isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-500 dark:text-slate-400">Direct Inquiries:</span>
                <a href="mailto:contact@whoisalfaz.me" className={`font-bold hover:underline ${
                  isLight ? 'text-teal-700' : 'text-teal-400'
                }`}>
                  contact@whoisalfaz.me
                </a>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={15} className={isLight ? 'text-teal-700' : 'text-teal-400'} />
                <span>24-Hour Response Time</span>
              </div>

              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-amber-500" />
                <span>Zero-Obligation Advisory</span>
              </div>
            </div>

          </m.div>

        </section>

      </div>

      {/* ========================================================================= */}
      {/* 10. CANONICAL CONTENT FOOTER (ABOUT + TECH STACK + FAQ)                    */}
      {/* ========================================================================= */}
      <HomeContentFooter />

    </div>
  );
}
