'use client' // 这个布局需要交互（登出按钮），所以是客户端组件

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, LogOut, Home, FileText } from "lucide-react";

// 这个布局将包裹所有受保护的页面 (dashboard, history 等)
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // 登出处理函数
  const handleLogout = async () => {
    try {
      // 调用我们的登出 BFF API
      const response = await fetch('/api/auth/logout', { method: 'POST' });

      if (!response.ok) {
        throw new Error('登出失败');
      }

      toast.success('您已成功登出');
      // 登出成功后，跳转回登录页
      router.push('/login');

    } catch (error) {
      toast.error('登出时发生错误', { description: error instanceof Error ? error.message : '登出失败' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 现代化头部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* 左侧 Logo 和导航 */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Content Assistant
              </span>
            </div>

            {/* 主导航 */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => router.push('/dashboard')}
                className="h-9 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <Home className="w-4 h-4 mr-2" />
                仪表盘
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/history')}
                className="h-9 px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                <FileText className="w-4 h-4 mr-2" />
                历史记录
              </Button>
            </nav>
          </div>

          {/* 右侧用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">用户</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>登出</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* 页面主要内容 */}
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {children}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 AI Content Assistant. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <span>版本 1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}