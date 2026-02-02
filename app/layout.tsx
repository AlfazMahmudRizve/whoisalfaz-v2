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
  title: "Alfaz Mahmud Rizve | RevOps Engineer & Automation Architect",
  description: "I design business growth strategies and then architect the automated infrastructure to execute them.",
  icons: {
    icon: '/logo.png',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'p:domain_verify': '5e4e50ddfe2f47c276a5cb4231bfb41b',
    },
  },
};

import GlobalChatWidget from "@/components/GlobalChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col">
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