import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { config, fill } from "@/lib/content";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl = config.meta.siteUrl || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: fill(config.meta.title),
  description: fill(config.meta.description),
  openGraph: {
    title: fill(config.meta.title),
    description: fill(config.meta.description),
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: config.theme.background,
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={config.meta.lang} className={`${display.variable} ${sans.variable} ${hand.variable}`}>
      <head>
        <ThemeProvider theme={config.theme} />
      </head>
      <body>{children}</body>
    </html>
  );
}
