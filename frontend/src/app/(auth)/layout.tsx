import React from 'react';

// 这个布局组件将包裹你的登录页和注册页
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 使用 Flex 和 Tailwind 工具类将所有子内容（你的页面）在屏幕中央显示
    <main className="flex items-center justify-center min-h-screen w-full p-4 bg-gray-50 dark:bg-gray-900">
      {children}
    </main>
  );
}