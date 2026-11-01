import { NextResponse } from 'next/server';
import {
    runFullAudit,
    runSSLCheck,
    runSecurityHeaderCheck,
    runPageSpeedCheck,
    normalizeTargetUrl,
} from '@/lib/audit';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for audit execution

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

// ─── MCP Tool Definitions ───────────────────────────────────────────────────
const MCP_TOOLS = [
    {
        name: 'whoisalfaz_audit_website',
        description: 'Run a comprehensive technical SEO, performance, security, and meta tags audit on a target website.',
        inputSchema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    description: 'The full URL of the website to audit (e.g. https://example.com)',
                },
            },
            required: ['url'],
        },
    },
    {
        name: 'whoisalfaz_check_security',
        description: 'Inspect SSL certificate validity, expiration, and HTTP security headers (HSTS, CSP, etc.) on a target website.',
        inputSchema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    description: 'The target website URL to inspect security headers and SSL certificate',
                },
            },
            required: ['url'],
        },
    },
    {
        name: 'whoisalfaz_check_performance',
        description: 'Benchmark website performance, TTFB, resource footprint, and Core Web Vitals diagnostics.',
        inputSchema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    description: 'The website URL to test performance and page load metrics',
                },
            },
            required: ['url'],
        },
    },
];

interface JsonRpcRequest {
    jsonrpc?: string;
    id?: string | number | null;
    method?: string;
    params?: Record<string, unknown>;
}

export async function POST(request: Request) {
    let reqBody: JsonRpcRequest;

    try {
        reqBody = await request.json();
    } catch {
        return NextResponse.json(
            {
                jsonrpc: '2.0',
                id: null,
                error: {
                    code: -32700,
                    message: 'Parse error: Invalid JSON payload',
                },
            },
            { status: 400, headers: corsHeaders }
        );
    }

    // Defensive check: Ensure payload is a valid non-null object
    if (!reqBody || typeof reqBody !== 'object' || Array.isArray(reqBody)) {
        return NextResponse.json(
            {
                jsonrpc: '2.0',
                id: null,
                error: {
                    code: -32600,
                    message: 'Invalid Request: Expected a JSON-RPC 2.0 object',
                },
            },
            { status: 400, headers: corsHeaders }
        );
    }

    const { id = null, method, params } = reqBody;

    // Validate JSON-RPC 2.0 basic structure
    if (!method || typeof method !== 'string') {
        return NextResponse.json(
            {
                jsonrpc: '2.0',
                id,
                error: {
                    code: -32600,
                    message: 'Invalid Request: "method" must be a string',
                },
            },
            { status: 400, headers: corsHeaders }
        );
    }

    try {
        switch (method) {
            case 'initialize': {
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            protocolVersion: '2024-11-05',
                            capabilities: {
                                tools: {},
                            },
                            serverInfo: {
                                name: 'whoisalfaz-seo-auditor',
                                version: '1.0.0',
                            },
                        },
                    },
                    { headers: corsHeaders }
                );
            }

            case 'notifications/initialized': {
                // Client acknowledges initialization notification
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        result: {},
                    },
                    { headers: corsHeaders }
                );
            }

            case 'ping': {
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        result: {},
                    },
                    { headers: corsHeaders }
                );
            }

            case 'tools/list': {
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        result: {
                            tools: MCP_TOOLS,
                        },
                    },
                    { headers: corsHeaders }
                );
            }

            case 'tools/call': {
                const toolName = (params as { name?: string })?.name;
                const toolArgs = (params as { arguments?: { url?: string } })?.arguments;

                if (!toolName || typeof toolName !== 'string') {
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            error: {
                                code: -32602,
                                message: "Invalid params: 'name' is required",
                            },
                        },
                        { status: 400, headers: corsHeaders }
                    );
                }

                // Verify tool exists before parameter checking
                const isKnownTool = MCP_TOOLS.some((t) => t.name === toolName);
                if (!isKnownTool) {
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            error: {
                                code: -32601,
                                message: `Tool not found: ${toolName}`,
                            },
                        },
                        { status: 400, headers: corsHeaders }
                    );
                }

                if (!toolArgs?.url || typeof toolArgs.url !== 'string') {
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            error: {
                                code: -32602,
                                message: "Invalid params: 'url' argument is required",
                            },
                        },
                        { status: 400, headers: corsHeaders }
                    );
                }

                const targetUrl = normalizeTargetUrl(toolArgs.url);

                // SSRF Guard: Prevent targeting internal loopback or cloud metadata IPs
                if (isPrivateOrLocalUrl(targetUrl)) {
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            error: {
                                code: -32602,
                                message: "Invalid params: 'url' cannot resolve to private, local, or cloud metadata addresses",
                            },
                        },
                        { status: 400, headers: corsHeaders }
                    );
                }

                if (toolName === 'whoisalfaz_audit_website') {
                    const auditResult = await runFullAudit(targetUrl);
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            result: {
                                content: [
                                    {
                                        type: 'text',
                                        text: JSON.stringify(auditResult, null, 2),
                                    },
                                ],
                            },
                        },
                        { headers: corsHeaders }
                    );
                }

                if (toolName === 'whoisalfaz_check_security') {
                    const [ssl, headers] = await Promise.all([
                        runSSLCheck(targetUrl),
                        runSecurityHeaderCheck(targetUrl),
                    ]);
                    const result = {
                        url: targetUrl,
                        timestamp: new Date().toISOString(),
                        checks: [ssl, headers],
                    };
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            result: {
                                content: [
                                    {
                                        type: 'text',
                                        text: JSON.stringify(result, null, 2),
                                    },
                                ],
                            },
                        },
                        { headers: corsHeaders }
                    );
                }

                if (toolName === 'whoisalfaz_check_performance') {
                    const perf = await runPageSpeedCheck(targetUrl);
                    const result = {
                        url: targetUrl,
                        timestamp: new Date().toISOString(),
                        checks: [perf],
                    };
                    return NextResponse.json(
                        {
                            jsonrpc: '2.0',
                            id,
                            result: {
                                content: [
                                    {
                                        type: 'text',
                                        text: JSON.stringify(result, null, 2),
                                    },
                                ],
                            },
                        },
                        { headers: corsHeaders }
                    );
                }

                // Fallback for safety
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        error: {
                            code: -32601,
                            message: `Tool not found: ${toolName}`,
                        },
                    },
                    { status: 400, headers: corsHeaders }
                );
            }

            default: {
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        error: {
                            code: -32601,
                            message: `Method not found: ${method}`,
                        },
                    },
                    { status: 400, headers: corsHeaders }
                );
            }
        }
    } catch (error: unknown) {
        console.error('MCP Server Error:', error);
        return NextResponse.json(
            {
                jsonrpc: '2.0',
                id,
                error: {
                    code: -32603,
                    message: error instanceof Error ? error.message : 'Internal server error',
                },
            },
            { status: 500, headers: corsHeaders }
        );
    }
}
