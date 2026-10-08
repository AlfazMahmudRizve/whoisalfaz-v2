/**
 * whoisalfaz-audit
 * Universal TypeScript engine for SEO, Core Web Vitals, and technical audit scoring.
 * Zero-dependency, isomorphic (runs in Node.js, Deno, Bun, and browser).
 *
 * Official Web Tool: https://whoisalfaz.me/audit/
 * Documentation: https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/
 * Author: Alfaz Mahmud Rizve (https://whoisalfaz.me)
 */
export interface CheckEvaluation {
    name: string;
    status: 'pass' | 'warn' | 'fail';
    score: number;
    summary: string;
    details: string[];
}
export interface ShareableCheck {
    n: string;
    s: number;
    st: string;
    sm: string;
}
export interface ShareableAuditPayload {
    u: string;
    o: number;
    g: string;
    c: ShareableCheck[];
    t: number;
}
export interface AuditGradeResult {
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    label: string;
    color: string;
    score: number;
}
export interface PerformanceMetricsInput {
    ttfbMs: number;
    docSizeKb: number;
    isCompressed: boolean;
    scriptCount?: number;
    linkCssCount?: number;
}
export interface MetaTagsInput {
    title?: string;
    description?: string;
    canonical?: string;
    ogTitle?: string;
    ogImage?: string;
    twitterCard?: string;
}
export interface SecurityHeadersInput {
    strictTransportSecurity?: string;
    contentSecurityPolicy?: string;
    xFrameOptions?: string;
    xContentTypeOptions?: string;
    referrerPolicy?: string;
}
/**
 * Normalizes a URL for consistent auditing and canonical checking.
 */
export declare function normalizeTargetUrl(url: string): string;
/**
 * Calculates a letter grade and UI color token based on an audit score (0-100).
 */
export declare function calculateAuditGrade(score: number): AuditGradeResult;
/**
 * Encodes an audit result payload into a compact, URL-safe base64 hash.
 * Works seamlessly in both browser and Node.js environments.
 */
export declare function encodeAuditResult(results: {
    url: string;
    overallScore: number;
    grade: string;
    checks: Array<{
        name: string;
        score: number;
        status: string;
        summary: string;
    }>;
}): string;
/**
 * Decodes a URL-safe base64 audit hash back into structured audit data.
 */
export declare function decodeAuditResult(hash: string): ShareableAuditPayload | null;
/**
 * Evaluates performance metrics against Core Web Vitals and TTFB standards.
 */
export declare function evaluatePerformanceMetrics(input: PerformanceMetricsInput): CheckEvaluation;
/**
 * Evaluates crucial security headers (HSTS, CSP, X-Frame-Options).
 */
export declare function evaluateSecurityHeaders(headers: SecurityHeadersInput): CheckEvaluation;
/**
 * Evaluates HTML meta tags for SEO and Social Graph previews.
 */
export declare function evaluateMetaTags(meta: MetaTagsInput): CheckEvaluation;
