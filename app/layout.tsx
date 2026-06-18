import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = "https://brian-pineda-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Brian Pineda — CS + EE @ Rutgers · AI-Native Builder",
  description:
    "Brian Pineda is a CS + EE student at Rutgers building full-stack products and LLM systems with an AI-native workflow.",
  keywords: [
    "Brian Pineda",
    "Rutgers",
    "Computer Science",
    "Electrical Engineering",
    "AI-Native",
    "Software Engineer",
    "Next.js",
    "FastAPI",
    "LLM",
  ],
  authors: [{ name: "Brian Pineda" }],
  creator: "Brian Pineda",
  openGraph: {
    title: "Brian Pineda — CS + EE @ Rutgers · AI-Native Builder",
    description:
      "Full-stack products and LLM systems with an AI-native workflow.",
    url: siteUrl,
    siteName: "Brian Pineda",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Pineda — CS + EE @ Rutgers",
    description:
      "Full-stack products and LLM systems with an AI-native workflow.",
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
      className={`${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
