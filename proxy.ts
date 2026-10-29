import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// ─── Edge Bot Shield & Scanner Probe Drop Lists ──────────────────────────────
const PROBE_PATTERNS = [
    '.php',
    'wp-admin',
    'wp-login',
    'xmlrpc',
    '.env',
    'actuator',
    'eval-stdin',
];

const LEGITIMATE_CRAWLERS = [
    'Googlebot',
    'bingbot',
    'msnbot',
    'BingPreview',
    'YandexBot',
    'DuckDuckBot',
];

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

// ─── Rate Limiter Instances ──────────────────────────────────────────────────
// Only initialize if environment variables are present (graceful degradation)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;

// Standard rate limit: 5 requests per 60 seconds (contact, newsletter, partnerships)
const standardLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '60 s'),
        prefix: 'ratelimit:standard',
        analytics: true,
    })
    : null;

// Strict rate limit: 2 requests per 60 seconds (heavy audit endpoint)
const auditLimiter = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(2, '60 s'),
        prefix: 'ratelimit:audit',
        analytics: true,
    })
    : null;

// ─── Proxy (Next.js 16 Edge Execution) ───────────────────────────────────────
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const lowerPath = pathname.toLowerCase();

    // 1. Drop malicious scanner probes before Next.js routing overhead
    const isMaliciousProbe = PROBE_PATTERNS.some((pattern) =>
        lowerPath.includes(pattern)
    );

    if (isMaliciousProbe) {
        return new NextResponse('Not Found', { status: 404 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const lowerUserAgent = userAgent.toLowerCase();

    // Dedicated machine agent endpoints (/api/agent and /api/mcp) bypass the bot shield
    // allowing AI agents (ClaudeBot, GPTBot, etc.) to access machine tools
    const AGENT_ROUTES = ['/api/agent', '/api/mcp'];
    const isAgentRoute = AGENT_ROUTES.some((route) => lowerPath.startsWith(route));

    // 2. Allow legitimate search engine crawlers immediately
    const isLegitimateCrawler = LEGITIMATE_CRAWLERS.some((crawler) =>
        lowerUserAgent.includes(crawler.toLowerCase())
    );

    if (!isLegitimateCrawler && !isAgentRoute) {
        // 3. Block aggressive scrapers and uncooperative AI crawlers on general website routes
        const isBlockedBot = BLOCKED_BOTS.some((bot) =>
            lowerUserAgent.includes(bot.toLowerCase())
        );

        if (isBlockedBot) {
            return new NextResponse('Access Denied', { status: 403 });
        }
    }

    // 4. Rate-limit API routes
    if (!pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // If Redis is not configured, allow all requests (dev fallback)
    if (!redis || !standardLimiter || !auditLimiter) {
        return NextResponse.next();
    }

    // Only rate-limit POST requests (form submissions)
    if (request.method !== 'POST') {
        return NextResponse.next();
    }

    // Extract IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || '127.0.0.1';

    // Select the appropriate limiter based on the endpoint
    const isAudit = pathname.startsWith('/api/audit') || pathname.startsWith('/api/agent');
    const limiter = isAudit ? auditLimiter : standardLimiter;
    const identifier = `${ip}:${pathname}`;

    try {
        const { success, limit, reset, remaining } = await limiter.limit(identifier);

        if (!success) {
            console.warn(`[Rate Limit] Blocked ${ip} on ${pathname} — ${remaining}/${limit} remaining, resets at ${new Date(reset).toISOString()}`);
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': limit.toString(),
                        'X-RateLimit-Remaining': remaining.toString(),
                        'X-RateLimit-Reset': reset.toString(),
                        'Retry-After': Math.ceil((reset - Date.now()) / 1000).toString(),
                    },
                }
            );
        }

        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', limit.toString());
        response.headers.set('X-RateLimit-Remaining', remaining.toString());
        response.headers.set('X-RateLimit-Reset', reset.toString());
        return response;

    } catch (error) {
        // If Redis is down, fail open — don't block legitimate users
        console.error('[Rate Limit] Redis error, failing open:', error);
        return NextResponse.next();
    }
}

// ─── Matcher ─────────────────────────────────────────────────────────────────
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|studio|favicon.ico|robots.txt|sitemap.xml).*)',
    ],
};
