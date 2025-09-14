import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import React from 'react';
import QueryProvider from "@/providers/query-provider"

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
        {/* --- 修正点在这里 --- */}
        {/* 你需要用从 @/providers/query-provider 导入的 QueryProvider
          来包裹你的整个应用 (children)，这样 React Query 才能工作。
          Toaster 最好也放在 Provider 内部。
        */}
        <QueryProvider>
          {children}
          <Toaster richColors />
        </QueryProvider>
        {/* --- 修正结束 --- */}
      </body>
    </html>
  );
}
