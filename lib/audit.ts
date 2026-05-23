import * as tls from 'tls';
import * as dns from 'dns/promises';

// ─── Types ────────────────────────────────────────────────────
export interface CheckResult {
    name: string;
    status: 'pass' | 'warn' | 'fail';
    score: number; // 0-100
    summary: string;
    details: string[];
}

export interface AuditResults {
    url: string;
    timestamp: string;
    overallScore: number;
    grade: string;
    checks: CheckResult[];
}

// ─── 0. Utility ──────────────────────────────────────────────
export function normalizeTargetUrl(url: string): string {
    if (!url) return '';
    let normalized = url.trim();
    if (!/^https?:\/\//i.test(normalized)) {
        normalized = `https://${normalized}`;
    }
    // Collapse multiple slashes after protocol
    return normalized.replace(/^(https?:\/\/)\/+/i, '$1');
}

// ─── 1. PageSpeed Insights ───────────────────────────────────
export async function runPageSpeedCheck(url: string): Promise<CheckResult> {
    const name = 'Performance & Core Web Vitals';
    const rawKey = process.env.GOOGLE_PAGESPEED_API_KEY;

    // Retry logic for rate limits (429)
    const maxRetries = 2;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            // Ensure URL is normalized
            const targetUrl = normalizeTargetUrl(url);
            const apiEndpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
            apiEndpoint.searchParams.append('url', targetUrl);
            apiEndpoint.searchParams.append('strategy', 'mobile');
            apiEndpoint.searchParams.append('category', 'PERFORMANCE');
            apiEndpoint.searchParams.append('category', 'SEO');
            apiEndpoint.searchParams.append('category', 'BEST_PRACTICES');

            // Key fallback logic - handles cases where "AIzaSy" might be missing
            let apiKey = rawKey;
            if (apiKey && !apiKey.startsWith('AIzaSy')) {
                apiKey = `AIzaSy${apiKey}`;
            }

            if (apiKey) {
                apiEndpoint.searchParams.append('key', apiKey);
            }

            const res = await fetch(apiEndpoint.toString(), { signal: AbortSignal.timeout(60000) });

            if (res.status === 429) {
                if (attempt < maxRetries) {
                    // Wait before retrying (3s, then 6s)
                    await new Promise(r => setTimeout(r, (attempt + 1) * 3000));
                    continue;
                }
                return {
                    name, status: 'warn', score: 50,
                    summary: 'Performance analysis is temporarily unavailable. Other checks are accurate — try again in a few minutes.',
                    details: ['⚠️ Performance engine is temporarily rate-limited', '💡 This happens when too many audits run in a short window', '💡 All other checks completed successfully']
                };
            }

            if (!res.ok) {
                return { name, status: 'fail', score: 0, summary: 'Performance analysis returned an error.', details: [`Error code: ${res.status}`] };
            }

            const data = await res.json();
            const perf = data.lighthouseResult?.categories?.performance?.score ?? 0;
            const seo = data.lighthouseResult?.categories?.seo?.score ?? 0;
            const bp = data.lighthouseResult?.categories?.['best-practices']?.score ?? 0;
            const perfScore = Math.round(perf * 100);
            const seoScore = Math.round(seo * 100);
            const bpScore = Math.round(bp * 100);

            const audits = data.lighthouseResult?.audits || {};
            const fcp = audits['first-contentful-paint']?.displayValue || 'N/A';
            const lcp = audits['largest-contentful-paint']?.displayValue || 'N/A';
            const cls = audits['cumulative-layout-shift']?.displayValue || 'N/A';
            const tbt = audits['total-blocking-time']?.displayValue || 'N/A';
            const si = audits['speed-index']?.displayValue || 'N/A';

            const avgScore = Math.round((perfScore + seoScore + bpScore) / 3);
            const status = avgScore >= 80 ? 'pass' : avgScore >= 50 ? 'warn' : 'fail';

            const details = [
                `📊 Performance: ${perfScore}/100`,
                `🔍 SEO: ${seoScore}/100`,
                `⚙️ Best Practices: ${bpScore}/100`,
                `⏱️ First Contentful Paint: ${fcp}`,
                `📐 Largest Contentful Paint: ${lcp}`,
                `📏 Cumulative Layout Shift: ${cls}`,
                `⏳ Total Blocking Time: ${tbt}`,
                `🚀 Speed Index: ${si}`,
            ];

            let summary: string;
            if (perfScore >= 90) summary = `Excellent performance (${perfScore}/100). Your site loads fast.`;
            else if (perfScore >= 50) summary = `Moderate performance (${perfScore}/100). There are optimization opportunities.`;
            else summary = `Poor performance (${perfScore}/100). This is costing you traffic and conversions.`;

            return { name, status, score: avgScore, summary, details };
        } catch {
            if (attempt < maxRetries) continue;
            return { name, status: 'fail', score: 0, summary: 'Performance analysis could not complete.', details: ['Connection timeout — the target site may be slow to respond'] };
        }
    }

    return { name, status: 'fail', score: 0, summary: 'Performance analysis unavailable. Try again later.', details: ['Analysis engine temporarily at capacity'] };
}

