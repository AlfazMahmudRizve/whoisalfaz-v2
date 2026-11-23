const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-05-13',
});

const brevoFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Brevo's Black Friday 2026 deal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brevo is offering 30% off new annual Starter and Standard plans with coupon code BREVOFRIDAY2026, valid from 23 to 30 November 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Which plans are eligible for Brevo's Black Friday discount?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The discount applies to new annual subscriptions on Starter and Standard plans, covering sending volumes from 10,000 up to 350,000 emails per month."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a coupon code for Brevo's Black Friday sale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, use promo code BREVOFRIDAY2026 at checkout on brevo.com to claim the 30% annual discount."
      }
    },
    {
      "@type": "Question",
      "name": "Does Brevo price by subscriber count or email sends?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Brevo prices by monthly email volume rather than contact list size, making it cost-effective for businesses with large contact lists that send targeted campaigns."
      }
    }
  ]
};

const brevoBody = `Brevo's [Black Friday deal](https://whoisalfaz.me/go/brevo) is 30% off new annual Starter and Standard plans, with the code BREVOFRIDAY2026 at checkout. The window runs 23–30 November 2026, and it covers plans from 10,000 emails a month up to 350,000.

That is the deal as Brevo itself states it. It is worth saying plainly, because the deal trackers got this one wrong in every direction: several listed it as 50% off, with a different code, starting a weekend early. None of that matches brevo.com. If you are comparing Brevo against another email tool this week, start from the 30% figure, not the tracker headline.

## What Brevo actually is

[Brevo](https://whoisalfaz.me/go/brevo) — formerly Sendinblue — is an email marketing platform that also handles transactional email, the automated messages like password resets and order confirmations that have to arrive. The Starter and Standard plans are the paid tiers above the free plan. Starter covers the basics of sending campaigns to a list; Standard adds the automation and reporting that a team sending regularly will actually use.

The part that matters for this deal is the range it covers. Ten thousand emails a month is a small list sending weekly. Three hundred and fifty thousand is a business sending daily to a large list. The discount applies across that whole range, so it is not a deal that only works if you are already big.

Brevo's other useful trait is that it prices by emails sent rather than by contacts stored, which suits a list with subscribers who do not all open every email. That is a detail worth checking against your own sending pattern before you buy, because the plan that looks cheap on the price page is not always the cheap one for how you send.

## Who it fits

Brevo fits a business that sends email regularly and wants the marketing campaigns and the transactional messages in one place. A small agency sending client newsletters, a SaaS sending onboarding sequences and receipts, or a shop sending order updates and promotions — those are the cases where one platform for both kinds of mail earns its keep.

It fits less well if email is occasional. A business that sends one newsletter a quarter will not use the automation that Standard adds, and the free plan will cover the sending. It also fits less well if the list is built on cold outreach — Brevo is a marketing platform, not a cold email tool, and the IP warming discipline in [our earlier Brevo guide](https://whoisalfaz.me/blog/brevo-cold-email-ip-warming-guide/) applies before any volume goes out.

## What to check before buying

Three things, all worth two minutes each.

First, the code and the dates. The deal is 30% off, code BREVOFRIDAY2026, and the window is 23–30 November. Apply the code at checkout — a discount that is not applied before payment is not a discount you can claim back later. And do not buy before the 23rd expecting the code to work; it starts with the window.

Second, the plan tier. Starter and Standard are both covered, so pick the tier for the features you will use, not the bigger discount. Standard's automation and reporting are the reason to pay more; if you will not use them, Starter at 30% off is the better buy.

Third, the renewal. The deal page says what the discount is and which plans it covers. It does not spell out what the price becomes after the discounted term. Read the terms on Brevo's pricing page before checkout, so the first renewal does not surprise you.

## The short version

30% off new annual Starter and Standard plans, code BREVOFRIDAY2026, 23–30 November 2026, for plans from 10,000 to 350,000 emails a month. An email platform for businesses that send regularly and want campaigns and transactional mail in one place. If email is a weekly habit for your business, the [Brevo Black Friday discount](https://whoisalfaz.me/go/brevo) is a reason to move this week rather than next quarter. If it is a quarterly habit, the free plan will tell you that for nothing.`;

const brevoDoc = {
  _id: 'post-brevo-black-friday-2026-30-off',
  _type: 'post',
  title: 'Brevo Black Friday: 30% Off Starter and Standard', // 48 chars <= 58
  slug: { _type: 'slug', current: 'brevo-black-friday-2026-30-off' },
  description: "Brevo's Black Friday 2026 deal offers 30% off new annual Starter and Standard plans with code BREVOFRIDAY2026. Review plan tiers, sending limits, and checkout terms.",
  seoTitle: 'Brevo Black Friday Deal: 30% Off Starter & Standard', // 51 chars <= 58
  seoDescription: "Brevo's Black Friday 2026 deal offers 30% off new annual Starter and Standard plans with code BREVOFRIDAY2026. Review plan tiers, sending limits, and checkout terms.",
  date: '2026-11-23T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }, // automation-tools
    { _type: 'reference', _ref: 'cConWBU9nRl6jEInqsZx0q' }  // revops-architecture
  ],
  affiliates: ['brevo'],
  schemaMarkup: JSON.stringify(brevoFaqSchema, null, 2),
  body: brevoBody
};

async function syncExistingSanityPostsJson() {
  console.log('Fetching latest post inventory from Sanity to sync data/existing_sanity_posts.json...');
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc, date desc){
    _id,
    title,
    "slug": slug.current,
    description
  }`);

  const formatted = posts.map((p, idx) => ({
    index: idx + 1,
    id: p._id,
    slug: p.slug,
    title: p.title,
    description: p.description
  }));

  const targetPath = path.resolve(__dirname, '../data/existing_sanity_posts.json');
  fs.writeFileSync(targetPath, JSON.stringify(formatted, null, 2), 'utf-8');
  console.log(`✅ Synced data/existing_sanity_posts.json with ${formatted.length} posts!`);
}

async function run() {
  console.log('Publishing Day 10 Brevo Black Friday Post in Sanity...');
  const res = await client.createOrReplace(brevoDoc);
  console.log('✅ Successfully published post in Sanity:', res._id);

  // Sync post ledger
  await syncExistingSanityPostsJson();

  console.log('\nDay 10 post published successfully in Sanity!');
}

run().catch(err => {
  console.error('❌ Error executing Day 10 publish:', err);
  process.exit(1);
});
