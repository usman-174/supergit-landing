import type { Metadata } from "next";
import { IBM_Plex_Sans, Syne } from "next/font/google";

import "./globals.css";
import { AmbientColorShift } from "@/components/AmbientColorShift";
import { MagneticCursor } from "@/components/MagneticCursor";
import { PageTransition } from "@/components/PageTransition";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Toaster } from "@/components/ui/toaster";

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const headlineFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-headline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SuperGIT Motion",
  description:
    "A cinematic editorial landing experience for SuperGIT with deep scroll choreography and premium motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headlineFont.variable}`}
    >
      <body className="font-body antialiased">
        <SmoothScrollProvider>
          <AmbientColorShift />
          <ParallaxBackground />
          <MagneticCursor />
          <div className="scroll-progress-bar" />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}
