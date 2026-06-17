import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = "https://brian-pineda-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brian Pineda — CS + EE @ Rutgers · AI-Native Builder",
  description:
    "Brian Pineda is a CS + EE student at Rutgers building full-stack products with an AI-native workflow. Open to Summer 2026 SWE and AI/ML internships.",
  keywords: [
    "Brian Pineda",
    "Rutgers",
    "Computer Science",
    "Electrical Engineering",
    "AI-Native",
    "Software Engineer",
    "Internship 2026",
    "Next.js",
    "FastAPI",
    "LLM",
  ],
  authors: [{ name: "Brian Pineda" }],
  creator: "Brian Pineda",
  openGraph: {
    title: "Brian Pineda — CS + EE @ Rutgers · AI-Native Builder",
    description:
      "Full-stack products with an AI-native workflow. Open to Summer 2026 internships.",
    url: siteUrl,
    siteName: "Brian Pineda",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Pineda — CS + EE @ Rutgers",
    description:
      "Full-stack products with an AI-native workflow. Open to Summer 2026 internships.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-canvas text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
