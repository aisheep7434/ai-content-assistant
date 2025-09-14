'use client' // 1. 设为客户端组件，因为我们需要状态和交互

// --- 导入 React 和 React Query (来自教程逻辑) ---
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner' // 使用 Sonner

// --- 你的 UI 组件导入 (全部保留) ---
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, Users, HardDrive, Zap, FileText, Package, Mail } from "lucide-react";

// --- 教程需要的额外组件 ---
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'


// --- API 调用函数 (来自教程逻辑) ---
const generateTitle = async (promptText: string) => {
  const res = await fetch('/api/generate/title', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: promptText }),
  })
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '生成失败');
  }
  return res.json()
}

const getHistory = async () => {
  const res = await fetch('/api/documents'); 
  if (!res.ok) {
     throw new Error('获取历史记录失败');
  }
  return res.json();
}
// ----------------------------------------


export default function DashboardPage() {
  
  // --- React Query 和状态钩子 (来自教程逻辑) ---
  const [prompt, setPrompt] = useState("")
  const queryClient = useQueryClient() 

  const { data: history, isLoading: isHistoryLoading } = useQuery({
     queryKey: ['history'], 
     queryFn: getHistory,    
  })

  const mutation = useMutation({
    mutationFn: generateTitle, 
    onSuccess: (newData) => {
      toast.success("生成成功!")
      // 关键：自动刷新历史记录！
      queryClient.invalidateQueries({ queryKey: ['history'] })
    },
    onError: (error: any) => {
      toast.error("生成失败", { description: error.message })
    }
  })

  const handleSubmit = () => {
    if (!prompt) return
    mutation.mutate(prompt) 
  }
  // ----------------------------------------


  return (
    <div className="space-y-8">
      
      {/* 1. 欢迎区域 (来自你的 UI) */}
      <div className="text-center space-y-4 py-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            欢迎使用 AI Content Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            您的智能内容创作伙伴，让创意无限可能
          </p>
        </div>
      </div>

      {/* 2. 统计卡片区域 (来自你的 UI) */}
      {/* (注意: 目前这些是静态数据。在真实项目中，这些数字也应该来自 useQuery) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            {/* ... 你的统计卡片1 ... */}
            <CardContent className="relative space-y-1">
              <div className="text-3xl font-bold">{history ? history.length : 0}</div>
              <p className="text-xs text-blue-100">
                总生成次数
              </p>
            </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
             {/* ... 你的统计卡片2 ... */}
            <CardContent className="relative space-y-1">
              <div className="text-3xl font-bold">1</div>
              <p className="text-xs text-green-100">
                当前活跃会话
              </p>
            </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
             {/* ... 你的统计卡片3 ... */}
             <CardContent className="relative space-y-1">
                <div className="text-3xl font-bold">0 MB</div>
                <p className="text-xs text-purple-100">
                  总存储空间
                </p>
             </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
             {/* ... 你的统计卡片4 ... */}
             <CardContent className="relative space-y-1">
                <div className="text-3xl font-bold">0ms</div>
                <p className="text-xs text-orange-100">
                  平均响应时间
                </p>
             </CardContent>
        </Card>
      </div>


      {/* 3. 快速开始区域 -> 替换为【阶段四 AI 生成器】(来自教程逻辑) */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2 pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            开始创作
          </CardTitle>
          <CardDescription className="text-lg">
            在下方输入你的提示词，立即开始生成内容
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="例如：写一篇关于太空探索的博客文章标题..."
            className="min-h-[120px] shadow-inner"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={mutation.isPending} 
            className="w-full font-bold text-lg py-6 shadow-lg hover:shadow-primary/40 transition-all duration-300"
            size="lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            {mutation.isPending ? '正在生成...' : '立即生成'}
          </Button>
        </CardContent>
      </Card>

      {/* 4. 最新结果 (来自教程逻辑) */}
      {mutation.isSuccess && (
        <Card className="bg-muted/50 border-0 shadow-xl">
          <CardHeader>
            <CardTitle>最新结果</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">{mutation.data.content}</p>
          </CardContent>
        </Card>
      )}

      {/* 5. 功能特性展示 (来自你的 UI, 保留) */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">强大功能</CardTitle>
          <CardDescription>
            探索我们为您提供的智能创作工具
          </CardDescription>
        </CardHeader>
        <CardContent>
           {/* ... 你的功能特性展示 Grid ... */}
           {/* (这部分保留你原来的代码) */}
           <div className="grid gap-6 md:grid-cols-3">
             <div className="text-center space-y-3">...</div>
             <div className="text-center space-y-3">...</div>
             <div className="text-center space-y-3">...</div>
           </div>
        </CardContent>
      </Card>

      <Separator />

      {/* 6. 历史记录 (来自教程逻辑) */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">历史记录</h2>
        {isHistoryLoading ? (
          <p>正在加载历史记录...</p>
        ) : (
          <div className="space-y-4">
            {history && history.length > 0 ? (
              history.map((doc: any) => (
                <Card key={doc.id} className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle className="text-lg">提示词: {doc.prompt}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{doc.content}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {new Date(doc.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-muted-foreground">暂无历史记录。快去生成你的第一个内容吧！</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
}