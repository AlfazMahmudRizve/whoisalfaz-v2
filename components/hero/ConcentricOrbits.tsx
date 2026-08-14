'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCountUp } from './useCountUp';
import { 
  Zap, 
  Workflow, 
  Bot, 
  Code2, 
  Database, 
  Target, 
  Sparkles,
  Activity,
  Layers,
  Cpu
} from 'lucide-react';

export interface OrbitNodeConfig {
  id: string;
  name: string;
  role: string;
  orbit: 1 | 2 | 3 | 4;
  angle: number; // in degrees
  radius: number; // in pixels (relative to 600px canvas)
  size: number; // in pixels
  shape: 'circle' | 'square-2xl' | 'square-3xl';
  glowColor: string;
  borderColor: string;
  imageUrl?: string;
  customSvgPath?: string;
  icon?: React.ReactNode;
  tag?: string;
  iconColor: string;
}

export interface ConcentricOrbitsProps {
  /** Target number to count up to (default: 30) */
  targetCount?: number;
  /** Suffix following the count (default: "+") */
  countSuffix?: string;
  /** Main label under the count (default: "Systems Deployed") */
  centerLabel?: string;
  /** Sub-badge at the top of the center card (default: "AUTONOMOUS REVOPS") */
  centerBadge?: string;
  /** Optional custom CSS classes for the outer wrapper */
  className?: string;
}

// 9 Precision-Engineered Specialist Nodes (scaled proportionally for butter-smooth 60/120fps motion)
const DEFAULT_NODES: OrbitNodeConfig[] = [
  // Orbit 1 (Radius 135px)
  {
    id: 'alfaz-revops',
    name: 'Alfaz Mahmud Rizve',
    role: 'RevOps Architect',
    orbit: 1,
    angle: 270,
    radius: 135,
    size: 52,
    shape: 'square-2xl',
    glowColor: 'rgba(160, 104, 255, 0.4)',
    borderColor: 'rgba(160, 104, 255, 0.6)',
    imageUrl: '/profile.webp',
    iconColor: '#A068FF',
    tag: 'Lead Architect',
  },
  // Orbit 2 (Radius 190px)
  {
    id: 'n8n-specialist',
    name: 'n8n Automation',
    role: 'Autonomous Workflows',
    orbit: 2,
    angle: 60,
    radius: 190,
    size: 48,
    shape: 'circle',
    glowColor: 'rgba(234, 75, 113, 0.4)',
    borderColor: 'rgba(234, 75, 113, 0.6)',
    customSvgPath: 'M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263',
    iconColor: '#EA4B71',
    tag: 'Self-Healing',
  },
  {
    id: 'ai-agent',
    name: 'AI Agent Swarm',
    role: 'Autonomous LLM Ops',
    orbit: 2,
    angle: 180,
    radius: 190,
    size: 56,
    shape: 'square-3xl',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    borderColor: 'rgba(244, 63, 94, 0.6)',
    icon: <Bot className="w-6 h-6 text-rose-500" />,
    iconColor: '#F43F5E',
    tag: 'Claude & OpenAI',
  },
  {
    id: 'nextjs-infra',
    name: 'Next.js 16 Edge',
    role: 'Sub-Second Frontend',
    orbit: 2,
    angle: 300,
    radius: 190,
    size: 48,
    shape: 'square-2xl',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderColor: 'rgba(56, 189, 248, 0.6)',
    customSvgPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.277 17.656L9.623 6.969H7.692v10.062h1.692V10.15l7.07 8.916a10.33 10.33 0 0 0 1.823-1.41zM14.615 6.969h1.693v6.308l-1.693-2.154V6.969z',
    iconColor: '#38BDF8',
    tag: '100/100 Core Web Vitals',
  },
  // Orbit 3 (Radius 245px)
  {
    id: 'supabase-db',
    name: 'Supabase pgvector',
    role: 'Realtime Data Engine',
    orbit: 3,
    angle: 130,
    radius: 245,
    size: 56,
    shape: 'square-3xl',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    borderColor: 'rgba(16, 185, 129, 0.6)',
    customSvgPath: 'M21.362 9.354H12V.304a.6.6 0 0 0-1.026-.424L.194 10.702a.6.6 0 0 0 .426 1.024H10v9.05a.6.6 0 0 0 1.026.424l10.78-10.822a.6.6 0 0 0-.444-1.024z',
    iconColor: '#10B981',
    tag: 'Vector & Relational',
  },
  {
    id: 'apollo-leadops',
    name: 'Apollo.io Engine',
    role: 'B2B Lead Intelligence',
    orbit: 3,
    angle: 310,
    radius: 245,
    size: 48,
    shape: 'circle',
    glowColor: 'rgba(160, 104, 255, 0.4)',
    borderColor: 'rgba(160, 104, 255, 0.6)',
    customSvgPath: 'M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z',
    iconColor: '#A068FF',
    tag: 'Enrichment',
  },
  // Orbit 4 (Radius 295px)
  {
    id: 'hubspot-sync',
    name: 'HubSpot CRM',
    role: 'Automated CRM Pipeline',
    orbit: 4,
    angle: 30,
    radius: 295,
    size: 46,
    shape: 'circle',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    borderColor: 'rgba(249, 115, 22, 0.6)',
    customSvgPath: 'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
    iconColor: '#F97316',
    tag: 'Live Sync',
  },
  {
    id: 'pinecone-vectordb',
    name: 'Pinecone Serverless',
    role: 'Vector Knowledge Base',
    orbit: 4,
    angle: 95,
    radius: 295,
    size: 56,
    shape: 'square-3xl',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    borderColor: 'rgba(99, 102, 241, 0.6)',
    customSvgPath: 'M15.42 1.48a.47.47 0 0 0-.84 0L12 6.57 9.42 1.48a.47.47 0 0 0-.84 0L.11 19.38a.47.47 0 0 0 .42.62H23.47a.47.47 0 0 0 .42-.62L15.42 1.48zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    iconColor: '#6366F1',
    tag: 'Vector RAG',
  },
  {
    id: 'brevo-pipeline',
    name: 'Brevo Engine',
    role: 'Transactional Messaging',
    orbit: 4,
    angle: 220,
    radius: 295,
    size: 54,
    shape: 'square-3xl',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    borderColor: 'rgba(6, 182, 212, 0.6)',
    customSvgPath: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z',
    iconColor: '#06B6D4',
    tag: 'Pipeline',
  },
];

