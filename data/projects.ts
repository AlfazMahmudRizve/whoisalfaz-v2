export interface ProjectHighlight {
  title: string;
  description: string;
  iconName?: string;
}

export interface ProjectTechStack {
  frontend: string[];
  backend: string[];
  qaAndTools: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  tagline: string;
  badge: string;
  type: string;
  event?: string;
  role: string;
  categories: ('featured' | 'full-stack' | 'ui-ux' | 'automation-ai')[];
  tags: string[];
  description: string;
  narrative?: string[];
  keyHighlights: ProjectHighlight[];
  techStack: ProjectTechStack;
  engineeringRigor?: string;
  image: string;
  logo?: string;
  demoUrl: string;
  repoUrl?: string;
  featured: boolean;
  priorityOrder: number;
  theme: {
    accentColor: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    glowColor: string;
    hoverBorder: string;
  };
}

export const CATEGORIES = [
  { id: 'featured', label: 'Featured Work' },
  { id: 'full-stack', label: 'Full-Stack Apps' },
  { id: 'ui-ux', label: 'UI / UX Design' },
  { id: 'automation-ai', label: 'Automation & AI' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'] | 'all';

export const projects: Project[] = [
  {
    id: 'heaven-atelier',
    slug: 'heaven-furniture-atelier',
    title: 'Heaven Atelier — Luxury Interior & Bespoke Furniture Studio',
    shortTitle: 'Heaven Atelier',
    tagline: 'Flagship architectural furniture atelier & interactive digital showroom bridging heirloom craftsmanship with high-velocity engineering.',
    badge: 'Hackathon Project / Concept Platform',
    type: 'Hackathon Project / Flagship Concept Platform',
    event: 'Racdox Hackathon 2026',
    role: 'Solo Concept Architect, Lead UI/UX Designer & Full-Stack Engineer',
    categories: ['featured', 'full-stack', 'ui-ux'],
    tags: [
      'React 19',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'Luxury UI/UX',
      'Interactive Web',
    ],
    description:
      'An editorial-grade digital atelier built for the Racdox Hackathon 2026, bridging bespoke interior design with master artisan joinery. Blends warm alabaster, aged heartwood teak, and brushed brass aesthetics with an interactive material lens, live quotation drawer, and full-lifecycle fabrication CMS.',
    narrative: [
      'Built as an editorial-grade digital atelier bridging bespoke interior design with artisan manufacturing.',
      'Blends high-end architectural aesthetics (Cormorant Garamond, warm alabaster, aged teak, brushed brass) with an interactive digital experience.',
      'Serves interior designers, architects, and private clients seeking heirloom joinery, custom commissions, and showroom consultations.',
    ],
    keyHighlights: [
      {
        title: 'Interactive Timber & Material Lens',
        description:
          'High-fidelity grain inspector allowing clients to examine Burma Teak, Chittagong Teak, Gamari, Mahogany, and Red Oak under dynamic lighting conditions simulating Direct Sunlight, Studio Spotlight, and Ambient Warmth.',
      },
      {
        title: 'Bespoke Interior Consultation Tray',
        description:
          'Floating quotation drawer featuring real-time itemized BDT calculations, custom architectural dimensions, and direct WhatsApp concierge dispatch for customized client consultations.',
      },
      {
        title: 'Architectural Category Suites',
        description:
          'Curated micro-catalog spanning Living Sanctuaries, Executive Studies, Dining Pavilions, and Heritage Lounges, complete with dynamic hover previews illustrating timber origins and mortise-and-tenon joinery details.',
      },
      {
        title: 'Physical Atelier & Showroom Hub',
        description:
          'Integrated showroom portal featuring interactive maps, visiting hours, and instant direction routing to the artisan workshop on Agrabad Access Road, Chattogram.',
      },
      {
        title: 'Production & Workflow CMS (/admin)',
        description:
          'Internal operational portal tracking bespoke fabrication stages: Timber Seasoning → Mortise-and-Tenon Framing → Hand-Carving → Lacquer Finishing → White-Glove Dispatch, with payment reconciliation supporting bKash, Nagad, bank transfers, and cash advances.',
      },
    ],
    techStack: {
      frontend: ['React 19', 'Vite', 'Tailwind CSS', 'Lucide React', 'Canvas Confetti', 'Lenis Smooth Scroll'],
      backend: ['Supabase', 'PostgreSQL', 'Row-Level Security (RLS)', 'Custom PostgreSQL RPCs'],
      qaAndTools: ['31/31 Vitest Unit Tests', 'Happy DOM', 'Zero Lint Errors', 'Production-Optimized Vite Build'],
    },
    engineeringRigor: '31/31 Vitest tests passing across all interactive modules, zero lint errors, production-optimized Vite build with RLS-secured Supabase storage.',
    image: '/heaven-atelier.jpg',
    demoUrl: 'https://heaven.whoisalfaz.me',
    repoUrl: 'https://github.com/AlfazMahmudRizve/heaven-furniture-atelier',
    featured: true,
    priorityOrder: 1,
    theme: {
      accentColor: '#C5A073',
      badgeBg: 'bg-amber-500/10 dark:bg-[#C5A073]/15',
      badgeText: 'text-amber-700 dark:text-[#E8DCC8]',
      badgeBorder: 'border-amber-500/30 dark:border-[#C5A073]/30',
      glowColor: 'from-[#C5A073]/20 to-amber-900/10',
      hoverBorder: 'hover:border-[#C5A073]/60 dark:hover:border-[#C5A073]/60',
    },
  },
  {
    id: 'urban-harvest-cafe',
    slug: 'urban-harvest-cafe',
    title: 'Urban Harvest Cafe',
    shortTitle: 'Urban Harvest Cafe',
    tagline: 'Zero-hardware kitchen OS and real-time food ordering PWA designed for high-volume solo cafe operations.',
    badge: 'Production FoodTech PWA',
    type: 'Production Full-Stack Application',
    role: 'Full-Stack Engineer & Automation Architect',
    categories: ['featured', 'full-stack'],
    tags: ['FoodTech', 'Next.js', 'Real-time', 'Supabase', 'Web Speech API', 'Zustand'],
    description:
      'Modern, artisan food ordering application built for warmth and cravings. Features a seamless serving tray system, real-time kitchen logic, and a "fresh-first" design philosophy with browser-native audio order dispatching.',
    keyHighlights: [
      {
        title: 'Hands-Free Audio Dispatch',
        description: 'Web Speech API synthesis reading incoming orders to the kitchen staff automatically.',
      },
      {
        title: 'Hybrid Realtime Sync',
        description: 'Supabase Realtime WebSockets paired with defensive 5-second polling fallback.',
      },
    ],
    techStack: {
      frontend: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      backend: ['Supabase PostgreSQL', 'Row-Level Security', 'Zustand State'],
      qaAndTools: ['Vercel Edge Network', 'Telegram Bot Webhooks'],
    },
    image: '/urban.png',
    demoUrl: 'https://urbancafe.whoisalfaz.me',
    repoUrl: 'https://github.com/AlfazMahmudRizve/Urban-Harvest-Cafe',
    featured: true,
    priorityOrder: 2,
    theme: {
      accentColor: '#F59E0B',
      badgeBg: 'bg-amber-50 dark:bg-amber-500/10',
      badgeText: 'text-amber-600 dark:text-amber-400',
      badgeBorder: 'border-amber-200 dark:border-amber-500/20',
      glowColor: 'from-amber-500/20 to-transparent',
      hoverBorder: 'hover:border-amber-500/50',
    },
  },
  {
    id: 'veloryc',
    slug: 'veloryc',
    title: 'Veloryc Premium Skincare',
    shortTitle: 'Veloryc',
    tagline: 'High-performance headless e-commerce platform with real-time inventory and conversion optimization.',
    badge: 'Headless E-Commerce',
    type: 'Headless E-Commerce Platform',
    role: 'Lead Full-Stack Engineer & UI/UX Designer',
    categories: ['featured', 'full-stack', 'ui-ux'],
    tags: ['Next.js', 'Supabase', 'Pure CSS', 'Conversion Optimization', 'Tailwind'],
    description:
      'Premium, high-performance e-commerce platform engineered for advanced skincare products. Features real-time Supabase integration, sophisticated fluid UI, and a dedicated headless admin command center.',
    keyHighlights: [
      {
        title: 'Frictionless Guest Checkout',
        description: 'Automated JWT guest credentials saving cart states without forcing registration.',
      },
      {
        title: 'Headless Command Center',
        description: 'Real-time telemetry and order dispatch with zero-latency PostgreSQL aggregation.',
      },
    ],
    techStack: {
      frontend: ['Next.js App Router', 'React', 'Tailwind CSS', 'Pure CSS Motion'],
      backend: ['Supabase PostgreSQL', 'Edge Functions', 'Custom Middleware'],
      qaAndTools: ['Lighthouse 98+ Performance', 'Core Web Vitals Optimized'],
    },
    image: '/veloryc.png',
    demoUrl: 'https://veloryc.whoisalfaz.me/',
    featured: true,
    priorityOrder: 3,
    theme: {
      accentColor: '#A855F7',
      badgeBg: 'bg-purple-50 dark:bg-purple-500/10',
      badgeText: 'text-purple-600 dark:text-purple-400',
      badgeBorder: 'border-purple-200 dark:border-purple-500/20',
      glowColor: 'from-purple-500/20 to-transparent',
      hoverBorder: 'hover:border-purple-500/50',
    },
  },
  {
    id: 'spectre',
    slug: 'spectre',
    title: 'Spectre 3D Immersive Commerce',
    shortTitle: 'Spectre',
    tagline: 'Cinema-quality 3D product disassembly with locked 60FPS fluid scroll and zero-latency TTI.',
    badge: '3D Interactive Experience',
    type: 'Interactive 3D Web Application',
    role: '3D Creative Technologist & Front-End Engineer',
    categories: ['featured', 'ui-ux'],
    tags: ['R3F', 'Next.js', 'Canvas API', 'Three.js', 'WebGL', 'Framer Motion'],
    description:
      'Immersive Commerce Experience. Cinema-quality 3D product disassembly with custom "Progressive Buffering" for instant TTI and locked 60FPS fluid scroll across desktop and mobile devices.',
    keyHighlights: [
      {
        title: 'Progressive Buffering Engine',
        description: 'Dynamic canvas LOD switching maintaining locked 60FPS during viewport manipulation.',
      },
      {
        title: 'Precision Exploded Views',
        description: 'Hardware-accelerated 3D meshes rendered smoothly in React Three Fiber.',
      },
    ],
    techStack: {
      frontend: ['React Three Fiber (R3F)', 'Three.js', 'Next.js', 'Canvas API'],
      backend: ['Edge Asset Delivery', 'WebP Mesh Textures'],
      qaAndTools: ['60FPS Profiler', 'Mobile WebGL Fallbacks'],
    },
    image: '/spectre-logo.png',
    demoUrl: 'https://spectre.whoisalfaz.me/',
    featured: true,
    priorityOrder: 4,
    theme: {
      accentColor: '#06B6D4',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-500/10',
      badgeText: 'text-cyan-600 dark:text-cyan-400',
      badgeBorder: 'border-cyan-200 dark:border-cyan-500/20',
      glowColor: 'from-cyan-500/20 to-transparent',
      hoverBorder: 'hover:border-cyan-500/50',
    },
  },
  {
    id: 'cashops',
    slug: 'cashops-app',
    title: 'CashOps.app Financial Dashboard',
    shortTitle: 'CashOps.app',
    tagline: 'Developer-focused personal finance telemetry with optimistic UI updates and zero-latency charts.',
    badge: 'Financial Telemetry Platform',
    type: 'Full-Stack Financial Application',
    role: 'System Architect & Full-Stack Engineer',
    categories: ['featured', 'full-stack'],
    tags: ['Next.js', 'React Context', 'Tailwind', 'PostgreSQL', 'Telemetry'],
    description:
      'A developer-focused financial dashboard featuring real-time state management, optimistic UI updates, CSV ingestion pipelines, and zero-latency data visualization for autonomous cashflow tracking.',
    keyHighlights: [
      {
        title: 'Optimistic State Pipeline',
        description: 'Zero-latency UI updates with instantaneous balance recalculations and local persistence.',
      },
      {
        title: 'Bulk CSV Ingestion',
        description: 'Automated CSV parser with schema validation and multi-account ledger normalization.',
      },
    ],
    techStack: {
      frontend: ['Next.js', 'React Context', 'Tailwind CSS', 'Recharts'],
      backend: ['Supabase PostgreSQL', 'Server Actions'],
      qaAndTools: ['Automated Ledger Reconciliation'],
    },
    image: '/cashops-logo.png',
    demoUrl: 'https://cashops.whoisalfaz.me',
    featured: true,
    priorityOrder: 5,
    theme: {
      accentColor: '#10B981',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-500/10',
      badgeText: 'text-emerald-600 dark:text-emerald-400',
      badgeBorder: 'border-emerald-200 dark:border-emerald-500/20',
      glowColor: 'from-emerald-500/20 to-transparent',
      hoverBorder: 'hover:border-emerald-500/50',
    },
  },
  {
    id: 'careerops',
    slug: 'careerops',
    title: 'CareerOps AI Resume Strategist',
    shortTitle: 'CareerOps',
    tagline: 'Privacy-first, stateless AI career strategist orchestrating local-first logic and n8n pipelines.',
    badge: 'AI Orchestration Platform',
    type: 'AI Orchestration & Web App',
    role: 'AI Workflow Architect & Full-Stack Engineer',
    categories: ['featured', 'full-stack', 'automation-ai'],
    tags: ['AI', 'n8n', 'Next.js', 'Privacy-First', 'Local State'],
    description:
      'The Stateless AI Career Strategist. Privacy-first resume optimization using local-first client processing and autonomous n8n orchestration to match candidate credentials against job requirements without storing PII.',
    keyHighlights: [
      {
        title: 'Stateless AI Parsing',
        description: 'Zero-data retention applicant processing ensuring absolute GDPR and privacy compliance.',
      },
      {
        title: 'Autonomous n8n Orchestrator',
        description: 'Webhook-driven scoring pipeline generating actionable role-match dossiers.',
      },
    ],
    techStack: {
      frontend: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Self-Hosted n8n', 'OpenAI API', 'FastAPI Microservice'],
      qaAndTools: ['Zero PII Retention Policy'],
    },
    image: '/careerops-logo.png',
    demoUrl: 'https://careerops.whoisalfaz.me/',
    featured: true,
    priorityOrder: 6,
    theme: {
      accentColor: '#3B82F6',
      badgeBg: 'bg-blue-50 dark:bg-blue-500/10',
      badgeText: 'text-blue-600 dark:text-blue-400',
      badgeBorder: 'border-blue-200 dark:border-blue-500/20',
      glowColor: 'from-blue-500/20 to-transparent',
      hoverBorder: 'hover:border-blue-500/50',
    },
  },
];
