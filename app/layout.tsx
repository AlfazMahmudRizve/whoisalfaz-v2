import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
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
  title: "Alfaz Mahmud Rizve | Headless Architect & Autonomous Revenue Systems",
  description: "I help Marketing Agencies replace slow WordPress monoliths with Next.js and eliminate manual ops with n8n workflows.",
  openGraph: {
    title: "Alfaz Mahmud Rizve | Headless Architect & Autonomous Revenue Systems",
    description: "I help Marketing Agencies replace slow WordPress monoliths with Next.js and eliminate manual ops with n8n workflows.",
    url: 'https://whoisalfaz.me',
    siteName: 'Alfaz Mahmud Rizve',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Alfaz Mahmud Rizve - Headless Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfaz Mahmud Rizve | Headless Architect & Autonomous Revenue Systems',
    description: 'I help Marketing Agencies replace slow WordPress monoliths with Next.js and eliminate manual ops with n8n workflows.',
    creator: '@whoisalfaz',
    images: ['/profile.jpg'],
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
  alternates: {
    canonical: './',
  },
  verification: {
    other: {
      'p:domain_verify': '5e4e50ddfe2f47c276a5cb4231bfb41b',
    },
  },
};

import dynamic from 'next/dynamic';

import LazyChatWidget from "@/components/LazyChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alfaz Mahmud Rizve",
    "url": "https://whoisalfaz.me",
    "image": "https://whoisalfaz.me/profile.jpg",
    "jobTitle": "Headless Architect & Revenue Systems Engineer",
    "description": "I help Marketing Agencies replace slow WordPress monoliths with Next.js and eliminate manual ops with n8n workflows.",
    "nationality": {
      "@type": "Country",
      "name": "Bangladesh"
    },
    "sameAs": [
      "https://linkedin.com/in/alfaz-mahmud-rizve",
      "https://github.com/AlfazMahmudRizve",
      "https://twitter.com/whoisalfaz",
      "https://facebook.com/alfazmahmudrizve"
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body
        className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col"
        suppressHydrationWarning
      >
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
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}