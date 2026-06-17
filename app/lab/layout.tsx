import type { Metadata } from "next";

// The /lab route is an internal preview gallery — keep it out of search and
// off the sitemap. It is intentionally not linked from the live site.
export const metadata: Metadata = {
  title: "Creative Flair — Preview Lab",
  robots: { index: false, follow: false },
};

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
