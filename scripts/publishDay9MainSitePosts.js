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

const post1FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Did ElevenLabs acquire Kotoba Technologies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. ElevenLabs announced on 16 November 2026 that it is acquiring Kotoba Technologies, the Japanese voice AI lab behind the Koto model. The deal is expected to close in late Q4 2026."
      }
    },
    {
      "@type": "Question",
      "name": "How much did ElevenLabs pay for Kotoba?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ElevenLabs did not officially disclose transaction terms. Japanese media, including Nikkei and Business Insider Japan, report the acquisition value at more than $100 million."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Kotoba's Koto voice model unique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kotoba's Koto model handles Japanese text-to-speech, speech-to-text, and real-time speech-to-speech for simultaneous interpretation. It already powers Japanese voice conversations in Salesforce Agentforce Voice."
      }
    },
    {
      "@type": "Question",
      "name": "Does ElevenLabs have a Black Friday offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, ElevenLabs offers 55% off the first year on Creator and Pro plans for new subscribers through 1 December 2026."
      }
    }
  ]
};

const post2FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CallHippo's Black Friday 2026 deal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CallHippo is offering 20% off annual billing and 15% off monthly billing through 5 December 2026. The coupon code is claimed by emailing CallHippo directly."
      }
    },
    {
      "@type": "Question",
      "name": "Does CallHippo include an AI voice agent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, CallHippo offers an AI voice agent add-on that answers incoming business calls and automates customer support with smart routing across 150+ countries."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a free trial for CallHippo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, CallHippo offers a 10-day free trial with one free business number, as well as a Basic plan free for the first six months from signup."
      }
    }
  ]
};

const post1Body = `ElevenLabs announced on 16 November that it is buying Kotoba Technologies, the Japanese voice AI lab behind the Koto model. Kotoba confirmed it the next day. The deal is expected to close late in Q4 2026, subject to approvals, and all 15 of Kotoba's staff — all based in Japan — join ElevenLabs.

ElevenLabs did not disclose terms. Nikkei reports the deal at more than $100 million, and Business Insider Japan reports ElevenLabs CEO Mati Staniszewski put the price at around $100 million at a press conference on 17 November. Treat the figure as reported, not confirmed: the companies' own announcements say nothing about price.

## What Kotoba actually is

Kotoba was founded in July 2023 by AI researchers Noriyuki Kojima and Jungo Kasai. Its model, Koto, covers Japanese text-to-speech, speech-to-text, and speech-to-speech for simultaneous interpretation. That last part is the one that sets it apart: most voice models read text aloud; Koto is built to carry a live conversation across languages in real time.

It already has a real deployment behind it. Koto powers Japanese-language conversations in Salesforce's Agentforce Voice, and Kotoba's work includes voice agents for major companies in Japan and the United States, plus a simultaneous interpretation app that has supported artists such as YOASOBI. This is not a research demo being bought for a slide deck. It is a working model with enterprise users.

Kotoba had raised $23 million before the deal, from investors including Globis Capital Partners and a Sony-affiliated fund. ElevenLabs calls it the leading Japanese voice AI lab, and the acquisition is its first in Japan.

## Why ElevenLabs wants it

ElevenLabs spent 2026 turning itself from a voice tool into a platform for voice agents — the New York Summit in November brought 13 product announcements, most of them aimed at agents that make calls, run campaigns, and hold conversations. A voice agent that only speaks English is a product with a ceiling. Japan is the world's fourth-largest economy, and Japanese is a language where off-the-shelf English-first models have always sounded wrong: pitch, pace, and politeness levels all work differently.

Buying Kotoba gives ElevenLabs three things at once: a Japanese model that already works, a team that has shipped it to enterprise customers, and a base in Tokyo. The announcement says the plan is to improve voice AI across East Asian languages, starting with Japanese and extending to Korean and others. ElevenLabs also says it will invest in local sales leadership and infrastructure in Japan in the coming months.

For anyone building voice agents, the practical read is simple. If your customers speak Japanese, the [ElevenLabs voice agent](https://whoisalfaz.me/go/elevenlabs) stack now has a native Japanese voice behind it instead of a translated one. If they do not, nothing about your current setup changes — this is an expansion of the platform, not a change to the products you already use.

## What to watch next

Three things decide whether this matters beyond the announcement.

First, the close. Late Q4 2026 is the stated window, subject to approvals. Until it closes, Koto stays Kotoba's product.

Second, the product. Watch whether Koto appears inside ElevenAgents as a Japanese voice option, or stays a separate model. The announcement points at ElevenAgents, so that is where to look.

Third, the price. The Black Friday offer on [ElevenLabs](https://whoisalfaz.me/go/elevenlabs) — 55% off the first year on Creator and Pro for new subscribers — ends 1 December. It is a separate thing from the acquisition, but if you were already weighing a voice agent build, the two land in the same week.

The deal itself is straightforward: a voice platform buying the best Japanese voice lab it could find, before someone else did. The test now is how fast Koto shows up where builders can actually use it.`;

