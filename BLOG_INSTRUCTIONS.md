# SOP: Blog Refurbishment Workflow

This file is the single source of truth for refurbishing and posting blogs in the "Learn Automation in 30 Days" series. Read this **EVERY TIME** before starting a blog task.

## 1. Filename Policy
- **NEVER** change the existing filename of an MDX file once it is established (e.g., `day-5.mdx`).
- Do not use the slug as the filename. Stay with the sequential `day-X.mdx` format for easier navigation.

## 2. Frontmatter Rules
- **Slug**: Must match the user's provided slug exactly (e.g., `automations-for-saas-and-agencies`).
- **Date**: Set the current real-world date of the task.
- **Image**: Verify the file exists in `/public/images/blog/` before setting the path.

## 3. Content Integrity & Day Correction
- **Sequential Context**: Always scan the content for "Day X" references. 
- **Verbatim + Fixes**: Keep the user's provided text but **correct** logical errors (e.g., if it's Day 5, ensure it says "Day 5 Mandate" and "Tomorrow, in Day 6").
- **Highlighting**: Apply **bolding** to key tools and insights for readability.

## 4. Structural Hierarchy & Spacing
- **Heading Spacing**: ALWAYS leave exactly one empty line before and after a heading (`##` or `###`).
- **Template Utilization**: Do NOT manually add `<hr>` tags or "By Alfaz..." author bylines. These are organically injected by the Next.js `app/blog/[slug]/page.js` render template. Use pure markdown formatting globally.
- **Image Placement**: Use the standard markdown syntax for images: `![Alt Text](/images/blog/filename.webp)`. Add one empty line before and after the image.
- **Bullet Points**: Use consistent indentation and spacing for nested lists.

## 5. Affiliate Link Integration
Intelligently embed affiliate links within the narrative for all the affilate list given and mentioned in the blog.
- **CTA Highlighting**: ALWAYS bold the primary call-to-action link for an affiliate (e.g., **[Get started with Tool →](URL)**).
- **Descriptive Links**: Use descriptive text for links rather than just the URL or generic "click here".

Example Affiliate Links:
- **n8n**: `https://n8n.partnerlinks.io/ch585gsqzanp`
- **Vultr**: `https://www.vultr.com/?ref=9859101-9J`
- **Apollo**: `https://get.apollo.io/bs1ny1i5eigv`
- **Monday.com**: `https://try.monday.com/66vrkkiezhrz`
- **Brevo**: `https://get.brevo.com/6b88c13841c4`
- **Databox**: `https://join.databox.com/qfzdqmwp7elc`
- **Pinecone**: `https://try.pinecone.io/ra3cq48xakg6`
- **Emergent**: `https://get.emergent.sh/f7yhqncomeyr`
- **Tapstitch**: `https://affiliate.tapstitch.com/7k2jjtg3dl0f`
- **AiSDR**: `https://partner.aisdr.com/2jffam3qqf6h`
- **Accelerated Growth**: `https://acceleratedgrowthstudio.partnerlinks.io/ferzzxgyi9p3`
## 5. Mandatory "Deploying the Stacks" Section
Every post **MUST** end with a dedicated "Deploying the Stacks" section before the final Strategy Call CTA. Use separate `###` headers for each tool mentioned in the post.

Example Format:
```markdown
## Deploying the Stacks
[Brief intro about the tools used today]

### 1. The Engine: [n8n](...)
[Description]
[CTA Link]

... [Repeat for others] ...
```

## 6. Internal Linking
- **Contextual Linking**: Always proactively identify keywords related to previous 30-Day posts (e.g. "Day 9", "Day 8", "Webhook", "Error Handling") and inject markdown links to those posts using relative paths (e.g., `[Day 8](/blog/capture-n8n-lead-data...)`).

## 7. Stability Rules (Mandatory)
- **Frontmatter format**: All YAML values MUST use single-line double-quoted strings. **NEVER** use `>-` folded scalars — they cause `gray-matter` parsing failures that crash the entire site.
- **Code block language**: Every fenced code block MUST specify a language (e.g. ` ```json `, ` ```text `, ` ```javascript `). Empty ` ``` ` blocks are **FORBIDDEN** — they trigger catastrophic regex backtracking in the MDX compiler.
- **Category naming rules**: 
    - For 30 Days of n8n posts: Must always be `Learn Automation in 30 Days`. Never use legacy names.
    - For Case Studies/Portfolio posts: Must always be `Architecture Teardowns`.
- **Visual verification**: Before declaring ANY blog complete, open it in the browser and visually confirm spacing, headers, images, and code blocks render correctly. Screenshots recommended.

## 8. Verification Checklist
- [ ] Filenames unchanged?
- [ ] Slug matches user request?
- [ ] Day numbers are mathematically correct (Today = X, Tomorrow = X+1)?
- [ ] All 6 potential affiliate links checked?
- [ ] Internal links to previous days included?
- [ ] "Deploying the Stacks" section included?
- [ ] Frontmatter uses single-line quoted strings (no `>-`)?
- [ ] All code blocks have explicit language tags?
- [ ] SSG Build passes (`npm run build`)?
- [ ] Visually verified in browser?