// ─── 2. Meta Tags & Open Graph ──────────────────────────────
export async function runMetaTagCheck(url: string): Promise<CheckResult> {
    const name = 'Meta Tags & Open Graph';
    try {
        const res = await fetch(url, {
            signal: AbortSignal.timeout(10000),
            headers: { 'User-Agent': 'WhoisAlfaz-AuditBot/1.0' },
            redirect: 'follow',
        });
        const html = await res.text();
        const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';

        const getMetaContent = (nameAttr: string) => {
            const match = head.match(new RegExp(`<meta[^>]*(?:name|property)=["']${nameAttr}["'][^>]*content=["']([^"']*)["']`, 'i'))
                || head.match(new RegExp(`content=["']([^"']*)["'][^>]*(?:name|property)=["']${nameAttr}["']`, 'i'));
            return match?.[1] || null;
        };

        const title = head.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] || null;
        const description = getMetaContent('description');
        const ogTitle = getMetaContent('og:title');
        const ogDesc = getMetaContent('og:description');
        const ogImage = getMetaContent('og:image');
        const viewport = getMetaContent('viewport');
        const canonical = head.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1] || null;

        const findings: string[] = [];
        let score = 100;

        if (!title) { findings.push('❌ Missing <title> tag'); score -= 20; }
        else if (title.length < 30) { findings.push(`⚠️ Title is short (${title.length} chars). Aim for 50-60.`); score -= 5; }
        else { findings.push(`✅ Title: "${title.substring(0, 60)}${title.length > 60 ? '...' : ''}"`); }

        if (!description) { findings.push('❌ Missing meta description'); score -= 20; }
        else if (description.length < 100) { findings.push(`⚠️ Description is short (${description.length} chars). Aim for 120-160.`); score -= 5; }
        else { findings.push(`✅ Meta description present (${description.length} chars)`); }

        if (!ogTitle || !ogDesc) { findings.push('⚠️ Incomplete Open Graph tags'); score -= 10; }
        else { findings.push('✅ Open Graph tags configured'); }

        if (!ogImage) { findings.push('❌ No og:image — social shares will look plain'); score -= 10; }
        else { findings.push('✅ Open Graph image set'); }

        if (!viewport) { findings.push('❌ Missing viewport meta — bad for mobile'); score -= 15; }
        else { findings.push('✅ Viewport meta tag present'); }

        if (!canonical) { findings.push('⚠️ No canonical URL — risk of duplicate content issues'); score -= 10; }
        else { findings.push('✅ Canonical URL set'); }

        score = Math.max(0, score);
        const status = score >= 80 ? 'pass' : score >= 50 ? 'warn' : 'fail';
        const summary = score >= 80 ? 'Meta tags are well configured.' : score >= 50 ? 'Some meta tags are missing or incomplete.' : 'Critical meta tag issues found.';

        return { name, status, score, summary, details: findings };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { name, status: 'fail', score: 0, summary: 'Could not fetch the page to analyze meta tags.', details: [message] };
    }
}

