# SOP: Technical Blog & Content Workflow (Sanity CMS)

This file is the single source of truth for generating and posting technical content. Read this **EVERY TIME** before starting a content task.

## 1. Publishing Workflow

All content is managed via the **Sanity CMS**. There are two ways to publish:

### A. Via the Studio UI
1. Navigate to `/studio` on the live site or `http://localhost:3000/studio/` locally.
2. Log in with your Sanity credentials.
3. Click **Post** → **Create new** → Fill in all fields → **Publish**.

### B. Via the AI Publishing Script (Recommended for AI-generated content)
1. Create a JSON file matching the Sanity `post` schema (see Section 4).
2. Run: `node scripts/publishToSanity.js <path-to-draft.json>`
3. The post is instantly live in the database.
4. **CRITICAL GIT & DEPLOY SYNC:** You MUST run `npm run push-all` after any content additions, ledger updates, or code changes to push the commits to GitHub (`origin main`) and trigger the live production deployment to DigitalOcean (`deploy main`).

## 2. Content Schema

Every post in Sanity has the following fields:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | ✅ | The blog post title |
| `slug` | slug | ✅ | URL-safe identifier (auto-generated from title) |
| `description` | text | ✅ | Used for blog index cards and SEO |
| `date` | datetime | ✅ | Publication date (ISO 8601) |
| `seoTitle` | string | ✅ | Override for the HTML `<title>` tag |
| `seoDescription` | text | ✅ | Override for the meta description |
| `image` | image | ✅ | Cover image (drag-and-drop in Studio, or upload via API) |
| `categories` | reference[] | ✅ | Link to Category documents |
| `affiliates` | string[] | — | Affiliate tool slugs (e.g., `n8n`, `brevo`) |
| `body` | markdown | ✅ | Full article content in Markdown |

## 3. Content Formatting Rules

- **Tone**: Professional, authoritative, suitable for technical guides.
- **Highlighting Headings**: Wrap standout headings with `<mark>` (e.g., `## <mark>What Is ManyChat?</mark>`).
- **Bold Key Tools**: Apply **bolding** to key tools and insights.
- **Heading Spacing**: Always leave one empty line before and after headings.
- **No Manual Bylines**: Author bylines are injected by the Next.js render template.
- **Image Embedding in Body**: Use `<img src="https://cdn.sanity.io/..." alt="Alt Text" />` for inline images.
- **Tables**: Use raw HTML `<table>` elements with Tailwind classes. Do NOT use markdown tables.

## 4. JSON Draft Template

```json
{
  "_type": "post",
  "title": "Your Post Title",
  "slug": { "_type": "slug", "current": "your-post-slug" },
  "description": "A brief description for the blog index.",
  "date": "2026-01-01T00:00:00.000Z",
  "seoTitle": "SEO Optimized Title",
  "seoDescription": "Meta description for search engines.",
  "image": "/path/to/local/image-or-upload-separately",
  "body": "## Your Markdown Content\n\nFull article body here."
}
```

## 5. Image Requirements

- **Cover Images**: Upload directly via Sanity Studio (drag-and-drop) or via the API. Images are hosted on `cdn.sanity.io`.
- **Body Images**: For every new post, generate **3 images**:
  1. `[slug]-featured.png`: Premium featured image for the cover.
  2. `[slug]-body-1.png`: Conceptual diagram for the first major concept.
  3. `[slug]-body-2.png`: Workflow or architectural diagram.
- Upload body images to Sanity and embed the CDN URL in the markdown body.

## 6. Categories

Categories are separate Sanity documents. To assign a category via the script, you need the category's Sanity `_id`. Existing categories:
- 30 Days of n8n & Automation
- Architecture Teardowns
- Automation Tools

## 7. Quality Control & Competitor Benchmarking

To ensure every technical asset is a world-class, 10/10 portfolio piece, the writing engine must strictly adhere to the following workflow:
1. **Initial Draft Writing:** Compile the deep-dive technical copy, code blocks, schemas, and formatting matching the guidelines.
2. **Competitor Comparison:** Once the raw draft is generated, programmatically search and analyze the top 3 competing search results for the given title/intent. Identify their strengths, structural layout, technical specs, and any weaknesses or missing details in their tutorials.
3. **Refinement & Gap Closure:** Refine and expand the draft to ensure your content is comprehensively superior. Close all identified technical gaps, add deeper real-world engineering context, verify code blocks, and enhance AEO/GEO semantic triggers before publishing the draft to Sanity.
