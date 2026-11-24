import type { Metadata } from "next";
import { Instrument_Serif, Inter, Playfair_Display, Space_Grotesk, Bebas_Neue, Open_Sans } from "next/font/google";
// @ts-ignore -- Next.js handles global CSS imports at build time.
import "./globals.css";
const display = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open" });
const title = "Sabarno Das | Creative Designer, Video Editor & Digital Creator";
const description = "Independent creative professional combining video editing, graphic design, AI-powered content and modern web development.";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title, description,
  openGraph: { title, description, type: "website", siteName: "Sabarno Das" },
  twitter: { card: "summary_large_image", title, description },
  verification: { google: "BuAa2GrX7I5pMxl3L_ES_NHrbv7aNtwboLWeLkncgV0" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${display.variable} ${body.variable} ${playfair.variable} ${grotesk.variable} ${bebas.variable} ${openSans.variable}`}>{children}</body></html>);
}
