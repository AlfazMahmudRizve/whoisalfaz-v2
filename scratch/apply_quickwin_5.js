const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const slug = 'whatconverts-vs-callrail-attribution';

async function updatePost() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.error('Post not found:', slug);
    process.exit(1);
  }

  let body = post.body;

  const centerflowSection = `

### WhatConverts vs CallRail vs Centerflow: 3-Way Attribution Matrix

For agencies evaluating call tracking platforms, **Centerflow** has emerged alongside WhatConverts and CallRail as an agile contender. Here is how the three architectures compare in production:

| Platform Feature | WhatConverts | CallRail | Centerflow |
| :--- | :--- | :--- | :--- |
| **Base Starting Price** | $30 / month | $45 / month | $29 / month |
| **Primary Architectural Strength** | Full Lead Intelligence (Calls + Forms + Chats + E-Commerce) | Conversation Intelligence & Deep Audio AI Summaries | Lightweight Call Routing & Fast Webhook Postbacks |
| **Dynamic Number Insertion (DNI)** | Multi-channel session tracking with keyword-level attribution | High-fidelity keyword & source level pool tracking | Essential campaign and source-level pool tracking |
| **Lead Qualification Workflow** | Native quotable value & lead status marking | AI-driven call sentiment and agent tagging | Manual or basic webhook-driven tagging |
| **Webhook Delivery & n8n Compatibility** | Instant real-time JSON webhooks with full session UTMs | Rich webhook payloads (requires Conversation Intelligence add-on for transcripts) | Standard HTTP POST webhooks |
| **Best Production Fit** | Agencies needing unified lead tracking across forms, calls, and chats | Enterprise sales teams needing AI speech-to-text and call coaching | Local service businesses and lean startups wanting low-cost call routing |
`;

  // Inject before "## Configuring Dynamic Number Insertion and CRM Field Mapping"
  const targetHeader = '## Configuring Dynamic Number Insertion and CRM Field Mapping';
  if (body.includes(targetHeader)) {
    body = body.replace(targetHeader, centerflowSection + '\n\n' + targetHeader);
  } else {
    body = body + centerflowSection;
  }

  // FAQs
  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### WhatConverts vs CallRail: Which is better for agencies?
WhatConverts is generally superior for agencies that need unified lead attribution across phone calls, web forms, and live chats at a lower starting cost ($30/mo) with native lead quotation tracking. CallRail ($45/mo) is the industry standard when advanced speech-to-text AI transcription, conversation intelligence, and agent coaching are the primary operational requirements.

### How does Centerflow compare to WhatConverts?
Centerflow is a lightweight, lower-overhead call routing solution designed for local service businesses and lean agencies. While WhatConverts provides an all-in-one lead management suite tracking forms, transactions, and calls with rich attribution, Centerflow focuses strictly on straightforward call forwarding, recording, and basic webhook postbacks.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  } else {
    body = body + '\n\n' + faqHeader + '\n' + newFaqs;
  }

  const newSeoTitle = 'WhatConverts vs CallRail [2026]: Call Attribution Winner'; // 56 chars
  const newMetaDesc = 'WhatConverts vs CallRail vs Centerflow: Compare pricing, dynamic number insertion, lead qualification accuracy, and n8n webhook CRM attribution.'; // 145 chars

  console.log('Updating WhatConverts Post ID:', post._id);
  console.log('New SEOTitle:', newSeoTitle, 'Length:', newSeoTitle.length);
  console.log('New MetaDescription:', newMetaDesc, 'Length:', newMetaDesc.length);

  await client
    .patch(post._id)
    .set({
      body: body,
      seoTitle: newSeoTitle,
      metaDescription: newMetaDesc,
    })
    .commit();

  console.log('✅ Successfully updated WhatConverts post in Sanity');
}

updatePost().catch(console.error);
