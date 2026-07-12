# Full Audit Report

- URL: `https://whoisalfaz.me/`
- Generated: `2026-07-09T01:01:39.149206`
- Overall score: `83/100`
- Score confidence: `Medium`
- Scoring version: `1`

## Score Card

| Category | Weight | Score |
| --- | ---: | ---: |
| Security Headers | 8 | 100 |
| Social Meta | 5 | 92 |
| Robots and Crawlers | 8 | 80 |
| Broken Links | 10 | 92 |
| Internal Links | 8 | 80 |
| Redirects | 3 | 100 |
| AI Search | 5 | 100 |
| Performance and Core Web Vitals | 13 | 0 |
| On-Page SEO | 10 | 100 |
| Readability | 8 | 45 |
| Entity SEO | 5 | 30 |
| Link Profile | 7 | 80 |
| Hreflang | 5 | 0 |
| Content Uniqueness | 5 | 100 |

## Findings

| Severity | Area | Finding | Evidence | Fix |
| --- | --- | --- | --- | --- |
| Critical | broken_links | 🔴 1 broken link(s) found |  |  |
| Critical | link_profile | 1 orphan page(s) with zero inbound internal links. |  | Add internal links from relevant content pages to these orphan pages. |
| Warning | entity | sameAs URL returns HTTP 405: https://linkedin.com/in/alfaz-mahmud-rizve |  | Update sameAs URL for LinkedIn to a valid, non-redirecting destination. |
| Warning | entity | sameAs URL returns HTTP 404: https://x.com/whoisalfaz |  | Update sameAs URL for Twitter/X to a valid, non-redirecting destination. |
| Warning | environment | 1 broken links detected | Broken internal links hurt crawl flow and user trust. | Fix links in route components and content source files; validate with link checks in CI. |
| Warning | environment | Content readability is difficult | Long, complex text can reduce engagement and comprehension. | Rewrite key sections with shorter sentences (15-20 words), shorter paragraphs (2-4 sentences), and clearer subheadings. |
| Warning | internal_links | ⚠️ 26 potential orphan page(s) (≤1 internal link pointing to them) |  |  |
| Warning | readability | ⚠️ Content is difficult to read (Flesch: 27.5) — may reduce engagement |  |  |
| Warning | readability | ⚠️ 27.3% complex words (3+ syllables) — consider simplifying |  |  |
| Warning | robots | ⚠️ 11 AI crawlers not explicitly managed: GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended |  |  |
| Info | Wikidata | No Wikidata entry found for 'Alfaz Mahmud Rizve'. |  | If the entity meets Wikidata notability guidelines, create or improve an item with accurate third-party references. Do not create one solely for SEO. |
| Info | Wikipedia | No Wikipedia article found for 'Alfaz Mahmud Rizve'. |  | Only pursue Wikipedia if the entity meets independent notability standards. Otherwise, strengthen official schema, sameAs profiles, citations, and About/Contact signals. |
| info | article | article measurement incomplete | [article_seo.py] Traceback (most recent call last): File "C:\Users\user\.gemini\config\skills\seo\scripts\article_seo.py", line 637, in <module> main() File "C:\Users\user\.gemini\config\skills\seo\scripts\article_seo.py", line 537, in main structured_data = extract_structured_data(soup) ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ File "C:\Users\user\.gemini\config\skills\seo\scripts\article_seo.py", line 268, in extract_structured_data schema_type = data.get("@type", "Unknown") ^^^^^^^^ AttributeError: 'list' object has no attribute 'get' | Rerun this check after resolving the environment/API/network limitation. |
| Info | environment | Performance measurement incomplete | PageSpeed API returned an error, so CWV recommendations are less reliable. | Set `PAGESPEED_API_KEY` in your environment or `.env` file (see `.env.example`), then rerun. The CLI also accepts `--api-key`. Prioritize LCP/INP/CLS fixes from that output. |
| info | pagespeed | pagespeed measurement incomplete | Rate limited by Google API. Wait a few minutes or add an API key. | Rerun this check after resolving the environment/API/network limitation. |
| Info | sameAs | Missing sameAs link to Wikipedia (Primary KG signal). |  | Add the existing official 'wikipedia.org' URL to sameAs; do not create this profile solely for SEO. |
| Info | sameAs | Missing sameAs link to Wikidata (Primary KG signal). |  | Add the existing official 'wikidata.org' URL to sameAs; do not create this profile solely for SEO. |

## Measurement Notes

2 checks returned errors or incomplete measurements; treat affected scores as directional.
