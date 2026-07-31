import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Agaate | From Seed to Sale",
  description:
    "Empowering Farmers. Managing Farming Outcomes. Higher Yield. Better Price. Zero Guesswork.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body
        className={`${manrope.variable} ${inter.variable} min-h-full flex flex-col bg-background text-foreground font-sans`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
