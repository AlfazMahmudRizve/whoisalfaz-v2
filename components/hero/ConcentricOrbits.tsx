'use client';

import React, { useState, useId } from 'react';
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
  radius: number; // in pixels
  size: number; // in pixels
  shape: 'circle' | 'square-2xl' | 'square-3xl';
  glowColor: string;
  borderColor: string;
  flyInDelay: number; // in seconds
  imageUrl?: string;
  customSvgPath?: string;
  icon?: React.ReactNode;
  tag?: string;
  bgGradient: string;
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
  /** Duration of count animation in ms (default: 2000) */
  countDuration?: number;
  /** Delay before count starts in ms (default: 1200) */
  countDelay?: number;
  /** Optional custom CSS classes for the outer wrapper */
  className?: string;
  /** Custom nodes to display, or uses default 9 specialist nodes */
  customNodes?: OrbitNodeConfig[];
  /** Allow pausing orbit rotations on hover (default: true) */
  pauseOnHover?: boolean;
}

// 9 Designated Avatars & Specialist Nodes with crisp embedded SVGs & local profile image
const DEFAULT_NODES: OrbitNodeConfig[] = [
  // 1. Orbit 1, 270deg, 176.5px radius, square rounded-2xl (Alfaz / RevOps avatar with purple glow)
  {
    id: 'alfaz-revops',
    name: 'Alfaz Mahmud Rizve',
    role: 'RevOps Architect',
    orbit: 1,
    angle: 270,
    radius: 176.5,
    size: 64,
    shape: 'square-2xl',
    glowColor: 'rgba(160, 104, 255, 0.75)',
    borderColor: 'rgba(160, 104, 255, 0.7)',
    flyInDelay: 0.6,
    imageUrl: '/profile.webp',
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    tag: 'Lead Architect',
    bgGradient: 'from-purple-900/60 to-purple-950/90',
  },
  // 2. Orbit 2, 60deg, 250.5px radius, round (n8n node / specialist with coral/teal glow)
  {
    id: 'n8n-specialist',
    name: 'n8n Automation',
    role: 'Autonomous Workflows',
    orbit: 2,
    angle: 60,
    radius: 250.5,
    size: 62,
    shape: 'circle',
    glowColor: 'rgba(234, 75, 113, 0.75)',
    borderColor: 'rgba(234, 75, 113, 0.7)',
    flyInDelay: 0.8,
    customSvgPath: 'M21.4737 5.6842c-1.1772 0-2.1663.8051-2.4468 1.8947h-2.8955c-1.235 0-2.289.893-2.492 2.111l-.1038.623a1.263 1.263 0 0 1-1.246 1.0555H11.289c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947s-2.1663.8051-2.4467 1.8947H4.973c-.2805-1.0896-1.2696-1.8947-2.4468-1.8947C1.1311 9.4737 0 10.6047 0 12s1.131 2.5263 2.5263 2.5263c1.1772 0 2.1663-.8051 2.4468-1.8947h1.4223c.2804 1.0896 1.2696 1.8947 2.4467 1.8947 1.1772 0 2.1663-.8051 2.4468-1.8947h1.0008a1.263 1.263 0 0 1 1.2459 1.0555l.1038.623c.203 1.218 1.257 2.111 2.492 2.111h.3692c.2804 1.0895 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263c-1.1772 0-2.1664.805-2.4468 1.8947h-.3692a1.263 1.263 0 0 1-1.246-1.0555l-.1037-.623A2.52 2.52 0 0 0 13.9607 12a2.52 2.52 0 0 0 .821-1.4794l.1038-.623a1.263 1.263 0 0 1 1.2459-1.0555h2.8955c.2805 1.0896 1.2696 1.8947 2.4468 1.8947 1.3952 0 2.5263-1.131 2.5263-2.5263s-1.131-2.5263-2.5263-2.5263m0 1.2632a1.263 1.263 0 0 1 1.2631 1.2631 1.263 1.263 0 0 1-1.2631 1.2632 1.263 1.263 0 0 1-1.2632-1.2632 1.263 1.263 0 0 1 1.2632-1.2631M2.5263 10.7368A1.263 1.263 0 0 1 3.7895 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 1.2632 12a1.263 1.263 0 0 1 1.2631-1.2632m6.3158 0A1.263 1.263 0 0 1 10.1053 12a1.263 1.263 0 0 1-1.2632 1.2632A1.263 1.263 0 0 1 7.579 12a1.263 1.263 0 0 1 1.2632-1.2632m10.1053 3.7895a1.263 1.263 0 0 1 1.2631 1.2632 1.263 1.263 0 0 1-1.2631 1.2631 1.263 1.263 0 0 1-1.2632-1.2631 1.263 1.263 0 0 1 1.2632-1.2632',
    icon: <Workflow className="w-6 h-6 text-[#EA4B71]" />,
    tag: 'Self-Healing',
    bgGradient: 'from-[#EA4B71]/20 to-[#EA4B71]/40',
  },
  // 3. Orbit 2, 180deg, 250.5px radius, 78px size (AI Agent node with pink glow)
  {
    id: 'ai-agent',
    name: 'AI Agent Swarm',
    role: 'Autonomous LLM Ops',
    orbit: 2,
    angle: 180,
    radius: 250.5,
    size: 76,
    shape: 'square-3xl',
    glowColor: 'rgba(244, 63, 94, 0.75)',
    borderColor: 'rgba(244, 63, 94, 0.7)',
    flyInDelay: 1.0,
    icon: <Bot className="w-8 h-8 text-rose-400" />,
    tag: 'Claude & OpenAI',
    bgGradient: 'from-rose-900/40 via-pink-900/30 to-purple-950/70',
  },
  // 4. Orbit 2, 300deg, 250.5px radius, square rounded-2xl (Next.js / Fullstack with cyan glow)
  {
    id: 'nextjs-infra',
    name: 'Next.js 16 Edge',
    role: 'Sub-Second Frontend',
    orbit: 2,
    angle: 300,
    radius: 250.5,
    size: 62,
    shape: 'square-2xl',
    glowColor: 'rgba(56, 189, 248, 0.75)',
    borderColor: 'rgba(56, 189, 248, 0.7)',
    flyInDelay: 1.2,
    customSvgPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.277 17.656L9.623 6.969H7.692v10.062h1.692V10.15l7.07 8.916a10.33 10.33 0 0 0 1.823-1.41zM14.615 6.969h1.693v6.308l-1.693-2.154V6.969z',
    icon: <Code2 className="w-6 h-6 text-sky-400" />,
    tag: '100/100 Core Web Vitals',
    bgGradient: 'from-sky-950/60 to-slate-900/90',
  },
  // 5. Orbit 3, 130deg, 324.5px radius, 88px size (Supabase / Data engine with emerald glow)
  {
    id: 'supabase-db',
    name: 'Supabase pgvector',
    role: 'Realtime Data Engine',
    orbit: 3,
    angle: 130,
    radius: 324.5,
    size: 80,
    shape: 'square-3xl',
    glowColor: 'rgba(16, 185, 129, 0.75)',
    borderColor: 'rgba(16, 185, 129, 0.7)',
    flyInDelay: 1.4,
    customSvgPath: 'M21.362 9.354H12V.304a.6.6 0 0 0-1.026-.424L.194 10.702a.6.6 0 0 0 .426 1.024H10v9.05a.6.6 0 0 0 1.026.424l10.78-10.822a.6.6 0 0 0-.444-1.024z',
    icon: <Database className="w-8 h-8 text-emerald-400" />,
    tag: 'Vector & Relational',
    bgGradient: 'from-emerald-950/50 to-teal-950/80',
  },
  // 6. Orbit 3, 310deg, 324.5px radius, 64px size (Apollo / B2B Lead Ops with purple glow)
  {
    id: 'apollo-leadops',
    name: 'Apollo.io Engine',
    role: 'B2B Lead Intelligence',
    orbit: 3,
    angle: 310,
    radius: 324.5,
    size: 64,
    shape: 'circle',
    glowColor: 'rgba(160, 104, 255, 0.75)',
    borderColor: 'rgba(160, 104, 255, 0.7)',
    flyInDelay: 1.6,
    customSvgPath: 'M12,0C5.372,0 0,5.373 0,12 0,18.628 5.372,24 12,24 18.627,24 24,18.628 24,12A12.014,12.014 0 0 0 23.527,8.657 0.6,0.6 0 0 0 22.4,9.066H22.398C22.663,10.009 22.8,10.994 22.8,12A10.73,10.73 0 0 1 19.637,19.637 10.729,10.729 0 0 1 12,22.8 10.73,10.73 0 0 1 4.363,19.637 10.728,10.728 0 0 1 1.2,12 10.73,10.73 0 0 1 4.363,4.363 10.728,10.728 0 0 1 12,1.2C14.576,1.2 17.013,2.096 18.958,3.74A1.466,1.466 0 1 0 19.82,2.9 11.953,11.953 0 0 0 12,0ZM10.56,5.88 6.36,16.782H8.99L9.677,14.934H13.646L12.927,12.892H10.314L12.014,8.201 15.038,16.781H17.669L13.47,5.88Z',
    icon: <Target className="w-6 h-6 text-purple-400" />,
    tag: 'Waterfall Enrichment',
    bgGradient: 'from-purple-950/60 to-indigo-950/80',
  },
  // 7. Orbit 4, 30deg, 398.5px radius, round (HubSpot / CRM sync with orange glow)
  {
    id: 'hubspot-sync',
    name: 'HubSpot CRM',
    role: 'Automated CRM Pipeline',
    orbit: 4,
    angle: 30,
    radius: 398.5,
    size: 60,
    shape: 'circle',
    glowColor: 'rgba(249, 115, 22, 0.75)',
    borderColor: 'rgba(249, 115, 22, 0.7)',
    flyInDelay: 1.8,
    customSvgPath: 'M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z',
    icon: <Sparkles className="w-6 h-6 text-orange-400" />,
    tag: 'Live Sync',
    bgGradient: 'from-orange-950/50 to-amber-950/70',
  },
  // 8. Orbit 4, 95deg, 398.5px radius, 88px size square rounded-3xl (Pinecone / Vector DB with indigo glow)
  {
    id: 'pinecone-vectordb',
    name: 'Pinecone Serverless',
    role: 'Vector Knowledge Base',
    orbit: 4,
    angle: 95,
    radius: 398.5,
    size: 78,
    shape: 'square-3xl',
    glowColor: 'rgba(99, 102, 241, 0.75)',
    borderColor: 'rgba(99, 102, 241, 0.7)',
    flyInDelay: 2.0,
    customSvgPath: 'M15.42 1.48a.47.47 0 0 0-.84 0L12 6.57 9.42 1.48a.47.47 0 0 0-.84 0L.11 19.38a.47.47 0 0 0 .42.62H23.47a.47.47 0 0 0 .42-.62L15.42 1.48zM12 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4z',
    icon: <Cpu className="w-8 h-8 text-indigo-400" />,
    tag: 'Sub-50ms RAG',
    bgGradient: 'from-indigo-950/60 to-blue-950/80',
  },
  // 9. Orbit 4, 220deg, 398.5px radius, 88px size square rounded-3xl (Brevo / Pipeline with cyan glow)
  {
    id: 'brevo-pipeline',
    name: 'Brevo Engine',
    role: 'Transactional Messaging',
    orbit: 4,
    angle: 220,
    radius: 398.5,
    size: 74,
    shape: 'square-3xl',
    glowColor: 'rgba(6, 182, 212, 0.75)',
    borderColor: 'rgba(6, 182, 212, 0.7)',
    flyInDelay: 2.2,
    customSvgPath: 'M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zM7.2 4.8h5.747c2.34 0 3.895 1.406 3.895 3.516 0 1.022-.348 1.862-1.09 2.588C17.189 11.812 18 13.22 18 14.785c0 2.86-2.64 5.016-6.164 5.016H7.199v-15zm2.085 1.952v5.537h.07c.233-.432.858-.796 2.249-1.226 2.039-.659 3.037-1.52 3.037-2.655 0-.998-.766-1.656-1.924-1.656H9.285zm4.87 5.266c-.766.385-1.67.748-2.76 1.11-1.229.387-2.11 1.386-2.11 2.407v2.315h2.365c2.387 0 4.149-1.34 4.149-3.155 0-1.067-.625-2.087-1.645-2.677z',
    icon: <Layers className="w-7 h-7 text-cyan-400" />,
    tag: '99.9% Deliverability',
    bgGradient: 'from-cyan-950/60 to-slate-900/90',
  },
];

