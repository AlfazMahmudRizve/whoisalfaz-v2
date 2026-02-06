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
  title: "Alfaz Mahmud Rizve | RevOps Engineer & Full-Stack Automation Architect",
  description: "Alfaz Mahmud Rizve is a RevOps Engineer & Automation Architect who designs business growth strategies and automated infrastructure.",
  openGraph: {
    title: "Alfaz Mahmud Rizve | RevOps Engineer & Full-Stack Automation Architect",
    description: "Alfaz Mahmud Rizve is a RevOps Engineer & Automation Architect who designs business growth strategies and automated infrastructure.",
    url: 'https://whoisalfaz.me',
    siteName: 'Alfaz Mahmud Rizve',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Alfaz Mahmud Rizve - Automation Architect',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfaz Mahmud Rizve | RevOps Engineer & Full-Stack Automation Architect',
    description: 'Alfaz Mahmud Rizve is a RevOps Engineer & Automation Architect who designs business growth strategies.',
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

import GlobalChatWidget from "@/components/GlobalChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alfaz Mahmud Rizve",
    "url": "https://whoisalfaz.me",
    "image": "https://whoisalfaz.me/profile.jpg",
    "jobTitle": "Automation Engineer & Full Stack Developer",
    "description": "Alfaz Mahmud Rizve is a web developer and automation expert in Bangladesh, specializing in Next.js, n8n workflows, and cybersecurity.",
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
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col">
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
        <GlobalChatWidget />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}