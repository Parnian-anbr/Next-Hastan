import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// Replaces the old seo.tsx (which ran a Gatsby GraphQL query for the
// site title). This is the default metadata for every page; individual
// pages can override it by exporting their own `metadata` object.
export const metadata: Metadata = {
  title: {
    default: "هستان",
    template: "%s | هستان",
  },
  description: "مجموعه‌ای از مقالات و جستارهای انسان‌دوستانه",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          <main className="flex-1 pt-12">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
