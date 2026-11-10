import { getSanityPosts } from '@/lib/sanity.client';
import ProductionHomepage from '@/components/homepage/ProductionHomepage';

export const metadata = {
  title: "Alfaz Mahmud Rizve | GTM & RevOps Architect",
  description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
  openGraph: {
    title: "Alfaz Mahmud Rizve | GTM & RevOps Architect",
    description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
    url: 'https://whoisalfaz.me',
    siteName: 'Alfaz Mahmud Rizve',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Alfaz Mahmud Rizve | GTM & RevOps Architect",
    description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
    creator: '@whois_alfaz',
  },
  alternates: {
    canonical: 'https://whoisalfaz.me',
  },
};

export default async function Home() {
  let posts = [];
  try {
    posts = await getSanityPosts();
  } catch (err) {
    console.error('Failed to fetch Sanity posts for homepage:', err);
    posts = [];
  }

  const homeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who is Alfaz Mahmud Rizve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Alfaz Mahmud Rizve is a GTM & RevOps architect based in Bangladesh. He specializes in building autonomous revenue systems for SaaS companies, digital agencies, and scaling businesses using SEO & organic growth architectures, n8n workflows, and high-performance Next.js web applications."
        }
      },
      {
        "@type": "Question",
        "name": "What is workflow automation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Workflow automation is the process of replacing manual, repetitive business tasks with automated systems. Instead of manually copying data between your CRM, email tool, and spreadsheets, an automation engine like n8n handles it instantly via webhooks and API integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How much does n8n cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "n8n offers a free self-hosted option that you can deploy on any cloud server for roughly $5-20/month in hosting costs. Unlike Zapier or Make, n8n does not charge per task execution. n8n Cloud plans start at $20/month for managed hosting."
        }
      },
      {
        "@type": "Question",
        "name": "What is a headless CMS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A headless CMS decouples your content management from your frontend presentation. Your content lives in one system while your frontend is built with a modern framework like Next.js, delivering faster page loads, better SEO, and stronger security."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free consultations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Book a free strategy call to discuss your automation needs, current tech stack, and growth goals. There is no obligation."
        }
      }
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alfaz Mahmud Rizve",
    "url": "https://whoisalfaz.me",
    "image": "https://whoisalfaz.me/profile.jpg",
    "jobTitle": "GTM & RevOps Architect",
    "description": "Alfaz Mahmud Rizve is a GTM & RevOps architect based in Bangladesh. He specializes in building autonomous revenue systems for SaaS companies, digital agencies, and scaling businesses using SEO & organic growth architectures, n8n workflows, and high-performance Next.js web applications.",
    "sameAs": [
      "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
      "https://x.com/whois_alfaz",
      "https://github.com/AlfazMahmudRizve",
      "https://www.youtube.com/@whoisalfazz",
      "https://www.youtube.com/@alfazreviews",
      "https://www.tiktok.com/@alfaz.tech.product"
    ],
    "knowsAbout": [
      "GTM & RevOps Architecture",
      "SEO & Organic Growth",
      "Technical SEO",
      "n8n Workflow Automation",
      "Next.js Web Applications",
      "AI Agent Architecture",
      "Headless CMS",
      "Full Stack Development",
      "Supabase",
      "Lead Enrichment Automation",
      "Progressive Web Apps"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "whoisalfaz",
      "url": "https://whoisalfaz.me"
    }
  };

  return (
    <>
      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />

      {/* PERSON SCHEMA — E-E-A-T Entity Signal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <ProductionHomepage posts={posts || []} />
    </>
  );
}