/**
 * Lightweight, GPU-Accelerated Node Card
 */
function OrbitNodeCard({
  node,
  counterAnimationClass,
}: {
  node: OrbitNodeConfig;
  counterAnimationClass: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const getShapeClass = () => {
    switch (node.shape) {
      case 'circle':
        return 'rounded-full';
      case 'square-3xl':
        return 'rounded-2xl';
      case 'square-2xl':
      default:
        return 'rounded-xl';
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 pointer-events-auto"
      style={{
        transform: `translate3d(-50%, -50%, 0) rotate(${node.angle}deg) translate(${node.radius}px) rotate(-${node.angle}deg)`,
      }}
    >
      <div className={counterAnimationClass}>
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Card Body: Solid / Lightweight GPU Surface */}
          <div
            className={`relative ${getShapeClass()} overflow-hidden border bg-white dark:bg-[#0c0728] flex items-center justify-center shadow-md dark:shadow-xl transition-transform duration-200 group-hover:scale-110`}
            style={{
              width: `${node.size}px`,
              height: `${node.size}px`,
              borderColor: node.borderColor,
              boxShadow: `0 4px 14px ${node.glowColor}`,
            }}
          >
            {node.imageUrl ? (
              <div className="relative w-full h-full p-0.5">
                <Image
                  src={node.imageUrl}
                  alt={node.name}
                  fill
                  sizes="60px"
                  className="object-cover object-center rounded-xl"
                  priority
                />
              </div>
            ) : node.customSvgPath ? (
              <div className="w-full h-full flex items-center justify-center p-2.5">
                <svg
                  viewBox="0 0 24 24"
                  className="w-full h-full fill-current transition-transform duration-200 group-hover:scale-105"
                  style={{ color: node.iconColor }}
                >
                  <path d={node.customSvgPath} />
                </svg>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-2">
                {node.icon || <Sparkles className="w-5 h-5 text-teal-400" />}
              </div>
            )}

            {/* Status Dot */}
            <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 border border-white dark:border-slate-950" />
          </div>

          {/* Lightweight Hover Tooltip */}
          {isHovered && (
            <div 
              className="absolute left-1/2 -top-14 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold border border-slate-700 shadow-xl"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span>{node.name}</span>
              </div>
              <p className="text-[9px] text-slate-400 font-normal">{node.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 60fps GPU-Accelerated Concentric Orbits
 */
export function ConcentricOrbits({
  targetCount = 30,
  countSuffix = '+',
  centerLabel = 'Systems Deployed',
  centerBadge = 'AUTONOMOUS REVOPS',
  className = '',
}: ConcentricOrbitsProps) {
  const { count } = useCountUp({
    target: targetCount,
    duration: 1500,
    startDelay: 200,
    autoStart: true,
  });

  return (
    <div 
      className={`relative w-full max-w-[580px] aspect-square flex items-center justify-center select-none ${className}`}
      style={{
        contain: 'layout size paint',
      }}
    >
      {/* Precision Static SVG Orbit Tracks (Zero GPU Shader Cost) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 dark:opacity-40" 
        viewBox="0 0 600 600" 
        fill="none"
      >
        <circle cx="300" cy="300" r="135" stroke="rgba(45, 212, 191, 0.4)" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="300" cy="300" r="190" stroke="rgba(160, 104, 255, 0.35)" strokeWidth="1.2" />
        <circle cx="300" cy="300" r="245" stroke="rgba(45, 212, 191, 0.3)" strokeWidth="1.2" strokeDasharray="6 6" />
        <circle cx="300" cy="300" r="295" stroke="rgba(160, 104, 255, 0.25)" strokeWidth="1.2" />
      </svg>

      {/* Orbit 4: 590px, CCW 60s */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[590px] h-[590px] rounded-full orbit-spin-ccw-60 pointer-events-none">
          {DEFAULT_NODES.filter((n) => n.orbit === 4).map((node) => (
            <OrbitNodeCard key={node.id} node={node} counterAnimationClass="orbit-spin-cw-60" />
          ))}
        </div>
      </div>

      {/* Orbit 3: 490px, CW 50s */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[490px] h-[490px] rounded-full orbit-spin-cw-50 pointer-events-none">
          {DEFAULT_NODES.filter((n) => n.orbit === 3).map((node) => (
            <OrbitNodeCard key={node.id} node={node} counterAnimationClass="orbit-spin-ccw-50" />
          ))}
        </div>
      </div>

      {/* Orbit 2: 380px, CW 40s */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[380px] h-[380px] rounded-full orbit-spin-cw-40 pointer-events-none">
          {DEFAULT_NODES.filter((n) => n.orbit === 2).map((node) => (
            <OrbitNodeCard key={node.id} node={node} counterAnimationClass="orbit-spin-ccw-40" />
          ))}
        </div>
      </div>

      {/* Orbit 1: 270px, CCW 30s + Center Card */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[270px] h-[270px] rounded-full orbit-spin-ccw-30 pointer-events-none">
          {DEFAULT_NODES.filter((n) => n.orbit === 1).map((node) => (
            <OrbitNodeCard key={node.id} node={node} counterAnimationClass="orbit-spin-cw-30" />
          ))}

          {/* Upright Center Live Metric Card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
            <div className="orbit-spin-cw-30">
              <div 
                className="w-[160px] h-[160px] sm:w-[175px] sm:h-[175px] rounded-3xl p-4 flex flex-col items-center justify-between text-center bg-white dark:bg-[#0A0520] border border-slate-200 dark:border-white/15 shadow-xl transition-transform duration-200 hover:scale-105"
              >
                {/* Header */}
                <div className="w-full flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-[8px] sm:text-[9px] font-mono font-black text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                      {centerBadge}
                    </span>
                  </div>
                  <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                </div>

                {/* Count */}
                <div className="my-auto flex flex-col items-center justify-center">
                  <div className="flex items-baseline justify-center">
                    <span className="font-urbanist font-black text-[42px] sm:text-[46px] leading-none tracking-tighter text-slate-900 dark:text-white">
                      {count}
                    </span>
                    <span className="font-urbanist font-black text-[26px] sm:text-[30px] leading-none text-teal-600 dark:text-teal-400 ml-0.5">
                      {countSuffix}
                    </span>
                  </div>
                  <span className="font-urbanist text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">
                    {centerLabel}
                  </span>
                </div>

                {/* Bottom Badge */}
                <div className="w-full pt-1.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-center">
                  <span className="text-[8px] sm:text-[9px] font-mono text-teal-600 dark:text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                    PRODUCTION READY
                  </span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default ConcentricOrbits;
