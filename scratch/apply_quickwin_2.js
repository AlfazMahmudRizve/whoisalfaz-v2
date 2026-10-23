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

const slug = 'manychat-pricing-2026';

async function updatePost() {
  const query = `*[_type == "post" && slug.current == $slug][0]`;
  const post = await client.fetch(query, { slug });
  if (!post) {
    console.error('Post not found:', slug);
    process.exit(1);
  }

  let body = post.body;

  // New WhatsApp & SMS Breakdown Table + Agency Pricing Section
  const detailedCostSection = `

### WhatsApp & SMS Message Cost Breakdown (Meta & Twilio Fees)

While ManyChat charges a base platform fee, sending WhatsApp flows and SMS broadcasts incurs separate per-message network fees passed through directly:

| Channel / Message Category | Rate Range | Billing Entity | Free Allowance / Nuance |
| :--- | :--- | :--- | :--- |
| **WhatsApp Marketing Conversation** | $0.05 – $0.08 / 24hr window | Meta (via ManyChat) | Outbound marketing blasts & promotional broadcasts |
| **WhatsApp Utility Conversation** | $0.015 – $0.035 / 24hr window | Meta (via ManyChat) | Order confirmations, account alerts, OTP codes |
| **WhatsApp Service Conversation** | $0.01 – $0.02 / 24hr window | Meta (via ManyChat) | First 1,000 service conversations/month are free from Meta |
| **SMS (United States & Canada)** | $0.015 – $0.03 / message | Twilio / ManyChat | Standard 160-character segment; 10DLC registration required |
| **SMS (International)** | $0.04 – $0.09 / message | Twilio / ManyChat | Country-dependent carrier pass-through rates |
| **MMS (Rich Media)** | $0.04 – $0.05 / message | Twilio / ManyChat | Images, GIFs, audio cards in US/Canada only |

### How ManyChat Agency Pricing Works in 2026

If you run a marketing agency managing multiple client accounts, ManyChat does not offer a single flat-rate unlimited plan for all clients. Instead, you operate through the **ManyChat Agency Partner Program**:
1. **Multi-Workspace Hierarchy:** Each client account operates as an isolated workspace with its own contact tier (e.g. Client A on Pro at $15/mo, Client B on Business at $99/mo).
2. **Agency Partner Rev-Share:** Certified ManyChat Agency Partners earn a 20% monthly revenue share on client subscriptions managed under their agency dashboard.
3. **Consolidated Billing vs Client-Direct:** Agencies can choose between paying for all client workspaces centrally via a single corporate credit card or sending direct billing invites to clients while retaining administrative agency access.

### The ManyChat Real Cost Calculator Formula
To forecast your true monthly expenditure before launching:
$$\\text{Total Cost} = \\text{Base Subscription (Free/Pro/Business)} + \\text{AI Add-on (\\$29 if Pro)} + (\\text{WhatsApp 24h Sessions} \\times \\text{Meta Fee}) + (\\text{SMS Count} \\times \\text{Rate}) + (\\text{Overage Contacts} \\times \\$0.02)$$
`;

  // Inject after "### The Hidden Costs You Need to Know"
  const targetHeader = '### The Growth Trap';
  if (body.includes(targetHeader)) {
    body = body.replace(targetHeader, detailedCostSection + '\n\n' + targetHeader);
  } else {
    body = body + detailedCostSection;
  }

  // Add specific FAQs
  const faqHeader = '## Frequently Asked Questions';
  const newFaqs = `
### How much does ManyChat WhatsApp automation cost?
ManyChat WhatsApp requires at least a Pro plan ($15–$39/month base depending on contacts). In addition, Meta charges per-conversation 24-hour fees: marketing conversations cost $0.05–$0.08 each, utility messages cost $0.015–$0.035, and service (inbound customer support) conversations cost $0.01–$0.02. The first 1,000 user-initiated service conversations each month are free.

### How much do broadcasts cost on ManyChat?
ManyChat does not charge a separate broadcast fee on Pro or Business tiers. However, if you broadcast on WhatsApp or SMS, you pay the underlying channel charges: Meta charges a marketing conversation fee ($0.05–$0.08 per recipient) for WhatsApp broadcasts, and SMS broadcasts cost standard per-segment SMS rates ($0.015–$0.03 in the US). Instagram and Messenger broadcasts are free within 24-hour messaging windows.

### How does ManyChat Agency pricing work?
ManyChat does not have a single flat-rate unlimited agency plan. Agencies set up individual workspaces for each client on Pro or Business tiers. Through the ManyChat Agency Partner Program, agencies get consolidated multi-account dashboard access and earn a 20% recurring monthly commission on all client accounts they manage.
`;

  if (body.includes(faqHeader)) {
    body = body.replace(faqHeader, faqHeader + '\n' + newFaqs);
  } else {
    body = body + '\n\n' + faqHeader + '\n' + newFaqs;
  }

  const newSeoTitle = 'ManyChat Pricing [2026]: Pro, WhatsApp & SMS Fees'; // 50 chars
  const newMetaDesc = 'ManyChat pricing breakdown for 2026: Compare Free vs Pro tiers, hidden WhatsApp conversation fees, SMS message costs, and Agency partner pricing.'; // 150 chars

  console.log('Updating ManyChat Pricing Document ID:', post._id);
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

  console.log('✅ Successfully updated ManyChat Pricing post in Sanity');
}

updatePost().catch(console.error);