const post2Body = `CallHippo's Black Friday deal is 20% off with annual billing and 15% off with monthly billing, and it runs till 5 December 2026. There is no code printed on the page. You email CallHippo and they send you the coupon. That is the whole deal, from CallHippo's own Black Friday page, updated 20 November.

It is a small discount next to the 50%-off headlines elsewhere this week. It is also a discount on a phone system, which is a different kind of purchase from a design tool or a writing app. A business phone number is the thing customers call when something has gone wrong. The question is not how big the discount is. It is whether the system answers well when it matters.

## What CallHippo actually is

[CallHippo](https://whoisalfaz.me/go/callhippo) is a cloud phone system for sales and support teams. It gives a business virtual numbers in more than 150 countries, and puts calls, texts and chat in one inbox. The parts that matter day to day are the ones that decide whether a call gets answered by the right person: smart routing, call recording, IVR menus, and integrations with tools teams already use, including HubSpot and Salesforce.

The newer part is the AI voice agent. It answers calls and holds conversations on its own, which is the same idea as the voice agents in our [ElevenLabs + n8n voice sales agent guide](https://whoisalfaz.me/blog/elevenlabs-n8n-voice-ai-sales-agent/) — except here the agent sits on a phone number a customer dials, not inside an app. CallHippo also sells the agent as an add-on with its own per-user price and per-minute calling charges, so it is not part of the base plan price.

Every user gets one free number, and there is a 10-day free trial. The pricing page also notes a Basic plan that is free for the first six months from signup, after which you move to the Starter plan to keep using it. That is a fair way to test whether the number and the routing fit before paying anything.

## Who it fits

CallHippo fits a team that takes calls from customers in more than one country and wants those calls in one place. A sales team with numbers in the US, the UK and Singapore, a support team that needs call recording for quality checks, or a small agency that wants a business number separate from personal phones — those are the cases where a virtual phone system earns its keep.

It fits less well if the team barely takes calls at all. A business that runs on email and chat, or a solo operator whose phone is already the business phone, will not get much from routing rules and IVR menus. The free Basic plan is the honest test: if six months of it changes nothing about how calls are handled, the paid plans will not either.

## What to check before buying

Three things, all worth two minutes each.

First, the coupon. The discount is claimed by email, not applied at checkout, so request it before you pay — not after. A reader who signs up on 5 December and emails for the code the same day is cutting it fine.

Second, the renewal. The deal page says what the discount is and when it ends. It does not say what the price becomes after the discounted term. Ask, or read the quote, before assuming the discounted price is the ongoing price.

Third, the calling costs. The plan price covers the system and the number. Calls themselves, and the AI voice agent's per-minute charges, are billed on top. A team that makes heavy outbound calls should price a normal month of calls, not just the plan, before comparing it with what they pay now.

## The short version

20% off annual billing, 15% off monthly, till 5 December 2026, coupon by email. A phone system for teams that take calls across countries, with AI voice agents on top and a free trial plus a six-month free Basic plan to test it. If the team already misses calls or juggles personal numbers for business, the [CallHippo Black Friday discount](https://whoisalfaz.me/go/callhippo) is a reason to try it this week rather than next quarter. If calls are a small part of the business, the free plan will tell you that for nothing.`;

const post1Doc = {
  _id: 'post-elevenlabs-kotoba-acquisition-japanese-voice-ai',
  _type: 'post',
  title: 'ElevenLabs Buys Kotoba: Japanese Voice AI Expands', // 49 chars <= 58
  slug: { _type: 'slug', current: 'elevenlabs-kotoba-acquisition-japanese-voice-ai' },
  description: 'ElevenLabs is acquiring Japanese voice AI lab Kotoba Technologies. Here is what the reported $100M+ deal changes for developers building multilingual voice agents.',
  seoTitle: 'ElevenLabs Buys Kotoba: Japanese Voice AI Expands', // 49 chars <= 58
  seoDescription: 'ElevenLabs is acquiring Japanese voice AI lab Kotoba Technologies. Here is what the reported $100M+ deal changes for developers building multilingual voice agents.',
  date: '2026-11-22T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }, // automation-tools
    { _type: 'reference', _ref: 'cConWBU9nRl6jEInqsZvuy' }  // ai-content-systems
  ],
  affiliates: ['elevenlabs'],
  schemaMarkup: JSON.stringify(post1FaqSchema, null, 2),
  body: post1Body
};

const post2Doc = {
  _id: 'post-callhippo-black-friday-2026-business-phone-deal',
  _type: 'post',
  title: 'CallHippo Black Friday Deal: 20% Off Phone Systems', // 50 chars <= 58
  slug: { _type: 'slug', current: 'callhippo-black-friday-2026-business-phone-deal' },
  description: 'CallHippo\'s Black Friday 2026 deal offers 20% off annual and 15% off monthly billing. Review features, smart routing, AI voice agents, and claim steps.',
  seoTitle: 'CallHippo Black Friday: 20% Off Business Phone Deal', // 51 chars <= 58
  seoDescription: 'CallHippo\'s Black Friday 2026 deal offers 20% off annual and 15% off monthly billing. Review features, smart routing, AI voice agents, and claim steps.',
  date: '2026-11-22T16:00:00.000Z', // 6 hours after Post 1
  categories: [
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }, // automation-tools
    { _type: 'reference', _ref: 'cConWBU9nRl6jEInqsZx0q' }  // revops-architecture
  ],
  affiliates: ['callhippo'],
  schemaMarkup: JSON.stringify(post2FaqSchema, null, 2),
  body: post2Body
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
  console.log('1. Publishing Post 1 (ElevenLabs Buys Kotoba)...');
  const res1 = await client.createOrReplace(post1Doc);
  console.log('✅ Successfully published Post 1 in Sanity:', res1._id);

  console.log('2. Publishing Post 2 (CallHippo Black Friday Deal)...');
  const res2 = await client.createOrReplace(post2Doc);
  console.log('✅ Successfully published Post 2 in Sanity:', res2._id);

  // Sync post ledger
  await syncExistingSanityPostsJson();

  console.log('\nAll Day 9 posts published successfully in Sanity!');
}

run().catch(err => {
  console.error('❌ Error executing Day 9 publish:', err);
  process.exit(1);
});
