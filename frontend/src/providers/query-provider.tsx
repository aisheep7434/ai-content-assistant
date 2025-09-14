'use client'
// React Query 需要一个 Provider 来包裹我们的应用

import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // 创建一个客户端实例，我们设置为 staleTime 1分钟，gcTime 5分钟
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            gcTime: 1000 * 60 * 5, // 5 minutes
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}