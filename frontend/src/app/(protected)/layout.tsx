'use client' // 这个布局需要交互（登出按钮），所以是客户端组件

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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

    } catch (error: any) {
      toast.error('登出时发生错误', { description: error.message });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 一个简单的头部导航 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold">AI 助手</span>
            {/* 教程规划了 /history 页面，我们先放一个链接 */}
            <nav className="space-x-4">
               <Button variant="link" onClick={() => router.push('/dashboard')}>仪表盘</Button>
               <Button variant="link" onClick={() => router.push('/history')}>历史记录</Button>
            </nav>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            登出
          </Button>
        </div>
      </header>

      {/* 页面主要内容 */}
      <main className="flex-1 container py-8">
        {children} {/* <-- 这里的 children 就是你的 page.tsx */}
      </main>
    </div>
  );
}