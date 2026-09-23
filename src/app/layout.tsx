import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "./fonts/Ahang-RegularSharp.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Ahang-BoldSharp.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Ahang-BlackSharp.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-my-font",
  display: "swap",
});

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
    <html lang="fa" dir="rtl" className={`${myFont.variable} h-full antialiased`}>
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