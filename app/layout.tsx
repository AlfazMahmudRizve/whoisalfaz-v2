import "./globals.css";
import Script from 'next/script';
import { inter, mono, urbanist } from "@/app/fonts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL('https://whoisalfaz.me'),
  title: "Alfaz Mahmud Rizve | GTM & RevOps Architect",
  description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
  authors: [{ name: 'Alfaz Mahmud Rizve', url: 'https://whoisalfaz.me' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Alfaz Mahmud Rizve | GTM & RevOps Architect",
    description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
    url: 'https://whoisalfaz.me',
    siteName: 'Alfaz Mahmud Rizve',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/featured-image.png',
        width: 1200,
        height: 630,
        alt: 'Alfaz Mahmud Rizve - GTM & RevOps Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfaz Mahmud Rizve | GTM & RevOps Architect',
    description: "I engineer autonomous revenue engines — bridging SEO, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands.",
    creator: '@whois_alfaz',
    images: ['/featured-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
  },
  verification: {
    other: {
      'p:domain_verify': '5e4e50ddfe2f47c276a5cb4231bfb41b',
      'msvalidate.01': '2257E8B198B7E17F540B2AAE8678E3F1',
    },
  },
};


import LazyChatWidget from "@/components/LazyChatWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimationProvider } from "@/components/AnimationProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alfaz Mahmud Rizve",
      "url": "https://whoisalfaz.me",
      "image": "https://whoisalfaz.me/profile.jpg",
      "jobTitle": "GTM & RevOps Architect",
      "email": "a.m.rizve3905@gmail.com",
      "description": "I engineer autonomous revenue engines — bridging SEO & Organic Growth, high-speed Next.js web applications, and self-healing n8n RevOps pipelines for scaling brands and agencies.",
      "nationality": {
        "@type": "Country",
        "name": "Bangladesh"
      },
      "knowsAbout": [
        "SEO & Organic Growth",
        "Programmatic SEO",
        "Topical Authority Architecture",
        "Technical SEO",
        "n8n Workflow Automation",
        "Next.js Web Applications",
        "Revenue Operations (RevOps)",
        "Supabase",
        "Lead Enrichment Automation"
      ],
      "sameAs": [
        "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
        "https://github.com/AlfazMahmudRizve",
        "https://x.com/whois_alfaz",
        "https://facebook.com/alfazmahmudrizve",
        "https://www.instagram.com/whois.alfaz/",
        "https://www.youtube.com/@whoisalfazz"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Alfaz Mahmud Rizve - GTM & RevOps Architect",
      "url": "https://whoisalfaz.me",
      "logo": "https://whoisalfaz.me/logo.png",
      "founder": {
        "@type": "Person",
        "name": "Alfaz Mahmud Rizve"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@whoisalfaz.me",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/in/alfaz-mahmud-rizve/",
        "https://github.com/AlfazMahmudRizve",
        "https://x.com/whois_alfaz",
        "https://facebook.com/alfazmahmudrizve",
        "https://www.instagram.com/whois.alfaz/",
        "https://www.youtube.com/@whoisalfazz"
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${urbanist.variable}`} suppressHydrationWarning>
      <body
        className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AnimationProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* The Navbar sits above everything */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-grow pt-20">
              {children}
            </main>

            <Footer />
            <LazyChatWidget />
          </AnimationProvider>
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B07D59MGJ8"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B07D59MGJ8');
          `}
        </Script>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="9T4Utwf0yVuXOiaqomR7Bg" strategy="lazyOnload" />
      </body>
    </html>
  );
}