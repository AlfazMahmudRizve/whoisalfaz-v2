import "./globals.css";
import Script from 'next/script';
import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. Load the Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://whoisalfaz.me'),
  title: "Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect",
  description: "I help Marketing Agencies migrate off legacy CMS platforms to high-performance Next.js stacks and eliminate manual ops with n8n automation.",
  openGraph: {
    title: "Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect",
    description: "I help Marketing Agencies migrate off legacy CMS platforms to high-performance Next.js stacks and eliminate manual ops with n8n automation.",
    url: 'https://whoisalfaz.me',
    siteName: 'Alfaz Mahmud Rizve',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/featured-image.png',
        width: 1200,
        height: 630,
        alt: 'Alfaz Mahmud Rizve - RevOps & Full Stack Automation Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfaz Mahmud Rizve | RevOps & Full Stack Automation Architect',
    description: 'I help Marketing Agencies migrate off legacy CMS platforms to high-performance Next.js stacks and eliminate manual ops with n8n automation.',
    creator: '@whoisalfaz',
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

import dynamic from 'next/dynamic';

import LazyChatWidget from "@/components/LazyChatWidget";
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Alfaz Mahmud Rizve",
      "url": "https://whoisalfaz.me",
      "image": "https://whoisalfaz.me/profile.jpg",
      "jobTitle": "RevOps Architect & Software Engineer",
      "email": "a.m.rizve3905@gmail.com",
      "description": "I help Marketing Agencies migrate off legacy CMS platforms to high-performance Next.js stacks and eliminate manual ops with n8n automation.",
      "nationality": {
        "@type": "Country",
        "name": "Bangladesh"
      },
      "sameAs": [
        "https://linkedin.com/in/alfaz-mahmud-rizve",
        "https://github.com/AlfazMahmudRizve",
        "https://twitter.com/whoisalfaz",
        "https://facebook.com/alfazmahmudrizve",
        "https://www.instagram.com/whois.alfaz/",
        "https://www.youtube.com/@whoisalfazz"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Alfaz Mahmud Rizve - RevOps & Full Stack Automation Architect",
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
        "https://linkedin.com/in/alfaz-mahmud-rizve",
        "https://github.com/AlfazMahmudRizve",
        "https://twitter.com/whoisalfaz",
        "https://facebook.com/alfazmahmudrizve",
        "https://www.instagram.com/whois.alfaz/",
        "https://www.youtube.com/@whoisalfazz"
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body
        className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
        </ThemeProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B07D59MGJ8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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