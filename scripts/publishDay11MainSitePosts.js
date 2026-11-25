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
      "name": "Did AI agents really start buying things?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, for customers on sites that permit it. Cequence Security measured agent visits that signed in, booked, bought, or managed an account rising from 1.4% in May to 13% in November 2026."
      }
    },
    {
      "@type": "Question",
      "name": "Which industry moved first towards transactional AI agents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Travel leads the transition: 59% of AI agent visits went beyond browsing, predominantly to complete trip bookings."
      }
    },
    {
      "@type": "Question",
      "name": "What is the primary security risk with transactional agents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Malicious bots spoof trusted agent identities to probe for sensitive credentials. Cequence reported that 63% of visits claiming to be Perplexity agents were probing for configuration files, keys, and admin consoles."
      }
    },
    {
      "@type": "Question",
      "name": "What security controls should agencies implement for client agents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enforce hard spending limits, implement mandatory human-in-the-loop approvals for transactions above threshold amounts, and allocate separate, narrowly-scoped credentials per agent."
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
      "name": "Which versions of Microsoft agent-framework were poisoned?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Releases 1.26.1 and 1.26.2 published to PyPI on 17 November 2026 were poisoned with a credential stealer. Release 1.26.0 is the last clean version."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to have imported the package to be compromised?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The malicious wheel installed a .pth startup hook that executed at every Python interpreter launch, including commands like pip itself, without requiring an explicit import."
      }
    },
    {
      "@type": "Question",
      "name": "What should I do first if an environment installed the poisoned releases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Do not run pip uninstall in the compromised environment. Pin agent-framework==1.26.0 in a clean container or virtual environment, rebuild from scratch, and rotate all secrets that the compromised environment could reach."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a CVE assigned to the Microsoft agent-framework incident?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No CVE was assigned. The incident is tracked under GitHub advisory GHSA-764m-3ppc-5m73 and OpenSSF MAL-2026-20101."
      }
    }
  ]
};

const post1Body = `AI agents stopped just reading pages. They now sign in, book and buy.

Cequence Security tracked six months of agent traffic on the sites it protects — 16 May to 15 November 2026 — and published the first Agentic AI Security Index on 23 November. The headline number: among agents present for the whole six months, the share of visits where the agent took action rose from 1.4% in May to 13% in November. Taking action means signing in, booking, buying, managing an account or paying.

That is a change in what agents do, not just how many of them show up. Action-taking visits grew 240% over the six months. Read-only visits fell 73%. Sign-in submissions rose about 175%. The shift is clearest at sign-in, account and checkout pages — the pages where a customer used to do the work themselves.

The holiday numbers make it concrete. During early holiday deals from 5 to 15 November, 3% of agent visits ended in a purchase, against a 0.2% baseline earlier in the year. At the same retailers, agent purchases were up about 1,600% on Prime Day in June.

Travel leads the shift: 59% of agent visits went beyond browsing, mostly to book a trip. Telecom is next in line — agent sign-ins and account visits up 150% since May, with 16% of visits going beyond browsing. Financial services moved too, with sign-ins up 220%, though nearly two-thirds of agent visits there were still informational — terms and help pages.

Not all agents act the same way. Meta's Muse agent accounted for 40% of all agent visits that involved a transaction or account action in its first 30 days, and about half of Muse visits involved signing in, booking, buying or managing an account. Amazon's shopping agent did the same in about 1% of its visits. Six new types of consumer agent appeared between late September and early October, as the fall wave of consumer agents arrived.

There is a second half to this story, and it matters for anyone building with agents. As agents gained enough trust to log in and pay, their names became worth stealing. Cequence found bots using AI agent names as cover to probe for secrets: 63% of visits claiming to be Perplexity agents were probing for configuration files, keys and admin consoles. Cequence blocked 37,917 such visits in the study window. Agent names are self-reported, so any bot can claim one.

What to do with this, if you run agent workflows for clients:

1. Treat agent checkouts as a workflow with checks, not a chat prompt. An agent that can pay needs spending limits, an approval step for anything above a set amount, and a receipt check after the purchase.
2. Give each agent its own credentials, scoped to what it needs. A shared login that can also change account settings is the credential a bot will try to copy.
3. Watch sign-in and checkout pages the way you watch uptime. That is where agents now work — and where bots pretending to be agents now probe.

The tools for this are the same ones used for any automation work: [n8n](https://whoisalfaz.me/go/n8n) for the workflow, with the agent's steps, limits and checks written down where they can be reviewed. The Cequence index will be updated after Black Friday and Cyber Monday, with a year-end review and a 2027 forecast in January — worth a second look then, once the holiday traffic is in.`;

