import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from 'react';

export const metadata: Metadata = {
  title: "AI Content Assistant",
  description: "AI-powered content generation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className="font-sans antialiased min-h-screen bg-background"
        suppressHydrationWarning
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
