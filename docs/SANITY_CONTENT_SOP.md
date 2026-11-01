# Sanity CMS Content Standard Operating Procedure (SOP)

**Target Entity:** `whoisalfaz.me`  
**Audience:** Mikey & Content Contributors  
**Classification:** Internal Operating Standard  

---

## 1. Architecture Overview
`whoisalfaz.me` uses **Sanity CMS** as its headless content database.
* The Next.js frontend fetches published posts at build time and on-demand via `lib/sanity.client.ts`.
* Blog routes live under `/blog/[slug]`.
* Local backups and historical drafts are version-controlled in Git under `content/drafts/` (`draft-*.json`) and `data/all_sanity_posts_full.json`.

---

## 2. Safe Git-First Content Workflow for Mikey

To prevent accidental production database corruption, Mikey should follow this Git-first flow:

1. **Create Branch:**
   ```bash
   git checkout -b mikey/content-<topic-slug>
   ```
2. **Draft Article JSON:**
   Create a new draft in `content/drafts/draft-<topic-slug>.json` adhering to the Sanity schema.
3. **Open Pull Request:**
   Submit PR to `main` with the proposed content and metadata.
4. **Alfaz Review & Sync:**
   Once merged by Alfaz, the manuscript is synced directly to Sanity via the local sync script:
   ```bash
   node scripts/sync-sanity.js content/drafts/draft-<topic-slug>.json
   ```

---

## 3. Post Document Schema Structure

Every article JSON in `content/drafts/` must match this exact schema:

```json
{
  "_id": "kebab-case-slug",
  "_type": "post",
  "title": "Clear, Punchy Headline (Under 60 chars)",
  "slug": {
    "_type": "slug",
    "current": "kebab-case-slug"
  },
  "description": "Engaging meta summary (140-155 characters) for social previews.",
  "date": "2026-11-01T12:00:00.000Z",
  "publishedAt": "2026-11-01T12:00:00.000Z",
  "seoTitle": "Primary Keyword Frontloaded: Punchy Hook | whoisalfaz",
  "seoDescription": "140-155 chars with primary keyword, core benefit, and action verb. No generic AI fluff.",
  "image": {
    "_type": "image",
    "asset": {
      "_type": "reference",
      "_ref": "image-asset-id"
    }
  },
  "categories": [
    {
      "_type": "reference",
      "_ref": "category-id"
    }
  ],
  "affiliates": ["n8n", "qdrant", "vultr"],
  "body": "Markdown content string with headers, tables, and code snippets...",
  "schemaMarkup": "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"BlogPosting\",\n  \"headline\": \"...\"\n}"
}
```

---

## 4. Editorial & SEO Compliance Checks

Before submitting any draft:
- [ ] 0 Banned AI words (checked against `docs/PAGE_WRITING_RULES.md`).
- [ ] Direct 45-word Answer Engine Optimization (AEO) block under the first H2.
- [ ] Custom JSON-LD `BlogPosting` schema embedded in `schemaMarkup`.
- [ ] All code snippets verified with correct syntax highlighting and import paths.
- [ ] Images optimized in modern WebP format (<75 KB).
