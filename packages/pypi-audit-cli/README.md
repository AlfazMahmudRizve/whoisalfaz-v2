# whoisalfaz-audit

> **Instant technical SEO, Core Web Vitals, SSL certificate, and DNS auditor CLI.**

[![PyPI version](https://img.shields.io/pypi/v/whoisalfaz-audit.svg)](https://pypi.org/project/whoisalfaz-audit/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python Versions](https://img.shields.io/pypi/pyversions/whoisalfaz-audit.svg)](https://pypi.org/project/whoisalfaz-audit/)
[![Web Audit](https://img.shields.io/badge/Web%20Audit-whoisalfaz.me-emerald)](https://whoisalfaz.me/audit/)

A lightweight, zero-dependency Python CLI tool to inspect websites for performance bottlenecks, security flaws, SSL expiration, DNS latency, and SEO indexing readiness.

---

## ⚡ Quickstart

### 1. Installation
Install globally or inside your virtual environment using `pip`:

```bash
pip install whoisalfaz-audit
```

### 2. Run an Audit
Audit any URL directly from your command line:

```bash
whoisalfaz-audit https://example.com
```

Or execute as a Python module:

```bash
python -m whoisalfaz_audit.cli https://example.com
```

---

## 🔍 What It Inspects

The audit engine executes 6 parallel diagnostic checks against the target domain:

1. **Performance & Core Web Vitals:** First Contentful Paint (FCP), Cumulative Layout Shift (CLS), Total Blocking Time (TBT), and DOM payload weight.
2. **SSL Certificate Health:** Certificate issuer validity, protocol cipher grade, SAN coverage, and days until expiration.
3. **Security Headers:** Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), X-Frame-Options, and X-Content-Type-Options.
4. **DNS & Network Latency:** Root DNS record resolution, A/AAAA/MX routing, and Time to First Byte (TTFB).
5. **Meta Tags & Social Graph:** Title tag length, meta description snippet targeting, Open Graph (`og:*`), and Twitter card rendering.
6. **Robots.txt & XML Sitemap:** Crawler access rules, sitemap declaration, and indexability hygiene.

---

## 🌐 Interactive Web Dashboard

Prefer a graphical breakdown? Run instant, registration-free audits in your browser:

👉 **[https://whoisalfaz.me/audit/](https://whoisalfaz.me/audit/)**

Every CLI run also automatically outputs an interactive, shareable web report link so you can forward visual scorecards to your team or clients.

---

## 📚 Technical Guides & Resources

* **In-Depth Guide:** [Free SEO Audit Tools & Screaming Frog Alternatives](https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/)
* **Next.js & n8n Automation Workflows:** [Explore 120+ Technical Blueprints](https://whoisalfaz.me/blog/)
* **Enterprise Consulting:** [Work with Alfaz Mahmud Rizve](https://whoisalfaz.me/)

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me/)
