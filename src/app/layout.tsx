import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import SmoothScroller from "@/components/layout/SmoothScroller";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import AppShell from "@/components/ui/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindPulse — Hospital Management & Clinical Ecosystem",
  description:
    "A comprehensive, multi-tenant hospital management and clinical ecosystem built on Flutter and Firebase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col p-4 md:p-8">
        <ThemeProvider>
          <SmoothScroller>
            <AnimatedBackground />
            <AppShell>{children}</AppShell>
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
