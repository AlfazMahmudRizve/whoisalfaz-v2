import { projects, Project } from './projects';

export interface VaultPlatform {
  project: Project;
  turnkeyPrice: number;
  priceDisplay: string;
  scopeLabel: string;
  deliveryTimeline: string;
  bestFor: string;
  deliverables: string[];
  inquiryService: string;
  badge: string;
}

export const VAULT_PLATFORMS: VaultPlatform[] = [
  {
    project: projects.find((p) => p.id === 'heaven-atelier') || projects[0],
    turnkeyPrice: 1850,
    priceDisplay: '$1,850',
    scopeLabel: 'Turnkey Studio Platform & Commercial Source License',
    deliveryTimeline: '3–5 Business Days',
    bestFor: 'Luxury ateliers, bespoke furniture makers, architectural joineries & high-end design studios',
    badge: 'Flagship Concept Platform',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'Complete React 19 + Tailwind CSS + Lucide client repository',
      'Supabase PostgreSQL schema with RLS & 31/31 passing Vitest suite',
      'Interactive Timber & Material Lens (Multi-light grain inspector)',
      'Bespoke Interior Consultation Tray with WhatsApp dispatch',
      'Production & Fabrication Stage CMS (/admin) with payment reconciliation',
      'White-glove deployment on Vercel with your custom domain & branding',
    ],
  },
  {
    project: projects.find((p) => p.id === 'urban-harvest-cafe') || projects[1],
    turnkeyPrice: 1400,
    priceDisplay: '$1,400',
    scopeLabel: 'Smart Kitchen OS & Real-Time FoodTech PWA',
    deliveryTimeline: '2–4 Business Days',
    bestFor: 'Artisan cafes, cloud kitchens, bakeries & fast-casual restaurant operators',
    badge: 'Production FoodTech PWA',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'Next.js 14 App Router + TypeScript + Zustand state architecture',
      'Supabase Realtime WebSocket kitchen dispatch + 5s defensive polling',
      'Browser Web Speech API hands-free voice order synthesizer',
      'Telegram Bot order alert webhooks & live ticket management',
      'Custom menu categorization, seat management & branding setup',
      'Cloudflare / Vercel edge deployment with offline PWA caching',
    ],
  },
  {
    project: projects.find((p) => p.id === 'veloryc') || projects[2],
    turnkeyPrice: 1650,
    priceDisplay: '$1,650',
    scopeLabel: 'Headless High-Performance E-Commerce Engine',
    deliveryTimeline: '3–5 Business Days',
    bestFor: 'DTC skincare, cosmetic brands, boutique fashion & luxury consumer goods',
    badge: 'Headless E-Commerce',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'Pure CSS & Next.js App Router headless storefront (Lighthouse 98+)',
      'Supabase PostgreSQL database schema with Edge Functions',
      'Frictionless guest checkout with automated JWT credentials',
      'Headless Command Center for live order dispatch & telemetry',
      'Conversion-optimized cart drawer & dynamic product recommendations',
      'Complete domain wiring, CDN caching & custom payment gateway setup',
    ],
  },
  {
    project: projects.find((p) => p.id === 'spectre') || projects[3],
    turnkeyPrice: 2200,
    priceDisplay: '$2,200',
    scopeLabel: 'Interactive 3D WebGL / R3F Immersive Studio',
    deliveryTimeline: '4–6 Business Days',
    bestFor: 'Consumer electronics, industrial hardware, luxury watches & 3D product showcases',
    badge: 'Interactive 3D Experience',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'React Three Fiber (R3F) + Three.js + Next.js interactive codebase',
      'Progressive Buffering engine maintaining locked 60FPS fluid scroll',
      'Hardware-accelerated exploded view 3D mesh disassembly',
      'Custom 3D model asset integration (GLTF / GLB) with WebP textures',
      'Mobile-optimized touch controls & graceful WebGL fallback engine',
      'Edge asset distribution pipeline with high-throughput compression',
    ],
  },
  {
    project: projects.find((p) => p.id === 'cashops') || projects[4],
    turnkeyPrice: 1250,
    priceDisplay: '$1,250',
    scopeLabel: 'Personal Finance & Revenue Telemetry Platform',
    deliveryTimeline: '2–4 Business Days',
    bestFor: 'Founders, freelance consultants, agencies & fintech telemetry dashboards',
    badge: 'Financial Telemetry Dashboard',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'Next.js + Server Actions + Recharts telemetry codebase',
      'Optimistic state balance engine with zero-latency visual updates',
      'Automated bulk CSV parser with schema validation & ledger normalization',
      'Supabase PostgreSQL multi-account transaction ledger schemas',
      'Automated monthly reconciliation & cashflow projection engine',
      'Zero-leakage encrypted environment deployment on your cloud account',
    ],
  },
  {
    project: projects.find((p) => p.id === 'careerops') || projects[5],
    turnkeyPrice: 950,
    priceDisplay: '$950',
    scopeLabel: 'Stateless AI Career & Resume Orchestration Engine',
    deliveryTimeline: '2–3 Business Days',
    bestFor: 'Recruiting agencies, career coaches, university portals & HR tech startups',
    badge: 'AI Orchestration Engine',
    inquiryService: 'custom-full-stack',
    deliverables: [
      'Next.js TypeScript client app + autonomous n8n orchestration workflow',
      'Stateless client-side parsing ensuring zero PII retention & GDPR safety',
      'Webhook-driven candidate role-match dossier generator',
      'Customizable OpenAI model prompts, scoring thresholds & PDF export',
      'Self-hosted n8n workflow deployment + Vercel frontend configuration',
      'Complete documentation & webhook integration guidelines',
    ],
  },
];