/**
 * Single Orbit Node Card with Counter-Rotation to keep upright
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
        return 'rounded-3xl';
      case 'square-2xl':
      default:
        return 'rounded-2xl';
    }
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
      style={{
        transform: `translate(-50%, -50%) rotate(${node.angle}deg) translate(${node.radius}px) rotate(-${node.angle}deg)`,
      }}
    >
      {/* Fly-in Animation Container */}
      <div
        className="will-change-transform"
        style={{
          animation: `avatarFlyIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${node.flyInDelay}s both`,
        }}
      >
        {/* Counter-Rotating Wrapper to keep node upright relative to orbit spin */}
        <div className={counterAnimationClass}>
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Ambient Chromatic Node Glow */}
            <div
              className={`absolute -inset-1.5 ${getShapeClass()} blur-md transition-all duration-300 opacity-50 dark:opacity-75 group-hover:opacity-100 group-hover:scale-110`}
              style={{ backgroundColor: node.glowColor }}
            />

            {/* Node Card Surface with theme-adaptive styling */}
            <div
              className={`relative ${getShapeClass()} overflow-hidden border backdrop-blur-xl bg-white/90 dark:bg-[#0c0728]/95 flex items-center justify-center shadow-lg dark:shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-purple-400/80`}
              style={{
                width: `${node.size}px`,
                height: `${node.size}px`,
                borderColor: node.borderColor,
              }}
            >
              {/* Inner gradient fill */}
              <div className={`absolute inset-0 bg-gradient-to-br ${node.bgGradient} opacity-30 dark:opacity-60 pointer-events-none`} />

              {/* Node Icon / Image Content */}
              {node.imageUrl ? (
                <div className="relative w-full h-full p-1">
                  <Image
                    src={node.imageUrl}
                    alt={node.name}
                    fill
                    sizes="80px"
                    className="object-cover object-center rounded-xl"
                  />
                </div>
              ) : node.customSvgPath ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-2.5 z-10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-full h-full fill-current text-slate-800 dark:text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{ color: node.glowColor.replace('0.75', '1') }}
                  >
                    <path d={node.customSvgPath} />
                  </svg>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-2 z-10">
                  {node.icon || <Sparkles className="w-6 h-6 text-teal-400" />}
                </div>
              )}

              {/* Status Indicator Dot */}
              <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-slate-950 shadow-[0_0_8px_#34d399] z-20" />
            </div>

            {/* Floating Info Tooltip on Hover */}
            {isHovered && (
              <div 
                className="absolute left-1/2 -top-16 -translate-x-1/2 z-50 pointer-events-none whitespace-nowrap px-3.5 py-2 rounded-xl bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-200 animate-in fade-in zoom-in-95"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <p className="text-xs font-bold text-white leading-tight">{node.name}</p>
                </div>
                <p className="text-[10px] text-slate-300 dark:text-slate-400 leading-tight mt-0.5">{node.role}</p>
                {node.tag && (
                  <span className="mt-1 inline-block text-[8px] font-mono font-bold text-teal-300 uppercase tracking-wider">
                    {node.tag}
                  </span>
                )}
                {/* Arrow Pointer */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-950 border-r border-b border-slate-700/80 transform rotate-45" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ConcentricOrbits Component
 * 
 * 4-Orbit cosmic visualization with:
 * - Orbit 1: 353px diameter, spins CCW 30s
 * - Orbit 2: 501px diameter, spins CW 40s
 * - Orbit 3: 649px diameter, spins CW 50s
 * - Orbit 4: 797px diameter, spins CCW 60s
 * - Center Card: Upright counter-rotating live count-up badge in Urbanist bold
 * - 9 Specialist nodes positioned along orbit arcs with staggered fly-ins
 */
export function ConcentricOrbits({
  targetCount = 30,
  countSuffix = '+',
  centerLabel = 'Systems Deployed',
  centerBadge = 'AUTONOMOUS REVOPS',
  countDuration = 2000,
  countDelay = 1200,
  className = '',
  customNodes,
  pauseOnHover = false,
}: ConcentricOrbitsProps) {
  const nodes = customNodes || DEFAULT_NODES;

  // Smooth live count-up animation hook
  const { count } = useCountUp({
    target: targetCount,
    duration: countDuration,
    startDelay: countDelay,
    autoStart: true,
  });

  return (
    <div 
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        contain: 'layout paint',
      }}
    >
      {/* Responsive Scaling Viewport Container */}
      <div 
        className={`relative w-[340px] h-[340px] xs:w-[420px] xs:h-[420px] sm:w-[540px] sm:h-[540px] md:w-[620px] md:h-[620px] lg:w-[680px] lg:h-[680px] xl:w-[720px] xl:h-[720px] max-w-full aspect-square flex items-center justify-center ${pauseOnHover ? 'pause-orbit-hover' : ''}`}
      >
        {/* Scaling Transform Wrapper to map the native 797px orbit coordinate system */}
        <div className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.42] xs:scale-[0.52] sm:scale-[0.67] md:scale-[0.77] lg:scale-[0.85] xl:scale-[0.9] 2xl:scale-[0.98] transform-gpu origin-center pointer-events-none">

          {/* ===================================================================== */}
          {/* ORBIT 4 (Outermost): 797px Diameter, Spins Counter-Clockwise (60s)    */}
          {/* ===================================================================== */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[797px] h-[797px] rounded-full pointer-events-none origin-center">
            {/* 1px Gradient Border Ring with theme awareness */}
            <div className="absolute inset-0 rounded-full border border-purple-400/20 dark:border-purple-400/30 shadow-[0_0_20px_rgba(160,104,255,0.08)] pointer-events-none" />
            
            {/* Spinning Container */}
            <div className="w-full h-full rounded-full orbit-spin-ccw-60 pointer-events-none origin-center">
              {nodes
                .filter((n) => n.orbit === 4)
                .map((node) => (
                  <OrbitNodeCard
                    key={node.id}
                    node={node}
                    counterAnimationClass="orbit-spin-cw-60"
                  />
                ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* ORBIT 3: 649px Diameter, Spins Clockwise (50s)                         */}
          {/* ===================================================================== */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[649px] h-[649px] rounded-full pointer-events-none origin-center">
            {/* 1px Gradient Border Ring */}
            <div className="absolute inset-0 rounded-full border border-teal-400/25 dark:border-teal-400/30 shadow-[0_0_20px_rgba(45,212,191,0.08)] pointer-events-none" />
            
            {/* Spinning Container */}
            <div className="w-full h-full rounded-full orbit-spin-cw-50 pointer-events-none origin-center">
              {nodes
                .filter((n) => n.orbit === 3)
                .map((node) => (
                  <OrbitNodeCard
                    key={node.id}
                    node={node}
                    counterAnimationClass="orbit-spin-ccw-50"
                  />
                ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* ORBIT 2: 501px Diameter, Spins Clockwise (40s)                         */}
          {/* ===================================================================== */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[501px] h-[501px] rounded-full pointer-events-none origin-center">
            {/* 1px Gradient Border Ring */}
            <div className="absolute inset-0 rounded-full border border-purple-400/30 dark:border-purple-400/40 shadow-[0_0_25px_rgba(160,104,255,0.1)] pointer-events-none" />
            
            {/* Spinning Container */}
            <div className="w-full h-full rounded-full orbit-spin-cw-40 pointer-events-none origin-center">
              {nodes
                .filter((n) => n.orbit === 2)
                .map((node) => (
                  <OrbitNodeCard
                    key={node.id}
                    node={node}
                    counterAnimationClass="orbit-spin-ccw-40"
                  />
                ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* ORBIT 1 (Innermost): 353px Diameter, Spins Counter-Clockwise (30s)     */}
          {/* ===================================================================== */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[353px] h-[353px] rounded-full pointer-events-none origin-center">
            {/* 1px Gradient Border Ring */}
            <div className="absolute inset-0 rounded-full border border-teal-400/40 dark:border-teal-400/50 shadow-[0_0_30px_rgba(45,212,191,0.15)] pointer-events-none" />
            
            {/* Spinning Container */}
            <div className="w-full h-full rounded-full orbit-spin-ccw-30 pointer-events-none origin-center">
              {nodes
                .filter((n) => n.orbit === 1)
                .map((node) => (
                  <OrbitNodeCard
                    key={node.id}
                    node={node}
                    counterAnimationClass="orbit-spin-cw-30"
                  />
                ))}

              {/* Center Metric Card: Placed inside Orbit 1 and Counter-Rotated (CW 30s) */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto origin-center"
              >
                <div className="orbit-spin-cw-30 origin-center">
                  <div 
                    className="relative w-[190px] h-[190px] rounded-[32px] p-5 flex flex-col items-center justify-between text-center bg-white/95 dark:bg-[#0A0520]/95 border border-slate-200/90 dark:border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300 group hover:scale-105"
                    style={{
                      animation: 'centerPulseGlow 4s ease-in-out infinite',
                    }}
                  >
                    {/* Top Status Header */}
                    <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
                        <span className="text-[9px] font-mono font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                          {centerBadge}
                        </span>
                      </div>
                      <Activity className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    </div>

                    {/* Middle Counter Display in Urbanist Font */}
                    <div className="my-auto flex flex-col items-center justify-center">
                      <div className="flex items-baseline justify-center">
                        <span 
                          className="font-urbanist font-black text-[50px] leading-none tracking-tighter text-slate-900 dark:text-white"
                        >
                          {count}
                        </span>
                        <span className="font-urbanist font-black text-[32px] leading-none text-teal-600 dark:text-teal-400 ml-0.5">
                          {countSuffix}
                        </span>
                      </div>
                      <span className="font-urbanist text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1.5">
                        {centerLabel}
                      </span>
                    </div>

                    {/* Bottom Status Pill */}
                    <div className="w-full pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-center gap-1.5">
                      <span className="text-[9px] font-mono text-teal-600 dark:text-teal-400 font-bold bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                        PRODUCTION READY
                      </span>
                    </div>

                  </div>
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
