import { NextResponse } from 'next/server';
import { z } from 'zod';
import { runFullAudit, calculateOverallScore, normalizeTargetUrl } from '@/lib/audit';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds to prevent Vercel 504 execution timeouts

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Payment, x-402, X-402-Token, Payment-Signature',
    'Access-Control-Expose-Headers': 'Content-Type, X-Payment, WWW-Authenticate, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset',
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
}

function isPrivateOrLocalUrl(rawUrl: string): boolean {
    try {
        const parsed = new URL(rawUrl);
        const host = parsed.hostname.toLowerCase();
        if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host === '::1') {
            return true;
        }
        if (host === '169.254.169.254' || host.startsWith('169.254.')) {
            return true;
        }
        if (host.startsWith('10.') || host.startsWith('192.168.')) {
            return true;
        }
        if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) {
            return true;
        }
        if (host.endsWith('.local') || host.endsWith('.internal')) {
            return true;
        }
        return false;
    } catch {
        return true;
    }
}

const agentAuditSchema = z.object({
    url: z.string().url('Please enter a valid URL'),
    mode: z.enum(['full', 'summary', 'performance', 'security']).optional().default('full'),
    checks: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
    try {
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: 'Validation failed', details: { body: ['Invalid JSON payload'] } },
                { status: 400, headers: corsHeaders }
            );
        }

        const parsed = agentAuditSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
                { status: 400, headers: corsHeaders }
            );
        }

        const { url, mode, checks } = parsed.data;
        const normalizedUrl = normalizeTargetUrl(url);

        // SSRF Guard: Prevent targeting internal loopback or cloud metadata IPs
        if (isPrivateOrLocalUrl(normalizedUrl)) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: { url: ['Target URL cannot resolve to private, local, or cloud metadata addresses'] },
                },
                { status: 400, headers: corsHeaders }
            );
        }

        // Run full audit
        const fullAudit = await runFullAudit(normalizedUrl);

        let filteredChecks = fullAudit.checks;

        if (checks && checks.length > 0) {
            const checkSet = new Set(checks.map((c) => c.toLowerCase()));
            filteredChecks = filteredChecks.filter((c) => checkSet.has(c.name.toLowerCase()));
        } else if (mode === 'performance') {
            filteredChecks = filteredChecks.filter((c) => c.name.toLowerCase().includes('performance'));
        } else if (mode === 'security') {
            filteredChecks = filteredChecks.filter(
                (c) => c.name.toLowerCase().includes('ssl') || c.name.toLowerCase().includes('security')
            );
        }

        const { score, grade } = (filteredChecks.length === fullAudit.checks.length)
            ? { score: fullAudit.overallScore, grade: fullAudit.grade }
            : calculateOverallScore(filteredChecks);

        // When summary mode is requested, omit heavy details array to optimize agent context window
        const formattedChecks = (mode === 'summary')
            ? filteredChecks.map(({ name, status, score, summary }) => ({ name, status, score, summary, details: [] }))
            : filteredChecks;

        const auditResponse = {
            url: normalizedUrl,
            timestamp: fullAudit.timestamp,
            overallScore: score,
            grade,
            checks: formattedChecks,
        };

        return NextResponse.json(auditResponse, {
            status: 200,
            headers: corsHeaders,
        });

    } catch (error: unknown) {
        console.error('Agent Audit API Error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal Server Error' },
            { status: 500, headers: corsHeaders }
        );
    }
}
