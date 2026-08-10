import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import CinematicEntry from "@/components/layout/CinematicEntry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'SHILPAKALE | Tracing Roots. Shaping Forms.',
  description: 'Cultural storytelling and design heritage. Explore the intersection of tradition, research, and contemporary form.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        {/* Communicate the site uses a light-only color scheme */}
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#FDF6E3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-full flex flex-col">
        <CinematicEntry />
        {children}
        <Footer />
      </body>
    </html>
  );
}
