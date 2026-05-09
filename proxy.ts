import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

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

// ─── Middleware ───────────────────────────────────────────────────────────────
export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only rate-limit API routes
    if (!pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // If Redis is not configured, allow all requests (dev fallback)
    if (!redis || !standardLimiter || !auditLimiter) {
        console.warn('[Middleware] Upstash Redis not configured — rate limiting disabled.');
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
    const isAudit = pathname.startsWith('/api/audit');
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

        // Attach rate limit headers to the successful response
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
// Only run middleware on API routes
export const config = {
    matcher: ['/api/contact/:path*', '/api/audit/:path*', '/api/newsletter/:path*'],
};