// ─── 3. SSL Certificate ─────────────────────────────────────
export async function runSSLCheck(url: string): Promise<CheckResult> {
    const name = 'SSL Certificate';
    try {
        const hostname = new URL(url).hostname;

        const cert = await new Promise<tls.DetailedPeerCertificate>((resolve, reject) => {
            const socket = tls.connect(443, hostname, { servername: hostname }, () => {
                const c = socket.getPeerCertificate(true);
                socket.end();
                if (!c || !c.valid_to) reject(new Error('No certificate returned'));
                else resolve(c);
            });
            socket.setTimeout(5000, () => { socket.destroy(); reject(new Error('Connection timeout')); });
            socket.on('error', reject);
        });

        const validTo = new Date(cert.valid_to);
        const daysLeft = Math.ceil((validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const issuer = cert.issuer?.O || cert.issuer?.CN || 'Unknown';

        const details = [
            `Issuer: ${issuer}`,
            `Expires: ${validTo.toISOString().split('T')[0]}`,
            `Days remaining: ${daysLeft}`,
            `Subject: ${cert.subject?.CN || hostname}`,
        ];

        if (daysLeft <= 0) return { name, status: 'fail', score: 0, summary: 'SSL certificate has expired.', details };
        if (daysLeft <= 14) return { name, status: 'warn', score: 40, summary: `SSL expires in ${daysLeft} days. Renew immediately.`, details };
        if (daysLeft <= 30) return { name, status: 'warn', score: 70, summary: `SSL expires in ${daysLeft} days. Renewal due soon.`, details };

        return { name, status: 'pass', score: 100, summary: `SSL is valid. Expires in ${daysLeft} days.`, details };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { name, status: 'fail', score: 0, summary: 'Could not verify SSL certificate.', details: [message] };
    }
}

// ─── 4. Security Headers ────────────────────────────────────
export async function runSecurityHeaderCheck(url: string): Promise<CheckResult> {
    const name = 'Security Headers';
    try {
        const res = await fetch(url, {
            signal: AbortSignal.timeout(10000),
            headers: { 'User-Agent': 'WhoisAlfaz-AuditBot/1.0' },
            redirect: 'follow',
        });

        const headers = res.headers;
        const details: string[] = [];
        let score = 100;

        const checks: [string, string, number][] = [
            ['strict-transport-security', 'HSTS', 20],
            ['x-content-type-options', 'X-Content-Type-Options', 15],
            ['x-frame-options', 'X-Frame-Options', 15],
            ['content-security-policy', 'Content-Security-Policy', 15],
            ['referrer-policy', 'Referrer-Policy', 10],
            ['permissions-policy', 'Permissions-Policy', 10],
        ];

        for (const [header, label, weight] of checks) {
            if (headers.get(header)) {
                details.push(`✅ ${label} is set`);
            } else {
                details.push(`❌ Missing ${label}`);
                score -= weight;
            }
        }

        score = Math.max(0, score);
        const status = score >= 80 ? 'pass' : score >= 50 ? 'warn' : 'fail';
        const summary = score >= 80 ? 'Security headers are well configured.' : score >= 50 ? 'Some security headers are missing.' : 'Critical security headers are missing.';

        return { name, status, score, summary, details };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { name, status: 'fail', score: 0, summary: 'Could not check security headers.', details: [message] };
    }
}

// ─── 5. Robots.txt & Sitemap ────────────────────────────────
export async function runSitemapCheck(url: string): Promise<CheckResult> {
    const name = 'Robots.txt & Sitemap';
    try {
        const origin = new URL(url).origin;
        const details: string[] = [];
        let score = 100;

        // Check robots.txt
        try {
            const robotsRes = await fetch(`${origin}/robots.txt`, { signal: AbortSignal.timeout(5000) });
            if (robotsRes.ok) {
                const text = await robotsRes.text();
                details.push('✅ robots.txt exists');
                if (text.toLowerCase().includes('disallow: /')) {
                    details.push('⚠️ robots.txt blocks crawlers on some paths — verify this is intentional');
                }
                if (text.toLowerCase().includes('sitemap:')) {
                    details.push('✅ Sitemap reference found in robots.txt');
                } else {
                    details.push('⚠️ No sitemap reference in robots.txt');
                    score -= 10;
                }
            } else {
                details.push('❌ No robots.txt found');
                score -= 25;
            }
        } catch {
            details.push('❌ Could not fetch robots.txt');
            score -= 25;
        }

        // Check sitemap.xml
        try {
            const sitemapRes = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(5000) });
            if (sitemapRes.ok) {
                const text = await sitemapRes.text();
                const urlCount = (text.match(/<loc>/g) || []).length;
                details.push(`✅ sitemap.xml exists (${urlCount} URLs)`);
                if (urlCount === 0) {
                    details.push('⚠️ Sitemap is empty — no URLs listed');
                    score -= 15;
                }
            } else {
                details.push('❌ No sitemap.xml found');
                score -= 25;
            }
        } catch {
            details.push('❌ Could not fetch sitemap.xml');
            score -= 25;
        }

        score = Math.max(0, score);
        const status = score >= 80 ? 'pass' : score >= 50 ? 'warn' : 'fail';
        const summary = score >= 80 ? 'Robots and sitemap are properly configured.' : score >= 50 ? 'Partial configuration — some improvements needed.' : 'Missing critical crawl directives.';

        return { name, status, score, summary, details };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { name, status: 'fail', score: 0, summary: 'Could not check robots/sitemap.', details: [message] };
    }
}

