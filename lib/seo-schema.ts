/**
 * Unified Schema.org Graph Generator for whoisalfaz.me
 * Generates an interconnected Schema.org @graph linking WebSite, Person,
 * Organization, WebPage, BreadcrumbList, TechArticle / Article, and FAQPage.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UnifiedArticleGraphParams {
  title: string;
  description?: string;
  slug: string;
  canonicalUrl?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  articleType?: 'TechArticle' | 'Article' | 'BlogPosting';
  category?: string;
  categories?: string[];
  keywords?: string[] | string;
  wordCount?: number;
  markdownContent?: string;
  body?: any;
  schemaMarkup?: string | Record<string, any>;
  faqs?: FAQItem[];
  proficiencyLevel?: string;
}

export interface SchemaNode {
  '@type': string | string[];
  '@id': string;
  [key: string]: any;
}

export interface UnifiedGraphResult {
  '@context': 'https://schema.org';
  '@graph': SchemaNode[];
}

/**
 * Strips HTML tags and Markdown formatting to produce clean, plain text for JSON-LD.
 */
export function cleanText(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // replace markdown links [text](url) -> text
    .replace(/(?:^|\n)\s*[-*_]{3,}\s*(?:\n|$)/g, ' ') // remove horizontal rules (---, ***, ___)
    .replace(/[*_`~#]/g, '') // strip markdown markers
    .replace(/\s+/g, ' ') // collapse multi-spaces and newlines
    .trim();
}

/**
 * Converts Sanity PortableText array blocks or string MDX to clean Markdown text.
 */
export function portableTextToMarkdown(body: any): string {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (!Array.isArray(body)) return '';

  return body
    .map((block) => {
      if (!block) return '';

      // Handle Code Blocks
      if (block._type === 'code' || block.style === 'code') {
        const lang = block.language || block.lang || '';
        const codeText = block.code || (block.children ? block.children.map((c: any) => c.text).join('') : '');
        return `\`\`\`${lang}\n${codeText}\n\`\`\`\n\n`;
      }

      // Handle Standard Blocks (headings, paragraphs, lists, blockquotes)
      if (block._type === 'block') {
        const markDefsMap: Record<string, any> = {};
        if (Array.isArray(block.markDefs)) {
          block.markDefs.forEach((def: any) => {
            if (def && def._key) markDefsMap[def._key] = def;
          });
        }

        let inlineText = '';
        if (Array.isArray(block.children)) {
          inlineText = block.children
            .map((child: any) => {
              let text = child.text || '';
              if (Array.isArray(child.marks)) {
                child.marks.forEach((markKey: string) => {
                  if (markKey === 'bold') {
                    text = `**${text}**`;
                  } else if (markKey === 'italic') {
                    text = `*${text}*`;
                  } else if (markKey === 'code') {
                    text = `\`${text}\``;
                  } else if (markDefsMap[markKey]) {
                    const def = markDefsMap[markKey];
                    if (def._type === 'link' && def.href) {
                      text = `[${text}](${def.href})`;
                    }
                  }
                });
              }
              return text;
            })
            .join('');
        }

        const style = block.style || 'normal';
        if (style === 'h1') return `# ${inlineText}\n\n`;
        if (style === 'h2') return `## ${inlineText}\n\n`;
        if (style === 'h3') return `### ${inlineText}\n\n`;
        if (style === 'h4') return `#### ${inlineText}\n\n`;
        if (style === 'blockquote') return `> ${inlineText}\n\n`;
        if (block.listItem === 'bullet') return `* ${inlineText}\n`;
        if (block.listItem === 'number') return `1. ${inlineText}\n`;

        return `${inlineText}\n\n`;
      }

      return '';
    })
    .join('');
}

/**
 * Checks if a heading or string appears to be a real question rather than a section title.
 */
function isLikelyQuestion(text: string): boolean {
  const clean = text.trim();
  if (clean.length < 6) return false;
  if (clean.endsWith('?')) return true;

  // Check if starts with common question interrogatives or Q:
  const questionStartRegex = /^(?:q:|q\d+:|question:|what|how|why|can|is|does|do|where|when|which|should|will|are|could|would)\b/i;
  if (questionStartRegex.test(clean)) return true;

  return false;
}

/**
 * Determines if a subsection header is a non-FAQ guide or navigation heading (e.g. Related Guides).
 */
