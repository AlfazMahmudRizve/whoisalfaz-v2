import { NextResponse } from 'next/server';
import {
    runFullAudit,
    runSSLCheck,
    runSecurityHeaderCheck,
    runPageSpeedCheck,
    normalizeTargetUrl,
} from '@/lib/audit';

export const maxDuration = 60; // Allow up to 60 seconds for audit execution

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
                        { headers: corsHeaders }
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
                        { headers: corsHeaders }
                    );
                }

                const targetUrl = normalizeTargetUrl(toolArgs.url);

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

                // If tool is not found
                return NextResponse.json(
                    {
                        jsonrpc: '2.0',
                        id,
                        error: {
                            code: -32601,
                            message: `Tool not found: ${toolName}`,
                        },
                    },
                    { headers: corsHeaders }
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
                    { headers: corsHeaders }
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
