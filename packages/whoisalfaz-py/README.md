# whoisalfaz

> **Personal developer toolset, interactive digital business card, and technical SEO audit engine for [whoisalfaz.me](https://whoisalfaz.me).**

[![PyPI version](https://img.shields.io/pypi/v/whoisalfaz.svg)](https://pypi.org/project/whoisalfaz/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python Versions](https://img.shields.io/pypi/pyversions/whoisalfaz.svg)](https://pypi.org/project/whoisalfaz/)
[![Portfolio](https://img.shields.io/badge/Portfolio-whoisalfaz.me-cyan)](https://whoisalfaz.me)
[![Web Audit Tool](https://img.shields.io/badge/Web%20Audit-whoisalfaz.me-emerald)](https://whoisalfaz.me/audit/)

A lightweight Python CLI utility providing instant terminal access to Alfaz Mahmud Rizve's automation blueprints, consulting services, and built-in website audit diagnostic engine.

---

## ⚡ Quickstart

### 1. Installation
Install from PyPI:

```bash
pip install whoisalfaz
```

### 2. View Developer Information
Run the command without arguments to display Alfaz's interactive developer card:

```bash
whoisalfaz
```

### 3. Run a Full Website Audit
Benchmark any domain for Core Web Vitals, SSL certificates, DNS health, and security headers:

```bash
whoisalfaz audit https://example.com
```

Or pass the URL directly:

```bash
whoisalfaz https://example.com
```

---

## 🔍 Audit Engine Diagnostics

The CLI runs 6 parallel diagnostic checks against the target website:
* **Core Web Vitals & Real Performance:** FCP, CLS, TBT, and server response time (TTFB).
* **SSL Certificate Validity:** Cipher strength, SAN domain coverage, and expiration days.
* **Security Headers:** Strict-Transport-Security (HSTS), Content-Security-Policy (CSP), and X-Frame-Options.
* **DNS Resolution:** Root DNS, A/AAAA records, and network routing.
* **Meta Tags & Social Cards:** Title length, meta descriptions, and OpenGraph/Twitter previews.
* **Robots.txt & Sitemap:** Crawler directives and indexation hygiene.

Every audit produces a live interactive scorecard on [whoisalfaz.me/audit/](https://whoisalfaz.me/audit/).

---

## 📚 Resources & Architecture Guides

* **Author Portfolio & Consulting:** [https://whoisalfaz.me](https://whoisalfaz.me)
* **Free Browser Audit Tool:** [https://whoisalfaz.me/audit/](https://whoisalfaz.me/audit/)
* **120+ Technical In-Depth Guides:** [https://whoisalfaz.me/blog/](https://whoisalfaz.me/blog/)
* **Screaming Frog Alternatives Guide:** [https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/](https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/)

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me)