// ─── 6. DNS & HTTP/2 ────────────────────────────────────────
export async function runDNSCheck(url: string): Promise<CheckResult> {
    const name = 'DNS & Connectivity';
    try {
        const hostname = new URL(url).hostname;
        const details: string[] = [];
        let score = 100;

        // DNS resolution
        const startDns = Date.now();
        const addresses = await dns.resolve4(hostname);
        const dnsTime = Date.now() - startDns;

        details.push(`✅ DNS resolves to ${addresses[0]} (${dnsTime}ms)`);
        if (dnsTime > 200) {
            details.push('⚠️ DNS resolution is slow (>200ms)');
            score -= 10;
        }

        // Check if multiple IPs (CDN indicator)
        if (addresses.length > 1) {
            details.push(`✅ Multiple IPs detected (${addresses.length}) — likely using a CDN`);
        }

        // IPv6 support
        try {
            const ipv6 = await dns.resolve6(hostname);
            if (ipv6.length > 0) details.push('✅ IPv6 (AAAA record) supported');
        } catch {
            details.push('⚠️ No IPv6 (AAAA record) — consider adding for future-proofing');
            score -= 5;
        }

        // Check redirect chain
        const res = await fetch(url, {
            signal: AbortSignal.timeout(10000),
            redirect: 'manual',
        });
        if (res.status >= 300 && res.status < 400) {
            const location = res.headers.get('location');
            details.push(`⚠️ Redirect detected: ${res.status} → ${location}`);
            score -= 5;
        } else {
            details.push(`✅ No redirect chain (HTTP ${res.status})`);
        }

        score = Math.max(0, score);
        const status = score >= 80 ? 'pass' : score >= 50 ? 'warn' : 'fail';
        const summary = score >= 80 ? 'DNS and connectivity are healthy.' : 'Some connectivity concerns found.';

        return { name, status, score, summary, details };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { name, status: 'fail', score: 0, summary: 'DNS resolution failed — domain may not exist or is unreachable.', details: [message] };
    }
}

// ─── Score Calculator ───────────────────────────────────────
export function calculateOverallScore(checks: CheckResult[]): { score: number; grade: string } {
    const weights: Record<string, number> = {
        'Performance & Core Web Vitals': 0.35,
        'Meta Tags & Open Graph': 0.20,
        'SSL Certificate': 0.15,
        'Security Headers': 0.10,
        'Robots.txt & Sitemap': 0.10,
        'DNS & Connectivity': 0.10,
    };

    let totalWeight = 0;
    let weightedScore = 0;

    for (const check of checks) {
        const w = weights[check.name] || 0.1;
        weightedScore += check.score * w;
        totalWeight += w;
    }

    const score = Math.round(weightedScore / totalWeight);

    let grade: string;
    if (score >= 90) grade = 'A';
    else if (score >= 80) grade = 'B';
    else if (score >= 70) grade = 'C';
    else if (score >= 50) grade = 'D';
    else grade = 'F';

    return { score, grade };
}

// ─── Run Full Audit ─────────────────────────────────────────
export async function runFullAudit(url: string): Promise<AuditResults> {
    const normalized = normalizeTargetUrl(url);
    // Run all checks in parallel
    const checks = await Promise.all([
        runPageSpeedCheck(normalized),
        runMetaTagCheck(normalized),
        runSSLCheck(normalized),
        runSecurityHeaderCheck(normalized),
        runSitemapCheck(normalized),
        runDNSCheck(normalized),
    ]);

    const { score, grade } = calculateOverallScore(checks);

    return {
        url,
        timestamp: new Date().toISOString(),
        overallScore: score,
        grade,
        checks,
    };
}
