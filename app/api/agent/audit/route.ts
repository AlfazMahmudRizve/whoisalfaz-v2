import { NextResponse } from 'next/server';
import { z } from 'zod';
import { runFullAudit, calculateOverallScore, normalizeTargetUrl } from '@/lib/audit';

export const maxDuration = 60; // Allow up to 60 seconds to prevent Vercel 504 execution timeouts

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: corsHeaders,
    });
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

        const auditResponse = {
            url: normalizedUrl,
            timestamp: fullAudit.timestamp,
            overallScore: score,
            grade,
            checks: filteredChecks,
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