function isNonFaqSectionHeader(text: string): boolean {
  const clean = cleanText(text).toLowerCase();
  return (
    clean.startsWith('related') ||
    clean.startsWith('additional') ||
    clean.startsWith('next step') ||
    clean.startsWith('recommended') ||
    clean.startsWith('reference') ||
    clean.startsWith('further reading') ||
    clean.startsWith('conclusion') ||
    clean.startsWith('summary')
  );
}

/**
 * Extracts FAQ questions and answers from markdown text.
 */
export function extractFaqsFromMarkdown(markdown: string): FAQItem[] {
  if (!markdown || typeof markdown !== 'string') return [];

  const faqs: FAQItem[] = [];

  // Find the start of the FAQ section
  // Matches: ## Frequently Asked Questions, ## <mark>Frequently Asked Questions</mark>, ## FAQ, ## FAQs, etc.
  const faqHeadingRegex = /^##\s+(?:<[^>]+>)?\s*(?:frequently\s+asked\s+questions|faqs?)(?:[:\s\-][^\n]*)?(?:<\/[^>]+>)?\s*$/im;
  const match = markdown.match(faqHeadingRegex);
  if (!match || match.index === undefined) {
    return [];
  }

  const faqStartIndex = match.index + match[0].length;
  const faqSectionText = markdown.slice(faqStartIndex);

  // Find where the FAQ section ends (the next '## ' heading at the same level)
  const nextSectionMatch = faqSectionText.match(/\n##\s+/);
  const faqBody = nextSectionMatch && nextSectionMatch.index !== undefined
    ? faqSectionText.slice(0, nextSectionMatch.index)
    : faqSectionText;

  // Pattern 1: Heading-based questions (### Question ? or #### Question ?)
  const headingQuestions = faqBody.split(/\n(?=###+\s+)/g);
  if (headingQuestions.length > 1) {
    for (const chunk of headingQuestions) {
      const headingMatch = chunk.match(/^###+\s+(.+?)(?:\n|$)/);
      if (!headingMatch) continue;

      const rawQuestion = headingMatch[1];
      if (isNonFaqSectionHeader(rawQuestion)) {
        // Stop parsing if we hit a "Related Articles / Blueprints" section inside the block
        break;
      }

      if (isLikelyQuestion(rawQuestion)) {
        const questionText = cleanText(rawQuestion);
        const answerRaw = chunk.slice(headingMatch[0].length).trim();
        const answerText = cleanText(answerRaw);

        if (questionText && answerText) {
          faqs.push({
            question: questionText,
            answer: answerText,
          });
        }
      }
    }

    if (faqs.length > 0) return faqs;
  }

  // Pattern 2: Bold Q/A format (**Q: ...?** Answer or **Question:** ... **Answer:** ...)
  const boldQuestionRegex = /(?:^|\n)\s*(?:\*{2}|<b>)(?:Q:?|Question:?|Q\d+:?)?\s*(.+?\?)(?:\*{2}|<\/b>)\s*([\s\S]*?)(?=(?:\n\s*(?:\*{2}|<b>)(?:Q:?|Question:?|Q\d+:?)?\s*.+?\?)|(?:\n###+\s+)|$)/gi;
  let boldMatch: RegExpExecArray | null;

  while ((boldMatch = boldQuestionRegex.exec(faqBody)) !== null) {
    const rawQuestion = boldMatch[1];
    const rawAnswer = boldMatch[2];

    const questionText = cleanText(rawQuestion);
    // Strip leading "A:" or "Answer:" from the answer text
    const cleanAnswer = cleanText(rawAnswer).replace(/^(?:A:|Answer:)\s*/i, '').trim();

    if (questionText && cleanAnswer && isLikelyQuestion(questionText)) {
      faqs.push({
        question: questionText,
        answer: cleanAnswer,
      });
    }
  }

  if (faqs.length > 0) return faqs;

  // Pattern 3: Numbered list format (1. **Question ?** Answer)
  const numberedListRegex = /(?:^|\n)\s*\d+\.\s+(?:\*{2}|<b>)?(.+?\?)(?:\*{2}|<\/b>)?\s*\n+([\s\S]*?)(?=(?:\n\s*\d+\.\s+)|(?:\n###+\s+)|$)/gi;
  let numMatch: RegExpExecArray | null;

  while ((numMatch = numberedListRegex.exec(faqBody)) !== null) {
    const rawQuestion = numMatch[1];
    const rawAnswer = numMatch[2];

    const questionText = cleanText(rawQuestion);
    const cleanAnswer = cleanText(rawAnswer).replace(/^(?:A:|Answer:)\s*/i, '').trim();

    if (questionText && cleanAnswer && isLikelyQuestion(questionText)) {
      faqs.push({
        question: questionText,
        answer: cleanAnswer,
      });
    }
  }

  return faqs;
}

/**
 * Extracts FAQ items from existing schemaMarkup if present.
 */
export function extractFaqsFromSchemaMarkup(schemaMarkup?: string | Record<string, any>): FAQItem[] {
  if (!schemaMarkup) return [];

  try {
    const parsed = typeof schemaMarkup === 'string' ? JSON.parse(schemaMarkup) : schemaMarkup;
    if (!parsed) return [];

    const nodes: any[] = [];
    if (parsed['@graph'] && Array.isArray(parsed['@graph'])) {
      nodes.push(...parsed['@graph']);
    } else if (Array.isArray(parsed)) {
      nodes.push(...parsed);
    } else if (typeof parsed === 'object') {
      nodes.push(parsed);
    }

    const faqNode = nodes.find((node) => node['@type'] === 'FAQPage');
    if (faqNode && Array.isArray(faqNode.mainEntity)) {
      const items: FAQItem[] = [];
      for (const q of faqNode.mainEntity) {
        const question = cleanText(q.name || q.question || '');
        const answer = cleanText(q.acceptedAnswer?.text || q.acceptedAnswer || q.answer || '');
        if (question && answer) {
          items.push({ question, answer });
        }
      }
      return items;
    }
  } catch {
    // If schemaMarkup is invalid JSON, ignore and fallback to markdown
  }

  return [];
}

/**
 * Formats a date string into ISO 8601 format safely.
 */
export function formatIsoDate(dateInput?: string): string | undefined {
  if (!dateInput) return undefined;
  try {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  } catch {
    // Return original if parsing fails
  }
  return dateInput;
}

/**
 * Generates the unified, interconnected Schema.org @graph for an article page.
 */
export function generateUnifiedArticleGraph(params: UnifiedArticleGraphParams): UnifiedGraphResult {
  const {
    title,
    description,
    slug,
    datePublished,
    dateModified,
    image,
    articleType = 'TechArticle',
    category,
    categories = [],
    keywords,
    wordCount,
    markdownContent,
    body,
    schemaMarkup,
    faqs: explicitFaqs,
    proficiencyLevel = 'Expert',
  } = params;

  // Normalized URLs
  const siteUrl = 'https://whoisalfaz.me';
  const canonicalUrl = params.canonicalUrl || `${siteUrl}/blog/${slug}/`;
  const cleanCanonical = canonicalUrl.endsWith('/') ? canonicalUrl : `${canonicalUrl}/`;

  // ISO Dates
  const isoPublished = formatIsoDate(datePublished);
  const isoModified = formatIsoDate(dateModified || datePublished) || isoPublished;

  // Clean description and title
  const cleanTitle = cleanText(title);
  const cleanDescription = cleanText(description || '');

  // Determine Primary Category & Keywords
  const primaryCategory = category || categories[0] || 'Technology';
  let normalizedKeywords: string[] = [];
  if (Array.isArray(keywords)) {
    normalizedKeywords = keywords.map(cleanText).filter(Boolean);
  } else if (typeof keywords === 'string') {
    normalizedKeywords = keywords
      .split(',')
      .map(cleanText)
      .filter(Boolean);
  }

  // Resolve FAQs (Priority: Explicit -> Existing schemaMarkup -> Markdown content / body)
  let resolvedFaqs: FAQItem[] = [];
  if (explicitFaqs && Array.isArray(explicitFaqs) && explicitFaqs.length > 0) {
    resolvedFaqs = explicitFaqs;
  } else {
    const schemaFaqs = extractFaqsFromSchemaMarkup(schemaMarkup);
    if (schemaFaqs.length > 0) {
      resolvedFaqs = schemaFaqs;
    } else {
      const content = markdownContent || portableTextToMarkdown(body);
      if (content) {
        resolvedFaqs = extractFaqsFromMarkdown(content);
      }
    }
  }

  // 1. WebSite Node
  const websiteNode: SchemaNode = {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Alfaz Mahmud Rizve',
    description: 'RevOps & Full Stack Automation Architect',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    inLanguage: 'en-US',
  };

  // 2. Person Node (Author)
  const personNode: SchemaNode = {
    '@type': 'Person',
    '@id': `${siteUrl}/#author`,
    name: 'Alfaz Mahmud Rizve',
    url: `${siteUrl}/about/alfaz-mahmud-rizve/`,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: 'RevOps Architect & Full Stack Automation Engineer',
    description:
      'Alfaz Mahmud Rizve is a Revenue Operations (RevOps) Architect and Full Stack Engineer specializing in autonomous n8n workflows, AI agents, and high-performance Next.js infrastructure.',
    sameAs: [
      'https://www.linkedin.com/in/alfaz-mahmud-rizve/',
      'https://github.com/AlfazMahmudRizve',
      'https://x.com/whoisalfaz',
    ],
    worksFor: {
      '@id': `${siteUrl}/#organization`,
    },
    knowsAbout: [
      'RevOps',
      'n8n Automation',
      'AI Agents',
      'Next.js',
      'Full Stack Development',
      'API Integration',
      'PostgreSQL',
      'System Architecture',
    ],
  };

  // 3. Organization Node (Publisher)
  const organizationNode: SchemaNode = {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Accelerated Growth Studio',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      '@id': `${siteUrl}/#logo`,
      url: `${siteUrl}/logo.png`,
      caption: 'Accelerated Growth Studio',
    },
    founder: {
      '@id': `${siteUrl}/#author`,
    },
    sameAs: [
      'https://www.linkedin.com/in/alfaz-mahmud-rizve/',
      'https://github.com/AlfazMahmudRizve',
      'https://x.com/whoisalfaz',
    ],
  };

  // 4. WebPage Node
  const webPageNode: SchemaNode = {
    '@type': 'WebPage',
    '@id': `${cleanCanonical}#webpage`,
    url: cleanCanonical,
    name: cleanTitle,
    description: cleanDescription,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    breadcrumb: {
      '@id': `${cleanCanonical}#breadcrumb`,
    },
    inLanguage: 'en-US',
    ...(isoPublished ? { datePublished: isoPublished } : {}),
    ...(isoModified ? { dateModified: isoModified } : {}),
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            '@id': `${cleanCanonical}#primaryimage`,
            url: image,
          },
        }
      : {}),
  };

  // 5. BreadcrumbList Node
  const breadcrumbNode: SchemaNode = {
    '@type': 'BreadcrumbList',
    '@id': `${cleanCanonical}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cleanTitle,
        item: cleanCanonical,
      },
    ],
  };

  // 6. Article / TechArticle Node
  const articleNode: SchemaNode = {
    '@type': articleType,
    '@id': `${cleanCanonical}#article`,
    isPartOf: {
      '@id': `${cleanCanonical}#webpage`,
    },
    headline: cleanTitle,
    name: cleanTitle,
    description: cleanDescription,
    url: cleanCanonical,
    mainEntityOfPage: {
      '@id': `${cleanCanonical}#webpage`,
    },
    author: {
      '@id': `${siteUrl}/#author`,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    proficiencyLevel: proficiencyLevel,
    inLanguage: 'en-US',
    articleSection: primaryCategory,
    ...(image ? { image: [image] } : {}),
    ...(isoPublished ? { datePublished: isoPublished } : {}),
    ...(isoModified ? { dateModified: isoModified } : {}),
    ...(wordCount ? { wordCount } : {}),
    ...(normalizedKeywords.length > 0 ? { keywords: normalizedKeywords } : {}),
  };

  // Build the graph array
  const graph: SchemaNode[] = [
    websiteNode,
    personNode,
    organizationNode,
    webPageNode,
    breadcrumbNode,
    articleNode,
  ];

  // 7. FAQPage Node (if FAQs are present)
  if (resolvedFaqs.length > 0) {
    const faqNode: SchemaNode = {
      '@type': 'FAQPage',
      '@id': `${cleanCanonical}#faq`,
      isPartOf: {
        '@id': `${cleanCanonical}#webpage`,
      },
      mainEntity: resolvedFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    graph.push(faqNode);
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
