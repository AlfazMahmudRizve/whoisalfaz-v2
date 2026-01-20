import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

// 1. Load the Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono"
});

export const metadata = {
  title: "Alfaz Mahmud Rizve | AI Automation Architect",
  description: "Headless Systems, n8n Workflows, and Technical SEO.",
  icons: {
    icon: '/logo.png',
  }
};

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
      </body>
    </html>
  );
}