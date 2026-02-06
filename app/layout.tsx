import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Update",
  description: "Update to your wallet's latest version",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <AnalyticsProvider>{children}</AnalyticsProvider>
        <Toaster />
      </body>
    </html>
  );
}
