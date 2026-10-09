const { createClient } = require('@sanity/client');
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

const slug = 'how-stripe-quietly-takes-more-fees-than-advertised';

const bodyContent = `
Most founders think Stripe charges 2.9%.

That is what the marketing page says. That is what financial models assume.

It is wrong.

Unless your average order value is in the thousands of dollars, you are not paying 2.9%. You are paying 3.4%, 5.9%, or even 8.9% on every sale.

The math is not hidden. It is just ignored. The fixed 30-cent fee sounds tiny until you process small transactions. Factor in cross-border markups, currency conversions, and reverse invoicing math, and Stripe takes a much larger bite of your revenue.

Here is the exact math behind Stripe fees, why standard reverse invoicing fails, and how to protect your net cash flow.

---

## <mark>The 2.9% Myth: Why Small Transactions Bleed Margin</mark>

Stripe's headline rate for US domestic cards is **2.9% + $0.30**.

The trap is the static thirty cents.

Percentage fees scale down with transaction size. Fixed fees do not. As your price drops, that $0.30 cut dominates the transaction.

Take a $5.00 sale—a digital download or micro-SaaS add-on:

* **Percentage cut (2.9%):** $0.15
* **Fixed cut:** $0.30
* **Total Stripe fee:** $0.45
* **Net payout:** $4.55
* **Effective fee rate:** **8.90%**

On a $5 purchase, Stripe takes nearly 9% of your gross revenue. Not 2.9%.

Now look at a $10.00 sale:

* **Percentage cut (2.9%):** $0.29
* **Fixed cut:** $0.30
* **Total Stripe fee:** $0.59
* **Net payout:** $9.41
* **Effective fee rate:** **5.90%**

Even on a $50.00 transaction:

* **Percentage cut (2.9%):** $1.45
* **Fixed cut:** $0.30
* **Total Stripe fee:** $1.75
* **Effective fee rate:** **3.50%**

At $100.00:

* **Total Stripe fee:** $3.20
* **Effective fee rate:** **3.20%**

The effective rate *never* hits 2.90%. It only approaches 2.90% asymptotically as transaction size grows infinitely large. If your store or SaaS averages between $15 and $60 per checkout, your blended take rate sits between **3.4% and 4.9%**.

---

## <mark>The Effective Fee Breakdown: From $5 to $1,000</mark>

Here is how effective rates scale across standard transaction sizes:

<div class="overflow-x-auto my-6">
  <table class="w-full text-left text-sm border-collapse border border-slate-700 bg-slate-900/60 rounded-xl">
    <thead>
      <tr class="border-b border-slate-700 bg-slate-800/80 text-slate-200">
        <th class="p-3 font-semibold">Transaction Amount</th>
        <th class="p-3 font-semibold">Percentage (2.9%)</th>
        <th class="p-3 font-semibold">Fixed Fee</th>
        <th class="p-3 font-semibold">Total Fee</th>
        <th class="p-3 font-semibold">Net in Bank</th>
        <th class="p-3 font-semibold text-emerald-400">Effective Rate</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-slate-800 text-slate-300">
      <tr>
        <td class="p-3 font-mono font-medium">$5.00</td>
        <td class="p-3 font-mono">$0.15</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$0.45</td>
        <td class="p-3 font-mono">$4.55</td>
        <td class="p-3 font-mono font-bold text-rose-400">9.00%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$10.00</td>
        <td class="p-3 font-mono">$0.29</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$0.59</td>
        <td class="p-3 font-mono">$9.41</td>
        <td class="p-3 font-mono font-bold text-rose-400">5.90%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$25.00</td>
        <td class="p-3 font-mono">$0.73</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$1.03</td>
        <td class="p-3 font-mono">$23.97</td>
        <td class="p-3 font-mono font-bold text-amber-400">4.12%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$50.00</td>
        <td class="p-3 font-mono">$1.45</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$1.75</td>
        <td class="p-3 font-mono">$48.25</td>
        <td class="p-3 font-mono font-bold text-amber-400">3.50%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$100.00</td>
        <td class="p-3 font-mono">$2.90</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$3.20</td>
        <td class="p-3 font-mono">$96.80</td>
        <td class="p-3 font-mono font-bold text-cyan-400">3.20%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$250.00</td>
        <td class="p-3 font-mono">$7.25</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$7.55</td>
        <td class="p-3 font-mono">$242.45</td>
        <td class="p-3 font-mono font-bold text-cyan-400">3.02%</td>
      </tr>
      <tr>
        <td class="p-3 font-mono font-medium">$1,000.00</td>
        <td class="p-3 font-mono">$29.00</td>
        <td class="p-3 font-mono">$0.30</td>
        <td class="p-3 font-mono text-rose-400">$29.30</td>
        <td class="p-3 font-mono">$970.70</td>
        <td class="p-3 font-mono font-bold text-emerald-400">2.93%</td>
      </tr>
    </tbody>
  </table>
</div>

If you budget for 2.9% overhead on $15,000 monthly volume made of $25 subscriptions, you expect to pay **$435.00** in fees. In reality, you pay **$618.00**.

That is an unbudgeted cash bleed of **$2,196.00** every year.

---

## <mark>Reverse Netting: Why Charging $102.90 for a $100 Invoice Fails</mark>

The second major leak happens when founders invoice clients and pass payment processing fees through.

Most founders do the math backwards.

Suppose you want exactly **$100.00** deposited in your bank for consulting work.

The common mistake:
You add 2.9% to the invoice:
$$\$100.00 + \$2.90 = \$102.90$$

You bill $102.90. The client pays.

Here is what Stripe actually does:
Stripe applies 2.9% + $0.30 to the **entire gross amount** of $102.90:

* **Percentage fee:** $\$102.90 \\times 0.029 = \\$2.9841$
* **Fixed fee:** $\$0.30$
* **Total deduction:** $\$2.9841 + \\$0.30 = \\$3.28$
* **Your bank deposit:** $\$102.90 - \\$3.28 = \\mathbf{\\$99.62}$

You did not net $100.00. You netted **$99.62**. You lost $0.38 on a single invoice because you calculated fees on the net instead of the gross.

On a $1,000.00 invoice, adding $29.00 ($1,029.00 billed) results in a $30.14 deduction, leaving you with **$998.86**.

Across dozens of invoices, these small float errors quietly drain cash flow.

---

## <mark>The Algebraic Formula for Zero-Float Netting</mark>

To net an exact target amount after Stripe takes its cut, derive the gross charge algebraically.

Let:
* $G$ = Gross amount to bill the client
* $N$ = Net payout desired in your bank
* $P$ = Percentage fee rate (0.029 for US domestic)
* $F$ = Fixed transaction fee ($0.30 for US domestic)

Stripe's payout equation is:
$$N = G - (G \\times P + F)$$

Factor out $G$:
$$N = G(1 - P) - F$$

Add fixed fee $F$ to both sides:
$$N + F = G(1 - P)$$

Divide by $(1 - P)$:
$$G = \\frac{N + F}{1 - P}$$

### The US Domestic Formula:
$$G = \\frac{\\text{Target Net} + 0.30}{1 - 0.029} = \\frac{\\text{Target Net} + 0.30}{0.971}$$

Let's test this on our $100.00 target:
$$G = \\frac{100.00 + 0.30}{0.971} = \\frac{100.30}{0.971} = \\mathbf{\\$103.2955...} \\approx \\mathbf{\\$103.30}$$

Now verify Stripe's fee deduction on $103.30:
* **Percentage cut (2.9%):** $\$103.30 \\times 0.029 = \\$2.9957$
* **Fixed cut:** $\$0.30$
* **Total fee:** $\$2.9957 + \\$0.30 = \\$3.2957$ (rounds to **$3.30**)
* **Your bank deposit:** $\$103.30 - \\$3.30 = \\mathbf{\\$100.00}$

You net exactly $100.00 down to the cent. Zero rounding float. Zero margin compression.

---

## <mark>The Hidden Surcharges That Push Fees Past 5%</mark>

The 2.9% + $0.30 domestic baseline is only the starting point. Stripe operates several additional surcharges that stack on top of standard rates:

### 1. International Cards (+1.50%)
If your client uses a card issued outside your domestic country (e.g., a UK or Canadian client paying a US account), Stripe adds **1.50%**. Your base rate jumps to **4.40% + $0.30**.

### 2. Currency Conversion (+1.00%)
If the customer pays in GBP or EUR and your payout account is in USD, Stripe applies a mandatory **1.00%** foreign exchange conversion surcharge. Combined with an international card fee, your baseline becomes **5.40% + $0.30**.

### 3. The Refund Penalty (Stripe Keeps Fees)
In 2020, Stripe stopped returning processing fees on refunded charges. If a customer buys a $500 product and requests a refund, you return the full $500. Stripe keeps the **$14.80** original fee. You lose money on every refund.

### 4. Stripe Invoicing Fees (+0.4%)
If you use Stripe Invoicing beyond the first 25 free invoices each month, Stripe charges an extra **0.4% per paid invoice**.

---

## <mark>Why I Built FastTools: A Free, Zero-Ad Payout Engine</mark>

Running reverse netting formulas in spreadsheets or doing manual math before invoicing clients is tedious.

Most online Stripe calculators on Google are frustrating to use:
* They are covered in flashing display ads and affiliate popups.
* They drop tracking pixels and third-party analytics scripts.
* They use floating-point JavaScript math that suffers from binary rounding errors ($0.1 + 0.2 = 0.30000000000000004$).
* They do not account for regional rates (UK, EU, Canada, Australia) or ACH rails.

I got tired of messy spreadsheets and ad-heavy calculators, so I built [FastTools](https://fasttools.me/) and created the [free Stripe fee calculator](https://fasttools.me/stripe-fee-calculator).

We engineered it with three rules:
1. **Zero Float Rounding Errors:** All calculations run on minor-unit integer arithmetic (cents rather than floats), guaranteeing exact ledger alignment with Stripe's backend.
2. **Instant Reverse Invoicing:** Switch between Forward Mode (Gross to Net) and Inverse Mode (Target Net to Billed Gross) with one click.
3. **High Performance & Privacy:** 100% client-side execution. No user logins, no server tracking, and zero ads.

In a technical audit using our [WhoisAlfaz Website Audit Engine](/audit/), FastTools scored a **93/100 (Grade A)** with a **126ms server TTFB**, valid SSL encryption, and clean security headers. It loads instantly and gives you the exact numbers without the bloat.

---

## <mark>Frequently Asked Questions</mark>

### What is the exact Stripe fee for US transactions?
Stripe charges 2.9% plus $0.30 for standard US domestic credit and debit card transactions. In-person Stripe Terminal transactions cost 2.7% plus $0.05. ACH direct debit transactions cost 0.8% capped at a maximum of $5.00 per transfer.

### Why is my effective Stripe rate higher than 2.9%?
The effective rate is higher because of the fixed 30-cent fee. On small transactions under $50, thirty cents represents a significant portion of the total charge. On a $5 sale, the fixed fee alone represents 6.0% of the charge, pushing your total effective fee to 8.9%.

### How do I calculate what to charge to net an exact amount on Stripe?
Use the algebraic reverse netting formula: **Gross = (Target Net + Fixed Fee) / (1 - Percentage Rate)**. For a $100 payout on US cards, calculate ($100 + $0.30) / (1 - 0.029) = $100.30 / 0.971 = $103.30. Charging $103.30 guarantees an exact $100 net deposit.

### Does Stripe refund transaction fees when I refund a customer?
No. Since April 2020, Stripe retains the original processing fees on refunded transactions. If you refund a $100 payment, the customer receives their full $100, but Stripe does not return the $3.20 fee, meaning you absorb that cost out of pocket.

### How much does Stripe charge for international cards?
Stripe adds a 1.50% cross-border surcharge for cards issued outside your domestic country, bringing the base rate to 4.4% + $0.30. If currency conversion is also required, an additional 1.00% fee applies, pushing the total rate to 5.4% + $0.30.

### Are ACH payments cheaper than credit cards on Stripe?
Yes. Stripe ACH Direct Debit costs 0.8% with a hard cap of $5.00. On a $2,000 client invoice, a credit card payment costs $58.30 in processing fees, whereas an ACH transfer costs only $5.00, saving you $53.30 per transaction.

---

## <mark>The Bottom Line for Founders</mark>

Never estimate unit economics on the headline 2.9% rate.

If your average checkout value is under $50, benchmark margins against **3.5% to 5.9%**. If you bill international clients, expect **4.5% to 5.5%**.

When sending invoices where you pass processing costs to the client, always use the inverse formula **(Net + $0.30) / 0.971** to avoid bleeding money on every transaction.

To verify deductions and reverse-calculate invoice charges across domestic, international, and ACH rails, use the [free Stripe fee calculator](https://fasttools.me/stripe-fee-calculator) on [FastTools](https://fasttools.me/).
`;

