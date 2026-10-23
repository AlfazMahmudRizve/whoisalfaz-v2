import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Common exploit scanner probes to drop immediately before Next.js routing
const PROBE_PATTERNS = [
  '.php',
  'wp-admin',
  'wp-login',
  'xmlrpc',
  '.env',
  'actuator',
  'eval-stdin',
];

// Legitimate search engine crawlers (must be exempted)
const LEGITIMATE_CRAWLERS = [
  'Googlebot',
  'bingbot',
  'msnbot',
  'BingPreview',
  'YandexBot',
  'DuckDuckBot',
];

// Aggressive scrapers and uncooperative AI crawlers
const BLOCKED_BOTS = [
  'Bytespider',
  'Amazonbot',
  'ClaudeBot',
  'CCBot',
  'GPTBot',
  'ChatGPT-User',
  'anthropic-ai',
  'PetalBot',
  'DataForSeoBot',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lowerPath = pathname.toLowerCase();

  // 1. Drop malicious scanner probes before Next.js routing
  const isMaliciousProbe = PROBE_PATTERNS.some((pattern) =>
    lowerPath.includes(pattern)
  );

  if (isMaliciousProbe) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const userAgent = request.headers.get('user-agent') || '';
  const lowerUserAgent = userAgent.toLowerCase();

  // 2. Exempt legitimate search engine crawlers
  const isLegitimateCrawler = LEGITIMATE_CRAWLERS.some((crawler) =>
    lowerUserAgent.includes(crawler.toLowerCase())
  );

  if (isLegitimateCrawler) {
    return NextResponse.next();
  }

  // 3. Block aggressive scrapers
  const isBlockedBot = BLOCKED_BOTS.some((bot) =>
    lowerUserAgent.includes(bot.toLowerCase())
  );

  if (isBlockedBot) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|studio|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
