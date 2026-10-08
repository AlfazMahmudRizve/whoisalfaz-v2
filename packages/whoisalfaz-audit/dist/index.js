"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  calculateAuditGrade: () => calculateAuditGrade,
  decodeAuditResult: () => decodeAuditResult,
  encodeAuditResult: () => encodeAuditResult,
  evaluateMetaTags: () => evaluateMetaTags,
  evaluatePerformanceMetrics: () => evaluatePerformanceMetrics,
  evaluateSecurityHeaders: () => evaluateSecurityHeaders,
  normalizeTargetUrl: () => normalizeTargetUrl
});
module.exports = __toCommonJS(index_exports);
function normalizeTargetUrl(url) {
  if (!url) return "";
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }
  return normalized.replace(/^(https?:\/\/)\/+/i, "$1");
}
function calculateAuditGrade(score) {
  const boundedScore = Math.max(0, Math.min(100, Math.round(score)));
  if (boundedScore >= 90) {
    return { grade: "A", label: "Excellent", color: "#10b981", score: boundedScore };
  }
  if (boundedScore >= 80) {
    return { grade: "B", label: "Good", color: "#06b6d4", score: boundedScore };
  }
  if (boundedScore >= 70) {
    return { grade: "C", label: "Needs Improvement", color: "#f59e0b", score: boundedScore };
  }
  if (boundedScore >= 50) {
    return { grade: "D", label: "Poor", color: "#f97316", score: boundedScore };
  }
  return { grade: "F", label: "Critical Failure", color: "#ef4444", score: boundedScore };
}
function encodeAuditResult(results) {
  const data = {
    u: results.url,
    o: results.overallScore,
    g: results.grade,
    c: results.checks.map((ch) => ({
      n: ch.name,
      s: ch.score,
      st: ch.status,
      sm: ch.summary
    })),
    t: Date.now()
  };
  const json = JSON.stringify(data);
  let base64;
  if (typeof window !== "undefined" && typeof btoa === "function") {
    base64 = btoa(encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
  } else if (typeof Buffer !== "undefined") {
    base64 = Buffer.from(json).toString("base64");
  } else {
    throw new Error("No base64 encoder available in current runtime environment.");
  }
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function decodeAuditResult(hash) {
  try {
    let base64 = hash.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    let json;
    if (typeof window !== "undefined" && typeof atob === "function") {
      const binary = atob(base64);
      const percentEncoded = Array.prototype.map.call(binary, (ch) => "%" + ("00" + ch.charCodeAt(0).toString(16)).slice(-2)).join("");
      json = decodeURIComponent(percentEncoded);
    } else if (typeof Buffer !== "undefined") {
      json = Buffer.from(base64, "base64").toString("utf8");
    } else {
      return null;
    }
    return JSON.parse(json);
  } catch {
    return null;
  }
}
function evaluatePerformanceMetrics(input) {
  let score = 100;
  const details = [];
  if (input.ttfbMs > 1200) {
    score -= 30;
    details.push(`High TTFB: ${input.ttfbMs}ms (optimal < 200ms)`);
  } else if (input.ttfbMs > 600) {
    score -= 20;
    details.push(`Moderate TTFB: ${input.ttfbMs}ms`);
  } else if (input.ttfbMs > 300) {
    score -= 10;
    details.push(`Acceptable TTFB: ${input.ttfbMs}ms`);
  } else {
    details.push(`Fast TTFB: ${input.ttfbMs}ms`);
  }
  if (input.docSizeKb > 300) {
    score -= 25;
    details.push(`Heavy HTML document: ${input.docSizeKb}KB (>300KB threshold)`);
  } else if (input.docSizeKb > 150) {
    score -= 15;
    details.push(`Document size: ${input.docSizeKb}KB`);
  } else {
    details.push(`Lightweight document: ${input.docSizeKb}KB`);
  }
  if (!input.isCompressed) {
    score -= 15;
    details.push("Gzip/Brotli HTTP compression not detected on HTML payload");
  } else {
    details.push("Modern HTTP compression enabled (gzip/brotli)");
  }
  if (input.scriptCount && input.scriptCount > 30) {
    score -= 10;
    details.push(`Excessive script tags detected (${input.scriptCount})`);
  }
  const finalScore = Math.max(10, Math.min(100, score));
  return {
    name: "Performance & Core Web Vitals",
    score: finalScore,
    status: finalScore >= 80 ? "pass" : finalScore >= 50 ? "warn" : "fail",
    summary: finalScore >= 80 ? "Fast server response and lightweight DOM payload." : "Performance bottlenecks detected.",
    details
  };
}
function evaluateSecurityHeaders(headers) {
  let score = 100;
  const details = [];
  if (!headers.strictTransportSecurity) {
    score -= 30;
    details.push("Missing Strict-Transport-Security (HSTS) header");
  } else {
    details.push("Strict-Transport-Security (HSTS) active");
  }
  if (!headers.contentSecurityPolicy) {
    score -= 30;
    details.push("Missing Content-Security-Policy (CSP) header");
  } else {
    details.push("Content-Security-Policy (CSP) active");
  }
  if (!headers.xFrameOptions) {
    score -= 20;
    details.push("Missing X-Frame-Options (Clickjacking vulnerability)");
  } else {
    details.push("X-Frame-Options configured");
  }
  if (!headers.xContentTypeOptions) {
    score -= 20;
    details.push("Missing X-Content-Type-Options: nosniff");
  } else {
    details.push("X-Content-Type-Options: nosniff active");
  }
  const finalScore = Math.max(0, Math.min(100, score));
  return {
    name: "Security Headers",
    score: finalScore,
    status: finalScore >= 80 ? "pass" : finalScore >= 50 ? "warn" : "fail",
    summary: finalScore >= 80 ? "Critical HTTP security headers are in place." : "Missing essential security headers.",
    details
  };
}
function evaluateMetaTags(meta) {
  let score = 100;
  const details = [];
  if (!meta.title) {
    score -= 40;
    details.push("Missing <title> tag");
  } else if (meta.title.length < 30 || meta.title.length > 60) {
    score -= 15;
    details.push(`Title tag length (${meta.title.length} chars) outside optimal 30-60 character range`);
  } else {
    details.push(`Title tag length (${meta.title.length} chars) is optimal`);
  }
  if (!meta.description) {
    score -= 30;
    details.push('Missing <meta name="description"> tag');
  } else if (meta.description.length < 120 || meta.description.length > 160) {
    score -= 10;
    details.push(`Meta description (${meta.description.length} chars) outside recommended 120-160 range`);
  } else {
    details.push(`Meta description (${meta.description.length} chars) is optimal`);
  }
  if (!meta.ogTitle || !meta.ogImage) {
    score -= 15;
    details.push("Incomplete OpenGraph tags (og:title, og:image)");
  } else {
    details.push("OpenGraph cards properly configured");
  }
  const finalScore = Math.max(10, Math.min(100, score));
  return {
    name: "Meta Tags & Open Graph",
    score: finalScore,
    status: finalScore >= 80 ? "pass" : finalScore >= 50 ? "warn" : "fail",
    summary: finalScore >= 80 ? "Meta tags and social cards are search-ready." : "Meta tags need SEO optimization.",
    details
  };
}