const post2Body = `If you installed Microsoft's \`agent-framework\` from PyPI on the afternoon of Tuesday 17 November, that update may have copied your passwords, cloud keys and code-hosting logins and sent them to a stranger.

Two fake releases of the official package — 1.26.1 and 1.26.2 — were live on PyPI for about 40 minutes in total, from 20:35 to 21:16 UTC. PyPI has quarantined both. The last good release is 1.26.0, from 12 November. There is no CVE. This is a supply-chain compromise of a package that gets about 190,000 downloads a month — not a bug in Microsoft's code.

The part that makes this one hard to catch: the stealer did not wait for your code to use the package. Each wheel planted a small startup file that Python reads every time it starts, so any Python command in that environment — including \`pip\` itself — ran it again. In 1.26.1 the file was \`agent_framework_meta.pth\`; in 1.26.2 it was renamed \`af_runtime_diag.pth\`, which reads like harmless diagnostics.

What it collected is exactly what an AI engineering machine holds: environment variables with TOKEN, SECRET, KEY, AZURE, AWS or GITHUB in the name; credential files such as \`~/.azure\`, \`.npmrc\`, \`.netrc\`, \`.git-credentials\` and \`.env\` files; Azure and GitHub Actions identity tokens; and Azure managed-identity tokens from the cloud metadata service. It forked into a background process, so deleting the hook file alone does not stop a copy that is already running. Everything it found was compressed and sent in one request to a webhook URL controlled by the attacker.

The window was short, but short was enough. Dependency bots opened upgrade pull requests in downstream repositories within six minutes of the first release. How the attacker got permission to publish has not been explained publicly; JFrog's read is a compromised publishing credential used outside Microsoft's release process.

If you installed 1.26.1 or 1.26.2, work in this order:

1. **Find it without starting Python.** Do not run \`pip show agent-framework\` or \`pip uninstall\` first — both start Python, and Python runs the hook.
2. **Pin the clean release and rebuild from a clean base.** \`pip install 'agent-framework==1.26.0'\` in a new virtual environment or a fresh container image, not inside the environment that had the bad versions.
3. **Rotate from a different, clean machine.** Assume every secret the environment could see is gone: environment variables, Azure sign-ins and DevOps tokens, npm, PyPI, NuGet, Docker and Hugging Face tokens, saved git credentials, and CI secrets.
4. **Check your caches.** PyPI's quarantine does not reach copies already pulled into an internal mirror, a pip cache, or a container image built that afternoon. Block 1.26.1 and 1.26.2 in your package proxy and rebuild any image made during the window.

This bites agent builders directly. A self-hosted [n8n](https://whoisalfaz.me/go/n8n) install, a Python agent stack and a CI runner all pull the same packages, and an agent workflow that can sign in and pay — the shift Cequence measured this same week — is worth more to an attacker when its credentials leak. The fix is unglamorous: pin versions, rebuild clean, rotate everything. Do it today, while the window is still narrow.`;

const post1Doc = {
  _id: 'post-ai-agents-now-buy-for-customers',
  _type: 'post',
  title: 'AI agents now sign in, book and buy for customers', // 49 chars <= 58
  slug: { _type: 'slug', current: 'ai-agents-now-buy-for-customers' },
  description: 'Cequence Security measured agent traffic over 6 months: action-taking visits surged from 1.4% to 13%. Here is how AI agents now sign in, book, and buy for users.',
  seoTitle: 'AI Agents Now Sign In, Book & Buy for Customers', // 47 chars <= 58
  seoDescription: 'Cequence Security measured agent traffic over 6 months: action-taking visits surged from 1.4% to 13%. Here is how AI agents now sign in, book, and buy for users.',
  date: '2026-11-24T10:00:00.000Z',
  categories: [
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }, // automation-tools
    { _type: 'reference', _ref: 'cConWBU9nRl6jEInqsZvuy' }  // ai-content-systems
  ],
  affiliates: ['n8n'],
  schemaMarkup: JSON.stringify(post1FaqSchema, null, 2),
  body: post1Body
};

const post2Doc = {
  _id: 'post-microsoft-agent-framework-pypi-malware',
  _type: 'post',
  title: "Poisoned PyPI Releases of Microsoft's agent-framework", // 53 chars <= 58
  slug: { _type: 'slug', current: 'microsoft-agent-framework-pypi-malware' },
  description: "Two malicious PyPI releases of Microsoft's agent-framework (1.26.1 and 1.26.2) stole credentials via .pth hooks. Here is how to verify and remediate environments.",
  seoTitle: 'Microsoft agent-framework PyPI Malware: Audit Now', // 49 chars <= 58
  seoDescription: "Two malicious PyPI releases of Microsoft's agent-framework (1.26.1 and 1.26.2) stole credentials via .pth hooks. Here is how to verify and remediate environments.",
  date: '2026-11-24T16:00:00.000Z', // 6 hours after Post 1
  categories: [
    { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }, // architecture-teardowns
    { _type: 'reference', _ref: 'Al3E26R37amzsHAqPF1yCU' }  // automation-tools
  ],
  affiliates: ['n8n'],
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
  console.log('1. Publishing Post 1 (AI Agents Buy for Customers)...');
  const res1 = await client.createOrReplace(post1Doc);
  console.log('✅ Successfully published Post 1 in Sanity:', res1._id);

  console.log('2. Publishing Post 2 (Microsoft agent-framework PyPI Malware)...');
  const res2 = await client.createOrReplace(post2Doc);
  console.log('✅ Successfully published Post 2 in Sanity:', res2._id);

  // Sync post ledger
  await syncExistingSanityPostsJson();

  console.log('\nAll Day 11 posts published successfully in Sanity!');
}

run().catch(err => {
  console.error('❌ Error executing Day 11 publish:', err);
  process.exit(1);
});
