# SOP: Technical Blog & Content Workflow

This file is the single source of truth for generating, refurbishing, and posting technical content (including "Automation Tools" hubs, and "Architecture Teardowns"). Read this **EVERY TIME** before starting a content task.

## 1. Filename Policy
- **NEVER** change the existing filename of an MDX file once it is established.
- For all articles, match the slug (e.g., `manychat-pricing-2026.mdx`).

## 2. Frontmatter Rules
- **Slug**: Must match the user's provided slug exactly (e.g., `automations-for-saas-and-agencies`).
- **Date**: Set the current real-world date of the task.
- **Image**: Verify the file exists in `/public/images/blog/` before setting the path. 

## 3. Content Integrity & Formatting
- **Contextual Awareness**: Always scan the content to understand its category. Ensure a professional, authoritative tone suitable for technical guides, tool reviews, or architecture teardowns.
- **Verbatim + Fixes**: Keep the user's provided core text but **correct** logical errors and enhance flow.
- **Highlighting Text**: Apply **bolding** to key tools and insights for readability.
- **Highlighting Headings**: If a specific heading or question needs to stand out visually, wrap the text inside the heading with a `<mark>` tag (e.g., `## <mark>What Is ManyChat?</mark>`).

## 4. Image Generation & HTML Usage
- **Image Generation Requirement**: You MUST proactively generate **exactly 3 high-quality images** for every new blog post using the `generate_image` tool:
  1. `[slug]-featured.png`: A premium, sleek featured image (e.g., abstract tech dashboard, glassmorphism) for the frontmatter.
  2. `[slug]-body-1.png`: A conceptual or architectural diagram illustrating the first major technical concept in the post.
  3. `[slug]-body-2.png`: A workflow, comparison, or secondary architectural diagram illustrating the next major concept.
- **Heading Spacing**: ALWAYS leave exactly one empty line before and after a heading (`##` or `###`).
- **Template Utilization**: Do NOT manually add `<hr>` tags or "By Alfaz..." author bylines. These are organically injected by the Next.js `app/blog/[slug]/page.js` render template. Use pure markdown formatting globally.
- **Image Placement**: Embed the 2 body images naturally within the content where they provide the most value. Do NOT use standard markdown image syntax (`![alt](url)`). Use the HTML `<img>` tag: `<img src="/images/blog/filename.png" alt="Alt Text" />`. This ensures the custom MDX `BlogImage` lightbox component intercepts and renders the image correctly. Add one empty line before and after the image.
- **Tables**: Do NOT use markdown tables (`| Col | Col |`). The site does not use `remark-gfm` and they will render incorrectly. Use raw HTML `<table>` elements. 
  - To make tables responsive, apply Tailwind classes directly to the table: `<table className="block overflow-x-auto w-full text-left border-collapse text-sm my-6">`.
  - **CRITICAL**: Do NOT wrap tables in `<div className="overflow-x-auto">`. This causes `<p><div>` nesting hydration errors in MDX.
- **Bullet Points**: Use consistent indentation and spacing for nested lists.

## 5. Affiliate Link Integration
Intelligently embed affiliate links within the narrative for all tools listed in the `affiliates:` frontmatter.
- **Keyword Mapping**: You MUST map the proper keyword/tool name directly to its corresponding proper affiliate link throughout the text. Do not just link "click here".
- **Inline Linking**: ALWAYS bold affiliate links embedded in paragraphs to make them stand out (e.g., `**[ManyChat](https://manychat.partnerlinks.io/jugrrxxzawym)**`).
- **CTA Highlighting**: ALWAYS bold the primary call-to-action link for an affiliate (e.g., **[Get started with Tool →](URL)**).
- **Descriptive Links**: Use descriptive text for links rather than just the URL or generic "click here".

Example Affiliate Links:
- **ManyChat**: `https://manychat.partnerlinks.io/jugrrxxzawym`
- **ManyChatIGSummit**: `https://manychat.partnerlinks.io/jugrrxxzawym`
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

## 6. Do Not Include "Deploying the Stacks" Section
We now use a dynamic deploy stack setup. Do **NOT** manually append a "Deploying the Stacks" markdown section to the end of any blog posts. Just list the required platforms inside the `affiliates:` array in the YAML frontmatter, and the frontend will dynamically generate the block.

## 7. Internal Linking
- **Contextual Linking**: Always proactively identify keywords related to existing content (e.g., "n8n", "Webhook", "Brevo", "ManyChat") and inject markdown links to those posts using relative paths (e.g., `[n8n webhooks](/blog/capture-n8n-lead-data)`).

## 8. Stability Rules (Mandatory)
- **Frontmatter format**: All YAML values MUST use single-line double-quoted strings. **NEVER** use `>-` folded scalars — they cause `gray-matter` parsing failures that crash the entire site.
- **Code block language**: Every fenced code block MUST specify a language (e.g. ` ```json `, ` ```text `, ` ```javascript `). Empty ` ``` ` blocks are **FORBIDDEN** — they trigger catastrophic regex backtracking in the MDX compiler.
- **Category naming rules**: 
    - For Case Studies/Portfolio posts: Must always be `Architecture Teardowns`.
    - For tool comparisons/guides: Use `Automation Tools` (or contextually appropriate hub categories).
- **Visual verification**: Before declaring ANY blog complete, open it in the browser and visually confirm spacing, headers, images, and code blocks render correctly. Screenshots recommended.

## 9. Verification Checklist
- [ ] Filenames match the slug?
- [ ] Exactly 3 images generated (1 featured, 2 body) and mapped properly?
- [ ] Images use `<img>` tags instead of markdown syntax?
- [ ] Tables use raw `<table>` with `block overflow-x-auto` classes and no wrapper `<div>`?
- [ ] Affiliate links in body copy are **bolded**?
- [ ] Headings/questions to be highlighted use `<mark>` tags?
- [ ] Internal links to previous days included?
- [ ] "Deploying the Stacks" section dynamically populated via frontmatter?
- [ ] Frontmatter uses single-line quoted strings (no `>-`)?
- [ ] All code blocks have explicit language tags?
- [ ] SSG Build passes (`npm run build`)?
- [ ] Visually verified in browser?
