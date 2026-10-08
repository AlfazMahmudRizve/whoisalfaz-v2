# whoisalfaz-audit

> **Universal TypeScript audit engine for technical SEO, Core Web Vitals scoring, and security diagnostics.**

[![Live Web Audit](https://img.shields.io/badge/Live%20Web%20Audit-whoisalfaz.me-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://whoisalfaz.me/audit/)
[![npm version](https://img.shields.io/npm/v/whoisalfaz-audit.svg)](https://www.npmjs.com/package/whoisalfaz-audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/whoisalfaz-audit)](https://bundlephobia.com/package/whoisalfaz-audit)

Zero-dependency, isomorphic TypeScript calculation and parsing engine extracted directly from the [WhoisAlfaz Website Audit Platform](https://whoisalfaz.me/audit/). Supports Node.js, Deno, Bun, and browser runtimes.

---

## ⚡ Quickstart

### 1. Library Usage (Dual ESM & CJS)

Install via npm:

```bash
npm install whoisalfaz-audit
```

#### ESM / TypeScript Import:
```typescript
import { 
  calculateAuditGrade, 
  encodeAuditResult, 
  decodeAuditResult,
  evaluatePerformanceMetrics 
} from 'whoisalfaz-audit';

// Calculate SEO / Performance Grade
const grade = calculateAuditGrade(94);
console.log(grade); 
// { grade: 'A', label: 'Excellent', color: '#10b981', score: 94 }

// Evaluate TTFB & Asset Payload
const evalResult = evaluatePerformanceMetrics({
  ttfbMs: 145,
  docSizeKb: 48,
  isCompressed: true
});
console.log(evalResult.status); // 'pass'
```

#### CommonJS Require:
```javascript
const { calculateAuditGrade } = require('whoisalfaz-audit');
```

---

### 2. Instant Terminal CLI Execution

Run comprehensive audits against any web domain without installing dependencies:

```bash
npx whoisalfaz-audit https://example.com
```

Every terminal execution generates a permanent, interactive browser report hosted on [whoisalfaz.me/audit/](https://whoisalfaz.me/audit/).

---

## 🔍 Core Features & Technical Benchmarks

* **[Interactive Web Audit Engine](https://whoisalfaz.me/audit/):** Run full 6-vector parallel diagnostic checks directly in your browser.
* **[Screaming Frog Alternatives & Benchmark Guide](https://whoisalfaz.me/blog/screaming-frog-alternatives-free-seo-audit-tools/):** In-depth comparison of free cloud crawlers and synthetic performance testing.
* **[Enterprise Automation Blueprints](https://whoisalfaz.me/blog/what-is-n8n-and-how-to-set-it-up/):** Production n8n workflows, webhook queue architectures, and AI agent memory systems.
* **[RevOps & Full-Stack Consulting](https://whoisalfaz.me/):** Engineering autonomous revenue engines for B2B SaaS and agency scale.

---

## 📦 Package Distribution

- **ESM Module:** `dist/index.mjs`
- **CommonJS Module:** `dist/index.js`
- **TypeScript Types:** `dist/index.d.ts`

---

## 📄 License

MIT © [Alfaz Mahmud Rizve](https://whoisalfaz.me)
