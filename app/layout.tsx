import { Providers } from "@frontend/components/providers";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter, Noto_Sans_Arabic } from "next/font/google";
import "@frontend/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elevation / إليفيشن — Lending runs on guesswork. We built the fix.",
  description:
    "AI-powered document intelligence for lending. One system for applicants and reviewers. · ذكاء مستندات للإقراض. نظام واحد للمتقدمين والمراجعين.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${display.variable} ${mono.variable} ${arabic.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
