import { Inter, JetBrains_Mono, Urbanist } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: 'swap',
});

export const urbanist = Urbanist({
  weight: ['500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: 'swap',
});