async function publish() {
  console.log('🚀 Publishing Stripe Fee Math post to Sanity CMS...');

  const postDoc = {
    _id: `post-${slug}`,
    _type: 'post',
    title: 'How Stripe Quietly Takes 3.4% Instead of 2.9% (And the Math Behind It)',
    slug: { _type: 'slug', current: slug },
    seoTitle: 'How Stripe Quietly Takes 3.4% Not 2.9% [Fee Math]', // 49 chars (<= 58 chars)
    seoDescription: 'Stripe advertises 2.9% + 30¢, but on typical sales the effective cut is 3.4% to 8.9%. Here is the exact reverse netting formula and math behind it.', // 156 chars
    description: 'A mathematical teardown of Stripe transaction fees, the 2.9% myth on small sales, and the exact reverse netting formula to avoid losing margin on client invoices.',
    date: new Date().toISOString(),
    categories: [
      { _type: 'reference', _ref: 'pJmrsKLAWC800vFHegUEU1' }, // Architecture Teardowns
      { _type: 'reference', _ref: 'cConWBU9nRl6jEInqsZx0q' }  // RevOps Architecture
    ],
    body: bodyContent.trim()
  };

  const result = await client.createOrReplace(postDoc);
  console.log('✅ Successfully published to Sanity:', result._id);
}

publish().catch(err => {
  console.error('❌ Error publishing to Sanity:', err);
  process.exit(1);
});
