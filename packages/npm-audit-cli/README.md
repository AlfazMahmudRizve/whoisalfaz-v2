# WhoisAlfaz Website & Technical SEO Audit Engine

[![npm version](https://img.shields.io/npm/v/whoisalfaz-audit.svg)](https://www.npmjs.com/package/whoisalfaz-audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](https://opensource.org/licenses/MIT)

A fast, developer-friendly technical audit tool. Run instant audits directly from your terminal to inspect **Core Web Vitals, SSL certificate expiration, DNS records, Meta/OpenGraph tags, and HTTP security headers**.

Run the interactive browser audit online at:  
👉 **[https://whoisalfaz.me/audit/](https://whoisalfaz.me/audit/)**

---

## ⚡ Instant Execution (Zero Install)

Run an immediate audit on any URL using `npx`:

```bash
npx whoisalfaz-audit https://example.com
```

---

## 📦 Global Installation

```bash
npm install -g whoisalfaz-audit
```

Then run anywhere:

```bash
whoisalfaz-audit https://yourdomain.com
```

---

## 🔍 What Gets Audited?

1. **Performance & Core Web Vitals:** Time to First Byte (TTFB), total document size, and gzip/brotli compression.
2. **Meta Tags & Social Snippets:** Title length, meta description, OpenGraph preview compatibility, and canonical links.
3. **SSL/TLS Security:** Certificate validity, days until expiration, issuer authority, and cipher suite.
4. **Security Headers:** Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Referrer-Policy.
5. **Sitemaps & Crawlability:** `/sitemap.xml` presence, `robots.txt` compliance, and crawl budget indexing rules.
6. **DNS & Infrastructure:** IPv4/IPv6 resolution, nameserver propagation, and MX mail record health.

---

## 🌐 Full Interactive Web Version

For visual scorecards, shareable report links, and email delivery, visit:  
**[https://whoisalfaz.me/audit/](https://whoisalfaz.me/audit/)**

Engineered by **[Alfaz Mahmud Rizve](https://whoisalfaz.me/)** — RevOps & Automation Architect.
